# api-demo

## Application

**Endpoint**: https://api.aaronzhao.com/version

## Infrustructure

Both infrastructure and application are deployed using CloudFormation by BuilKite. All infrusture are created as code in GitHub. The application is deployed in AWS PVC with both private and public subnets. 

**Availability:** 2 Availability zones are used for this demo but all of the AZs should be used in Production. 
**Performance**: ECS with auto scalling on CPU usage.
**Security**: Both ECS and ALB are secured by Security Groups. The ECS tasks are in private subnets and only accessibale from ALB security groups. ALB is in public subnet. 
**SSL**: Amazon Issued Certificate installed on ALB Listener with `ELBSecurityPolicy-2016-08` policy. 


## CI/CD

CI/CD are manged by [BuildKite](https://buildkite.com/). The [agent](https://buildkite.com/docs/agent/v3/osx) is running on my Mac laptop. Pipeline steps:

1. Deploy AWS infrastructure
    - VPC, Subents, Routes
    - Security Groups
    - ALB, DNS, SSL Certificate
1. Build Docker Image
1. Publish Docker Image to ECR
1. Run unit test
1. Deploy to ECS

I used [Stackup](https://github.com/realestate-com-au/stackup) to deploy CloudFormation templates in ops/scripts/deploy.sh:
Here are the benefit of Stackup. 
- It treats stack changes as synchronous
- It provides a stream of events as changes are made
- It can create or update with the same command
- No-op updates won't error out
- It accepts parameters as a YAML file

## Risks:
- API Authentication
- Multiple environments

## Reference:
- https://docs.aws.amazon.com/codebuild/latest/userguide/cloudformation-vpc-template.html
- https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/blue-green.html
- https://nodejs.org/en/docs/guides/nodejs-docker-webapp/