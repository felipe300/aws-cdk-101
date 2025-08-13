import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create bucket
    const bucket = new s3.Bucket(this, "AwsCdkProjectBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
    });

    new cdk.CfnOutput(this, "BucketName", {
      value: bucket.bucketName,
      description: "The name of the bucket",
    });
  }
}
