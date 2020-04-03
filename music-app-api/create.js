import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {

  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  let session_code = Math.floor(Math.random() * 90000) + 10000;

  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      rehearsalId: uuid.v1(),
      createdAt: Date.now(),
      ...data,
      session_code
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(session_code);
  } catch (e) {
    return failure({ status: false });
  }
}