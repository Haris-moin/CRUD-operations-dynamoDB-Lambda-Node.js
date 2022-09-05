"use strict";
const dynamoTableName = "serverless-api-v2-dev-user";
const AWS = require("aws-sdk");
const dynamoDb = new AWS.DynamoDB.DocumentClient();
module.exports.getUser = require("./functions/getUser").getUser;
module.exports.getUsers = require("./functions/getUsers").getUsers;
module.exports.posUser = require("./functions/postUser").postUser;
module.exports.hello = async (event) => {
  if (
    event.requestContext.http.method === "GET" &&
    event.requestContext.http.path === "/products"
  ) {
    console.log(
      "  event.requestContext.http.method ",
      event.requestContext.http.method
    );
    console.log(" event.requestContext", event.requestContext.http.path);
    const response = await getProducts();
    return response;
  }
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        input: event,
      },
      null,
      2
    ),
  };

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
};

// async function getProducts() {
//   let itemArray = [];
//   const params = {
//     TableName: dynamoTableName,
//   };
//   try {
//     const dynamoData = await dynamoDb.scan(params).promise();
//     console.log("dynamoData: ", dynamoData);
//     itemArray = itemArray.concate(dynamoData.Items);
//     console.log("itemArray: ", itemArray);
//     return {
//       statusCode: 200,
//       message: "SUCCESS",
//       body: JSON.stringify(itemArray),
//     };
//   } catch (err) {
//     console.log("err: ", err);
//   }
// }
