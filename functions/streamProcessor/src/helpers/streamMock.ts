export const streamMockModify: any = {
  Records: [
    {
      eventID: "7855f8fc7de325801689f4b9be097b8a",
      eventName: "MODIFY",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1690375424,
        Keys: {
          SKUNumber: {
            S: "SKUNUMBER#",
          },
          ProductID: {
            S: "12985",
          },
        },
        NewImage: {
          SKUNumber: {
            S: "SKUNUMBER#",
          },
          data: {
            M: {
              productID: {
                S: "12985",
              },
              productInformation: {
                M: {
                  productImages: {
                    L: [
                      {
                        S: "image_url_0",
                      },
                      {
                        S: "image_url_1",
                      },
                      {
                        S: "image_url_2",
                      },
                      {
                        S: "image_url_3",
                      },
                      {
                        S: "image_url_4",
                      },
                      {
                        S: "image_url_5",
                      },
                      {
                        S: "image_url_6",
                      },
                    ],
                  },
                  productRoundel: {
                    S: " ",
                  },
                  productName: {
                    S: "andesitic mutiny deconventionalize",
                  },
                  productDescription: {
                    S: "demissionary catella serpenticidal squatterdom ananda arthrophyma objectionability behaviored morbilliform machin spary promotement tetradrachma windbracing underworkman stenocardiac righty Greenland whinchacker compotatory nonpurchase dysprosia autothermy vaticide proroyal trichologist polygyny intraglacial anthropocentric octoglot diencephalic copacetic corny hawsepipe butein",
                  },
                },
              },
            },
          },
          ProductID: {
            S: "12985",
          },
          transactionID: {
            S: "631231231231",
          },
        },
        SequenceNumber: "1046900000000012012564457",
        SizeBytes: 697,
        StreamViewType: "NEW_IMAGE",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:426643868142:table/product_db/stream/2023-07-26T12:21:14.224",
    },
  ],
};

export const streamMockInsert: any = {
  Records: [
    {
      eventID: "17ee48388d4c0a46243824bd406b33e5",
      eventName: "INSERT",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1690375498,
        Keys: {
          SKUNumber: {
            S: "SKUNUMBER#",
          },
          ProductID: {
            S: "112312312312312312312312312312985",
          },
        },
        NewImage: {
          SKUNumber: {
            S: "SKUNUMBER#",
          },
          data: {
            M: {
              productID: {
                S: "112312312312312312312312312312985",
              },
              productInformation: {
                M: {
                  productImages: {
                    L: [
                      {
                        S: "image_url_0",
                      },
                      {
                        S: "image_url_1",
                      },
                      {
                        S: "image_url_2",
                      },
                      {
                        S: "image_url_3",
                      },
                      {
                        S: "image_url_4",
                      },
                      {
                        S: "image_url_5",
                      },
                      {
                        S: "image_url_6",
                      },
                    ],
                  },
                  productRoundel: {
                    S: " ",
                  },
                  productDescription: {
                    S: "demissionary catella serpenticidal squatterdom ananda arthrophyma objectionability behaviored morbilliform machin spary promotement tetradrachma windbracing underworkman stenocardiac righty Greenland whinchacker compotatory nonpurchase dysprosia autothermy vaticide proroyal trichologist polygyny intraglacial anthropocentric octoglot diencephalic copacetic corny hawsepipe butein",
                  },
                  productName: {
                    S: "andesitic mutiny deconventionalize",
                  },
                },
              },
            },
          },
          ProductID: {
            S: "112312312312312312312312312312985",
          },
          transactionID: {
            S: "631231231231",
          },
        },
        SequenceNumber: "1047000000000012012618473",
        SizeBytes: 781,
        StreamViewType: "NEW_IMAGE",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:426643868142:table/product_db/stream/2023-07-26T12:21:14.224",
    },
  ],
};

export const streamMockRemove = {
  Records: [
    {
      eventID: "d9842599c91cd459561a4cc8364d91a8",
      eventName: "REMOVE",
      eventVersion: "1.1",
      eventSource: "aws:dynamodb",
      awsRegion: "us-east-1",
      dynamodb: {
        ApproximateCreationDateTime: 1690375505,
        Keys: {
          SKUNumber: {
            S: "SKUNUMBER#",
          },
          ProductID: {
            S: "112312312312312312312312312312985",
          },
        },
        SequenceNumber: "1047100000000012012623177",
        SizeBytes: 61,
        StreamViewType: "NEW_IMAGE",
      },
      eventSourceARN:
        "arn:aws:dynamodb:us-east-1:426643868142:table/product_db/stream/2023-07-26T12:21:14.224",
    },
  ],
};
