# Amazon Cognito
Useful notes applicable to this use case

## User Pools
* Directory of users
* Application interacts with this pool
* Tokens (OAuth 2.0) exchanged with Cognito
* Cognito itself or SSO as sign on 
    * Cognito as a service user sign up flow (is the identity provider)
    * SSO - Sign in with Google, etc integrated
* Triggers
    * Run custom code (e.g. Lambdas) in response to Cognito events


## Identity Pools (Federated identities)
* Short term access to AWS services
* Access to IAM STS to access services directly
* Can use user tags to grant access to specific policies

## General
* Users can be tagged with attributes

## User Pool hosted UI
* Access to AWS hosted URL with a login binding it to the app
* App links to Cognito URL -> login -> redirect back to app with tokens in the querystring
* Other options to integrate directly in app

## App Integration
* App provide tokens to backend services
* or, tokens verified with API GW (native integration) in front of service (https://www.youtube.com/watch?v=oFSU6rhFETk)
* or, AWS Amplify adds auth infra 
