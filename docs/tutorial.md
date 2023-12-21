# Tutorial

How I build this web app from scratch. 

## 1. AWS
Starting with a blank AWS slate. Create a new account. 

I make a new AWS account, and then a new user in IAM to stop using the root account:
1. Create new IAM User with access to AWS Management Console
2. Assign Policies - AdministratorAccess

Create Billing Alarms:
https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/monitor_estimated_charges_with_cloudwatch.html
1. In Billing console, enable AWS Free Tier alerts and CloudWatch billing alerts
2. In CloudWatch, create a new alarm with metric 'Billing > Total Estimated Charge'

Install AWS CLI: 
1. https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html
2. Create CLI access key in IAM and set in `aws configure`

## 2. Create a Terraform S3 sample

1. Install Terraform locally
2. [freeCodeCamp.org - Terraform Course - Automate your AWS cloud infrastructure](https://www.youtube.com/watch?v=SLB_c_ayRMo&ab_channel=freeCodeCamp.org)

## 3. Integrate CI/CD with GitHub Actions and Terraform Cloud
https://developer.hashicorp.com/terraform/tutorials/automation/github-actions

