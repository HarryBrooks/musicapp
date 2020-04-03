import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";

export async function main(event, context, callback) {

  const params = {
    TableName: process.env.tableName,
    Key: {
        userId: event.requestContext.identity.cognitoIdentityId,
        rehearsalId: event.pathParameters.id
    }
  };

  try {
    await dynamoDbLib.call("get", params);
    return success({status: true});
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}