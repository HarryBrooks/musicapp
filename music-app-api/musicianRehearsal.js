import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {
  const body = JSON.parse(event.body);
  const params = {
    TableName: process.env.tableName,
    FilterExpression: "session_code = :sessionId and passcode = :password",
    ExpressionAttributeValues: {
      ":sessionId": parseInt(body.sessionId),
      ":password": body.password
    },
    ProjectionExpression: 'rehearsalId, number_bars, tempo, time_sig'
  };

  try {
    const result = await dynamoDbLib.call("scan", params);
    console.log(result);
    if (result.Items) {
      return success(result.Items);
    }
    return failure({ status: false, error: "Item not found." });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}