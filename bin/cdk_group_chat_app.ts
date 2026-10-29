#!/usr/bin/env node
import 'dotenv/config';
import * as cdk from 'aws-cdk-lib/core';
import { GroupChatStack } from '../lib/cdk_group_chat_app-stack';
import { GroupStacks } from '../lib/group-stack';
import { UserStack } from '../lib/user-stack';
import { MessageStack } from '../lib/message-stack';

const app = new cdk.App();

const account = process.env.AWS_ACCOUNT_ID;
const region = process.env.AWS_REGION;

if (!account || !region) {
  throw new Error('AWS_ACCOUNT_ID and AWS_REGION must be set in the environment or .env file.');
}

const groupChatStack = new GroupChatStack(app, 'GroupChatStack', {
  env: { account, region },
  /* If you don't specify 'env', this stack will be environment-agnostic.
   * Account/Region-dependent features and context lookups will not work,
   * but a single synthesized template can be deployed anywhere. */

  /* Uncomment the next line to specialize this stack for the AWS Account
   * and Region that are implied by the current CLI configuration. */
  // env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

  /* Uncomment the next line if you know exactly what Account and Region you
   * want to deploy the stack to. */
  // env: { account: '123456789012', region: 'us-east-1' },

  /* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */
});
const sharedStackProps = {
  env: { account: groupChatStack.account, region: groupChatStack.region },
  groupChatTable: groupChatStack.groupChatTable,
  groupChatGraphqlApi: groupChatStack.groupChatGraphqlApi,
};

new GroupStacks(app, 'GroupStacks', sharedStackProps);
new UserStack(app, 'UserStacks', sharedStackProps);
new MessageStack(app, 'MessageStack', sharedStackProps);
