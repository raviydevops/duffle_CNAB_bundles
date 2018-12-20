# CNAB local config bundle for spring boot application taht uses dynamodb

Duffle is used to bundle the spring


## Getting Started

The implementation workflow is as follows:

### Prerequsites

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
duffle create NAME
duffle create cnab_springboot_dynamodb
```
This will create the cnab directory strture.

### Use the appropriate invocation image
Replace the Dockerfile with the invocation image neccessary for the bundle. <br />
Ex: as the Dockerfile in cnab_springboot_dynamodb/cnab/ 

### Modify the run script in cnab/ according to the application deployment requirements
Ex: as in cnab_springboot_dynamodb/cnab/run

### Modify duffle.json
Make the duffle cnab bundle spec by modifying the duffle.json file
Include invocation image that needs to be created, deployement images,  any parameters, credentials in their respective section.



## CNAB app

Create your CNAB app in cnab/app/
Ex: cnab_springboot_dynamodb/cnab/app/somesourcecode

## Building the bundle
Use the following command to create the bundle:
``` bash
duffle build .
```

## Testing the responses of the application

### Try the below end-point to successfully retrieve sample data from DynamoDB
http://localhost:8080/catalogService/products

### Sample POST request with a JSON payload. Make sure that you set 'Content-Type' to 'application/json' in the request headers
http://localhost:8080/catalogService/products/add   
```
{
  "productName": "Ink Pen",
  "quantity": 30,
  "inventoryLow": false,
  "price": 15.99,
  "currencyCode": "USD"
}
```

### Try the below end-point to query DynamoDB database
http://localhost:8000/shell

<!-- ### Creating the credential set
Use the following command to generate the credential set
``` bash
duffle credentials generate bundleName CredentialName -q
duffle credentials generate cdk-fargate-ecs-creds cdk-fargate-ecs -q
``` -->

<!-- ### Fill the credential set with the appropriate secret values -->


### Installing the application (Testing)
Use the following command to install(test the application) the bundle:
``` bash
duffle install bundleInstallName bundleName
duffle install cnab_springboot_dynamodb-install cnab_springboot_dynamodb
```


### Bringing up the application
Use the following command for custom action defined in duffle.json(to bring up the application):
``` bash
duffle run app_up bundleInstallName bundleName
duffle run app_up cnab_springboot_dynamodb-install cnab_springboot_dynamodb
```
Note: as volume mounts are not happening through duffle in docker-compose.yml, taget/jar file won't be on local. So do docker-compose up --build in crud-springboot-dynamodb-config-local with the line 22 to 25 uncommented in docker-compose.yml. This will generate jar in crud-springboot-dynamodb-config-local/target folder and this can be added in this custom action to bring up the service.

### Uninstalling the application
Use the following command to uninstall (or down the services)
``` bash
duffle uninstall bundleInstallName bundleName
duffle uninstall cnab_springboot_dynamodb-install cnab_springboot_dynamodb
```
