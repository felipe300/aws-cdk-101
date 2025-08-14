import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

export class AwsCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // create bucket
    const bucket = new s3.Bucket(this, "AwsCdkProjectBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: "aws-cdk-bucket-pipo-100", // sometimes is better to let aws create the name by itself
      autoDeleteObjects: true,
    });

    const bucketN2 = new s3.Bucket(this, "SecondAwsCdkProjectBucket", {
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      bucketName: "aws-cdk-bucket-pipo-300",
      autoDeleteObjects: true,
      publicReadAccess: true, // allow people to see the bucket
      websiteIndexDocument: "index.html",
      websiteErrorDocument: "404.html",
      blockPublicAccess: new s3.BlockPublicAccess({
        blockPublicAcls: false,
        blockPublicPolicy: false,
        ignorePublicAcls: false,
        restrictPublicBuckets: false,
      }),
    });

    new s3deploy.BucketDeployment(this, "DeployWebsite", {
      sources: [s3deploy.Source.asset("../website")],
      destinationBucket: bucketN2,
    });

    new cdk.CfnOutput(this, "BucketName", {
      value: bucket.bucketName,
      description: "The name of the bucket",
    });
  }
}
