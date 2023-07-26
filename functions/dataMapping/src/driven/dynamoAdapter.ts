import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const putItem = async (item: any, transactionID: string, productId: string, skuNumber: string | undefined) => {
  const command = new PutCommand({
    TableName: process.env.product_database,
    Item: {
      data: item,
      transactionID: transactionID,
      ProductID: productId,
      SKUNumber: skuNumber,
    },
    ConditionExpression: "#transID <= :transactionID OR attribute_not_exists(productID)",
    ExpressionAttributeNames: {
      '#transID': 'transactionID',
      '#productID': 'ProductID'
    },
    ExpressionAttributeValues:{
      ":transactionID" : transactionID
    },
  });

  try {
    const response = await docClient.send(command);
    console.log(response);
    return response;
  } catch (e) {
    console.log(e);
    throw Error;
  }
};

export { putItem };
