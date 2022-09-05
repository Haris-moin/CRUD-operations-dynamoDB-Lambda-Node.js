const dynamoDb = require("../config/dynnamoDB");
const { buildResponse } = require("../response");

module.exports.getUsers = async (event) => {
  try {
    const TableName = process.env.DYNAMO_TABLE_NAME;
    const params = {
      TableName: TableName,
    };
    const dynamoData = await dynamoDb.scan(params).promise();
    return buildResponse(200, {
      message: "Successfully get list of data",
      items: dynamoData.Items,
    });
  } catch (err) {
    console.log("err: ", err);
  }
};
