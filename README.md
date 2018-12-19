# ECS fargate implementation through CDK and duffle CNAB

Duffle CNAB bundle is used to bundle the cdk application that is using AWS ECS fargate stack


## Getting Started

The implementation workflow is as follows:

### prerequsites

Prerequsiites for the whole application bundle
```
Docker
duffle
nodejs
typescript (or any cdk supported language setup)

```

## Duffle CNAB bundle

### Creating the duffle cnab directory 
```bash
duffle create cdk-fargate-ecs
```
This will create the cnab directory strture.

### Use the appropriate invocation image
Replace the Dockerfile with the invocation image neccessary for the bundle.
ex: as the Dockerfile in cdk-fargate-ecs/cnab/ 

### Modify the run script in cnab/ according to the application deployment requirements
ex: as in cdk-fargate-ecs/cnab/run

### Modify duffle.json
Make the duffle cnab bundle spec by modifying the duffle.json file
Include invocation image that needs to be created, deployement images,  any parameters, credentials in their respective section.



## CNAB app

Create your CNAB app in cnab/app/
ex: cdk-fargate-ecs/cnab/app/fargate

### CDK implementation
This repo uses fargate and ECS through cdk implementation.
Create the stack using the necessary services like ECS cluster, VPC, fargate, application to be deployed etc with the necessary configuration.


## Building the bundle
Use the following command to create the bundle:
``` bash
duffle build .
```


### Creating the credential set
Use the following command to generate the credential set
``` bash
duffle credentials generate bundleName CredentialName -q
duffle credentials generate cdk-fargate-ecs-creds cdk-fargate-ecs -q
```

### Fill the credential set with the appropriate secret values


### Installing the application
Use the following command to install(Creating or deploying the Stack) the bundle:
``` bash
duffle install bundleInstallName bundleName -c CredentialSet
duffle install cdk-fargate-ecs-install cdk-fargate-ecs -c cdk-fargate-ecs-creds
```

### Uninstalling the application
Use the following command to uninstall (or remove the Stack)
``` bash
duffle install bundleInstallName bundleName -c CredentialSet
duffle uninstall cdk-fargate-ecs-install cdk-fargate-ecs -c cdk-fargate-ecs-creds
```
