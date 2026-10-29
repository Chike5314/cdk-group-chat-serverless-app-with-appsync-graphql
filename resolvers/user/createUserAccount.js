import { util } from "@aws-appsync/utils";
import { put } from "@aws-appsync/utils/dynamodb";

export function request(ctx) {
  const input = ctx.args.input;
  const id = util.autoId();

  const item = {
    ...input,
    id,
    ENTITY: "USER",
    createdOn: util.time.nowISO8601(),
  };

  ctx.stash.createdUser = {
    ...item,
    PK: `USER#${id}`,
    SK: "USER",
  };

  return put({
    key: {
      PK: `USER#${id}`,
      SK: "USER",
    },
    item: item,
  });
}

export function response(ctx) {
  return ctx.stash.createdUser;
}