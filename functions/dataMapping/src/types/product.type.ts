export type Product = {
    transactionID: string;
    productData: ProductData;
    SKUData?: SKU[] | undefined;
}

export type SKU = {
    SKUNumber?: string;
    SKUName?: string;
    SKUDescription?: string;
    SKUPrices?: SKUPrice[];
    SKUImages?: SKUImage[];
    SKUInventory?: string;
}

export type SKUImage = {
    image: string;
}

export type SKUPrice = {
    amount: string;
    currencyCode: string;
    onSaleDate: string;
    offSaleDate: string;
}

export type ProductData = {
    productID: string;
    productInformation: ProductInformation;
}

export type ProductInformation = {
    productName: string;
    productDescription: string;
    productImages: ProductImages[];
    productRoundel: string;
}

export type ProductImages = {
    image: string;
}