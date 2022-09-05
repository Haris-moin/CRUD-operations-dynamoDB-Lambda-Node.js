const dynamoDb = require("../config/dynnamoDB");
const { buildResponse } = require("../response");

module.exports.updateUser = async (event) => {
  const body = JSON.parse(event.body);
  try {
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {
        userId: body.userId,
      },
      ExpressionAttributeValues: {
        ":n": body.name,
        ":userName": body.userName,
        ":phone": body.phone,
        ":address": body.address,
      },
      UpdateExpression:
        "SET fname = :n, userName = :userName, phone = :phone, address = :address",
      ReturnValues: "ALL_NEW",
    };
    const data = await dynamoDb.update(params).promise();
    if (data.Attributes) {
      return buildResponse(200, data.Attributes);
    } else {
      return buildResponse(404, { message: "Updated post data not found" });
    }
  } catch (err) {
    console.log("err: update ", err);
    return buildResponse(500, { message: "Could not update this post" });
  }
};
