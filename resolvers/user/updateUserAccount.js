import { util } from "@aws-appsync/utils";
import { update } from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const { id, username, profilePicKey } = ctx.args.input;

  return update({
    key: {
      PK: `USER#${id}`,
      SK: "USER",
    },
    update: {
      expression:
        "SET #username = :username, #profilePicKey = :profilePicKey, #updatedOn = :updatedOn",
      expressionNames: {
        "#username": "username",
        "#profilePicKey": "profilePicKey",
        "#updatedOn": "updatedOn",
      },
      expressionValues: util.dynamodb.toMapValues({
        ":username": username,
        ":profilePicKey": profilePicKey,
        ":updatedOn": util.time.nowISO8601(),
      }),
    },
  });
}

export function response(ctx) {
  return ctx.result;
}
