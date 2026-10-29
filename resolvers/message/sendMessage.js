import { util } from "@aws-appsync/utils";
import { put } from "@aws-appsync/utils/dynamodb";
export function request(ctx) {
  const input = ctx.args.input;
  const id = util.autoId();
  const item = {
    ...input,
    id,
    ENTITY: "MESSAGE",
    GSI2PK: `GROUP#${input.groupId}`,
    GSI2SK: `MESSAGE#${id}`,
    createdOn: util.time.nowISO8601(),
  };
  const key = {
    PK: `MESSAGE#${id}`,
    SK: "MESSAGE",
  };

  ctx.stash.createdMessage = {
    ...item,
    ...key,
  };

  return put({
    key: key,
    item: item,
  });
}

export function response(ctx) {
  return ctx.stash.createdMessage;
}