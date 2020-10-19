# TEST 1

## Description

Node.js REST API returns the version, last commit sha and description of this API in JSON format. This application is hosted on AWS ECS and deployed using BuildKite and CloudFormation. 

## Application

**Endpoint:** https://api.aaronzhao.com/version
**Method:** GET
**API Example Response:**

![API Example Response](/images/APIExampleResponse.png)

## Infrustructure

Both infrastructure and application are deployed using CloudFormation by BuilKite. All infrusture are created as code in GitHub. The application is deployed in AWS PVC with private and public subnets. 

**Availability:** 2 Availability Zones (AZs) are used for this demo but all of the AZs should be used in Production. 
**Performance**: ECS with auto scalling on CPU usage. Only one task is deployed for this demo. At least one task in each AZ should be deployed for real application. 
**Security**: Both ECS and ALB are secured by Security Groups. The ECS tasks are in private subnets and only accessibale from ALB security groups. ECS tasks are not accessible directly from the Internet. ALB is in the public subnet. Extra security can be done by NACL and WAF.
**SSL**: Amazon Issued Certificate installed on ALB Listener with [ELBSecurityPolicy-2016-08](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/create-https-listener.html) policy. 


## CI/CD

CI/CD are manged by [BuildKite](https://buildkite.com/). Pipeline steps:

1. Run unit test (in BuildKite Agent)
1. Deploy AWS infrastructure
    - VPC, Subents, Routes
    - NAT Gateway, Internet Gateway
    - Security Groups
    - ALB, DNS, SSL Certificate
1. Build Docker Image
1. Deploy application to ECSS

**Notes:**
1. The BuildKite [agent](https://buildkite.com/docs/agent/v3/osx) is running on my Mac laptop and it use my AWS keys in my laptop. In real applicaitons, the agents can be hosted on AWS EC2 and access other AWS resources using IAM role.  
1. I used [Stackup](https://github.com/realestate-com-au/stackup) to deploy CloudFormation templates in ops/scripts/deploy.sh instead of AWS cli.
Here are the benefit of Stackup. 
- It treats stack changes as synchronous
- It provides a stream of events as changes are made
- It can create or update with the same command
- No-op updates won't error out
- It accepts parameters as a YAML file

## Risks:
- This demo API does not have any Authentication which is required for real application.
- There is no WAF for the application. 
- There is no rate limit for the API.
- This demo deploys to Production environment directly. In a read applicaiton, it should be deployed to Dev and Preprod rnvironment first before deploying to Prodcution environment.

## Reference:
- https://docs.aws.amazon.com/codebuild/latest/userguide/cloudformation-vpc-template.html
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/blue-green.html
