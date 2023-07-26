import { Product } from "../types/product.type";
import { readObject } from "../driven/s3Adapter";
import xml2js from "xml2js";
import { putItem } from "../driven/dynamoAdapter";

function findKeyInObject(obj: any, targetKey: string): any | undefined {
  // Check if the current object is null or undefined
  if (obj === null || typeof obj !== "object") {
    return undefined;
  }

  // Check if the target key is present in the current object
  if (targetKey in obj) {
    return obj[targetKey];
  }

  // Iterate through the object's properties recursively
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const result = findKeyInObject(value, targetKey);
      if (result !== undefined) {
        return result;
      }
    }
  }

  // Return undefined if the key is not found
  return undefined;
}

const mapDocument = async (fileName: string) => {
  console.log("Mapping document: " + fileName);
  const objectContents = await readObject(process.env.archive_bucket, fileName);
  const mappedDocument = await xml2js.parseStringPromise(objectContents);

  const finalDocument: Product = {
    transactionID: "",
    productData: {
      productID: "",
      productInformation: {
        productName: "",
        productDescription: "",
        productImages: [],
        productRoundel: "",
      },
    },
    SKUData: [],
  };

  finalDocument.transactionID = findKeyInObject(
    mappedDocument,
    "TransactionID"
  )[0];
  finalDocument.productData.productID = findKeyInObject(
    mappedDocument,
    "ProductID"
  )[0];
  finalDocument.productData.productInformation.productName = findKeyInObject(
    mappedDocument,
    "ProductName"
  )[0];
  finalDocument.productData.productInformation.productDescription =
    findKeyInObject(mappedDocument, "ProductDescription")[0];
  finalDocument.productData.productInformation.productImages = findKeyInObject(
    mappedDocument,
    "ProductImages"
  )[0].Image;
  finalDocument.productData.productInformation.productRoundel = findKeyInObject(
    mappedDocument,
    "ProductRoundel"
  )[0];

  const numberOfSkus = mappedDocument.data?.SKUData[0].SKU.length;
  for (let i = 0; i < numberOfSkus; i++) {
    finalDocument?.SKUData?.push({
      SKUNumber: "",
      SKUName: "",
      SKUDescription: "",
      SKUInventory: "",
      SKUImages: [],
      SKUPrices: [],
    });
    const SKUNumber = findKeyInObject(
      mappedDocument.data?.SKUData[0].SKU[i],
      "SKUNumber"
    )[0];
    const SKUName = findKeyInObject(
      mappedDocument.data?.SKUData[0].SKU[i],
      "SKUName"
    )[0];
    const SKUDescription = findKeyInObject(
      mappedDocument.data?.SKUData[0].SKU[i],
      "SKUDescription"
    )[0];
    const SKUInventory = findKeyInObject(
      mappedDocument.data?.SKUData[0].SKU[i],
      "InventoryStatus"
    )[0];
    const SKUImages = findKeyInObject(
      mappedDocument.data?.SKUData[0].SKU[i],
      "Image"
    );
    const SKUPrices = findKeyInObject(
      mappedDocument.data?.SKUData[0].SKU[i],
      "SKUPrice"
    );

    if (finalDocument && Array.isArray(finalDocument.SKUData)) {
      finalDocument.SKUData[i].SKUNumber = SKUNumber;
      finalDocument.SKUData[i].SKUName = SKUName;
      finalDocument.SKUData[i].SKUDescription = SKUDescription;
      finalDocument.SKUData[i].SKUInventory = SKUInventory;
      finalDocument.SKUData[i].SKUImages = SKUImages;
      finalDocument.SKUData[i].SKUPrices = SKUPrices;
    }
  }
  // TODO send to DynamoDB
  console.log("Sending to DynamoDB");
  const transactionID = finalDocument.transactionID;
  const productId = finalDocument.productData.productID;
  const skuNumber = "";
  try {
    console.log("Sending to DynamoDB product information");
    await putItem(finalDocument.productData, transactionID, productId, skuNumber);
    finalDocument.SKUData?.forEach(async (sku) => {
      console.log("Sending to DynamoDB sku information" + skuNumber);
      await putItem(sku, transactionID, productId, sku.SKUNumber);
    });
    // TODO send to processed bucket
  } catch (e) {
    //TODO throw in a way to send to error bucket
    console.log(e);
    throw Error;
  }
  
  return null;
};

export { mapDocument };
