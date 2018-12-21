# CNAB local config bundle for spring boot application that uses dynamodb

Duffle is used to bundle the springboot dynamodb app

## Getting Started

### Prerequsites

```
Docker
duffle
```

Create the docker images from the source [repo](https://github.com/raviydevops/crud-springboot-dynamodb)

## Duffle CNAB bundle

### Building the bundle

Use the following command to create the bundle:

```bash
duffle build .
```

### Credentials generation

Use the following command to create the bundle:

``` bash
duffle credentials generate credentialSetName bundleName -q
duffle credentials generate crud_springboot_dynamodb-creds crud_springboot_dynamodb -q
```

The credentials set file will be generated in ~/.duffle/credentials/ directory.
Modify the values of the credentials.
For this app any values for AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY will work as it is a local setup.
Also DYNAMODB_ENDPOINT_URL can be modified in the parameters section duffle.json file.


### Installing the bundle

Use the following command to install the bundle:

``` bash
duffle install bundleInstallName bundleName -c credentialSetName
duffle install crud_springboot_dynamodb-install crud_springboot_dynamodb -c crud_springboot_dynamodb-creds
```

### Try the below end-point to successfully retrieve sample data from DynamoDB

```bash
http://localhost:8080/catalogService/products
```

Content-Type: application/json

### Sample POST request with a JSON payload. Make sure that you set 'Content-Type' to 'application/json' in the request headers

http://localhost:8080/catalogService/products/add
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

### Uninstalling the application

Use the following command to uninstall (or down the services)

``` bash
duffle uninstall bundleInstallName bundleName -c credentialSetName
duffle uninstall crud_springboot_dynamodb-install crud_springboot_dynamodb -c crud_springboot_dynamodb-creds
```
