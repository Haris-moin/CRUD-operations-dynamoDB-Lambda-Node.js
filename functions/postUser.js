const dynamoDb = require("../config/dynnamoDB");
const { buildResponse } = require("../response");
const { uuid } = require("uuidv4");

module.exports.postUser = async (event) => {
  const body = JSON.parse(event.body);
  const userId = uuid();
  console.log("userId: ", userId);
  console.log("body: ", body);
  try {
    const { name, userName, phone, address } = body;
    const TableName = process.env.DYNAMO_TABLE_NAME;
    const params = {
      TableName: TableName,
      Item: {
        userId,
        name,
        userName,
        phone,
        address,
      },
    };
    const dynamodbData = await dynamoDb.put(params).promise();
    return buildResponse(200, { message: "Successfully Post Data" });
  } catch (err) {
    console.log("err: ", err);
    return buildResponse(500, { message: "Could not create the post" });
  }
};
