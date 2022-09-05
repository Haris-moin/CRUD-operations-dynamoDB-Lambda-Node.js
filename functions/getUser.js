const dynamoDb = require("../config/dynnamoDB");
const { buildResponse } = require("../response");

module.exports.getUser = async (event) => {
  try {
    const { id } = event.pathParameters;
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      KeyConditionExpression: "userId = :userId",
      ExpressionAttributeValues: {
        ":userId": id,
      },
      Select: "ALL_ATTRIBUTES",
    };
    const dynamodbData = await dynamoDb.query(params).promise();
    if (dynamodbData.Count > 0) {
      return buildResponse(200, {
        message: "Successfully data fetched by userId",
        items: dynamodbData,
      });
    } else {
      return buildResponse(404, { message: "Post not found" });
    }
  } catch (err) {
    console.log("err: ", err);
    return buildResponse(500, { message: "Could not get the user" });
  }
};
