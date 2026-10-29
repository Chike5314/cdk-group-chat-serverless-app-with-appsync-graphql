import * as cdk from "aws-cdk-lib";
import { Template } from "aws-cdk-lib/assertions";
import { GroupChatStack } from "../lib/cdk_group_chat_app-stack";
import { GroupStacks } from "../lib/group-stack";
import { MessageStack } from "../lib/message-stack";
import { UserStack } from "../lib/user-stack";

test("synthesizes all group chat stacks and their resources", () => {
  const app = new cdk.App();
  const groupChatStack = new GroupChatStack(app, "GroupChatStack", {
    env: { account: "123456789012", region: "us-east-1" },
  });
  const sharedProps = {
    env: { account: groupChatStack.account, region: groupChatStack.region },
    groupChatTable: groupChatStack.groupChatTable,
    groupChatGraphqlApi: groupChatStack.groupChatGraphqlApi,
  };
  const groupStack = new GroupStacks(app, "GroupStacks", sharedProps);
  const userStack = new UserStack(app, "UserStacks", sharedProps);
  const messageStack = new MessageStack(app, "MessageStack", sharedProps);

  Template.fromStack(groupChatStack).resourceCountIs(
    "AWS::DynamoDB::Table",
    1
  );
  Template.fromStack(groupChatStack).resourceCountIs(
    "AWS::AppSync::Resolver",
    4
  );
  Template.fromStack(groupStack).resourceCountIs("AWS::AppSync::Resolver", 6);
  Template.fromStack(userStack).resourceCountIs("AWS::AppSync::Resolver", 4);
  Template.fromStack(messageStack).resourceCountIs("AWS::AppSync::Resolver", 1);
});
