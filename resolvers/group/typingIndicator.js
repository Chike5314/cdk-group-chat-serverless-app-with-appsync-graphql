export function request(ctx) {
  return {
    payload: {
      userId: ctx.args.userId,
      groupId: ctx.args.groupId,
      typing: ctx.args.typing,
    },
  };
}

export function response(ctx) {
  return ctx.result;
}