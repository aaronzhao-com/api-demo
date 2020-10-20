# TEST 1

*I have done CD besides CI to make it a complete demo. This setup is over overcomplicate for a demo application but the purpose is to demo the CI/CD process for a real application.*

## Description

Node.js REST API returns the version, last commit sha and description of this API in JSON format. This application is hosted on AWS ECS and deployed using Buildkite and CloudFormation. 

## Application

**Endpoint:** https://api.aaronzhao.com/version

**Method:** GET

**Version:** Buildkite build numbner

**LastCommitSha:** Githut commit sha

*Version and LastCommitSha are passed from Buildkite agent to dcoker environment, and then read into the api application.*

**API Example Response:**

![API Example Response](/images/APIExampleResponse.png)

## Test

Unit test is done using `jest` and `supertest`. It is done by overwriting the application config and comparing the responds with mock response. 

![Unit Test](/images/test.png)

## Infrastructure

Both infrastructure and application are deployed using CloudFormation by BuilKite. All Infrastructure are created as code in GitHub. The application is deployed in AWS PVC with private and public subnets. 

**Availability:** 2 Availability Zones (AZs) are used for this demo but all of the AZs should be used in Production.

**Performance**: ECS with auto scaling on CPU usage. Only one task is deployed for this demo. At least one task in each AZ should be deployed for real applications.

**Security**: Both ECS and ALB are secured by Security Groups. The ECS tasks are in private subnets and only accessible from ALB security group. ECS tasks are not accessible directly from the Internet. ALB is in the public subnet. Extra security can be done by NACL and WAF.

**SSL**: Amazon Issued Certificate installed on ALB Listener with [ELBSecurityPolicy-2016-08](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html) policy. 


## CI/CD

CI/CD are managed by [Buildkite](https://buildkite.com/). Pipeline steps:

1. Run unit test (in Buildkite Agent)
1. Deploy AWS infrastructure
    - VPC, Subnets, Routes
    - NAT Gateway, Internet Gateway
    - Security Groups
    - ALB, DNS, SSL Certificate
1. Build docker image
1. Publish docker image to ECR
1. Deploy application to ECS

![Buildkite Pipeline](/images/pipeline.png)

**Notes:**
1. The Buildkite [agent](https://buildkite.com/docs/agent/v3/osx) is running on my laptop and it uses the AWS keys in my laptop. For real applicaitons, the agents can be hosted on AWS EC2 with autoscaling and accesses other AWS resources using IAM role.  
1. I used [Stackup](https://github.com/realestate-com-au/stackup) to deploy CloudFormation templates instead of AWS cli.
Here are the benefits of Stackup:
- It treats stack changes as synchronous
- It provides a stream of events as changes are made
- It can create or update with the same command
- It accepts parameters as a YAML file

## Run locally

Test:
```
npm install
npm run test
```

Run:
```
npm install
npm run start
```

http://localhost:8080/version

(Version and LastCommitsha is unavailable locally becasue version is build numbner from Buldkite.)

## Risks:
- This demo API does not have any authentication which is required for real application.
- There is no WAF for the application. 
- There is no rate limit for the API.
- This demo deploys to Production environment directly. For real applicaitons, it should be deployed to Dev and Preprod environments first before deploying to Prodcution environment.
- This demo application does not have monitoring and alerting. Alerts should be triggered when the API is offline or when it reachs the max number of tasks in ECS autoscaling. 

## Reference:
- https://docs.aws.amazon.com/codebuild/latest/userguide/cloudformation-vpc-template.html
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/blue-green.html
