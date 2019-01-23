# CNAB bundle for spring boot application that uses dynamodb in AWS using CDK

Duffle is used to bundle the springboot dynamodb app that will deploy the app in AWS using CDK

## Prerequsites

``` no-highlight
Docker
duffle
```

Create the docker images from the [source repo](https://github.com/raviydevops/crud-springboot-dynamodb)
</br> Also include the names of the images in the images section of duffle.json.

## Modify duffle.json

Modify the duffle.json file to inclde the paramater localEnvironment as true for deploying the app on local.
Also DYNAMODB_ENDPOINT_URL env has to be included for local deployment, and it is not needed for aws.
Any random credential values of AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY works for local.
Include the parameter awsEnvironment as true for deploying the app on AWS ECS.

## Building the duffle cnab bundle

Use the following command to create the bundle:

```bash
duffle build .
```

## Credential set generation

Use the following command to generate the credentials sets file:

``` bash
duffle credentials generate credentialSetName bundleName -q
duffle credentials generate crud_springboot_dynamodb_local_and_aws-creds crud_springboot_dynamodb_local_and_aws -q
```

The credentials set file will be generated in ~/.duffle/credentials/ directory.
Modify the values of the credentials for AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY.

## Installing the bundle

Use the following command to install the bundle:

``` bash
duffle install bundleInstallName bundleName -c credentialSetName
duffle install crud_springboot_dynamodb_local_and_aws-install crud_springboot_dynamodb_local_and_aws -c crud_springboot_dynamodb_local_and_aws-creds
```

It will output the endpoint url of the load balancer for aws. On local http://localhost:8080 is the endpoint url.
The spring boot app will now be running using dynamodb as backend.
</br>This service can be tested with the below mentioned sample requests.

### Sample Requests

#### Sample GET request

Try the below end-point to successfully retrieve sample data from DynamoDB

``` no-highlight
http://{loadBalancerEndpointUri}/catalogService/products
Content-Type: application/json
```

#### Sample PUT request with a JSON payload

Make sure that you set 'Content-Type' to 'application/json' in the request headers

http://{loadBalancerEndpointUri}/catalogService/products/update/1ed4cd6a-41db-4192-a7b2-8e88c251b6e9

``` json
    {
        "id": "1ed4cd6a-41db-4192-a7b2-8e88c251b6e9",
        "productName": "Shoes",
        "quantity": 100,
        "inventoryLow": false,
        "price": 95.99,
        "currencyCode": "USD"
    }
```

#### Sample POST request with a JSON payload

Make sure that you set 'Content-Type' to 'application/json' in the request headers

http://{loadBalancerEndpointUri}/catalogService/products/add
</br>Content-Type: application/json

``` json
{
  "productName": "Ink Pen",
  "quantity": 30,
  "inventoryLow": false,
  "price": 15.99,
  "currencyCode": "USD"
}
```

## Uninstalling the application

Use the following command to uninstall (or destroy the services) the app

``` bash
duffle uninstall bundleInstallName bundleName -c credentialSetName
duffle uninstall crud_springboot_dynamodb_local_and_aws-install crud_springboot_dynamodb_local_and_aws -c crud_springboot_dynamodb_local_and_aws-creds
```

This will destroy the infrastrucure.
