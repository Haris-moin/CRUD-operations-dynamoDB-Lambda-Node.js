const dynamoDb = require("../config/dynnamoDB");
const { buildResponse } = require("../response");

module.exports.deleteUser = async (event) => {
  try {
    const { userId } = JSON.parse(event.body);
    const params = {
      TableName: process.env.DYNAMO_TABLE_NAME,
      Key: {
        userId,
      },
    };

    const response = await dynamoDb.delete(params).promise();
    return buildResponse(200, {
      message: "Successfully deleted user",
    });
  } catch (err) {
    return buildResponse(500, {
      message: "Can not delete user",
    });
  }
};
