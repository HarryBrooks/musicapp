import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const body = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    FilterExpression: "session_code = :sessionId",
    ExpressionAttributeValues: {
      ":sessionId": parseInt(body.sessionId)
    }
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    if (result.Items) {
      // Return the retrieved item
      if(result.Items[0].passcode === body.password) {
        return success(result.Items);
      }
    }
    return failure({ status: false, error: "Item not found." });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}