import cdk = require('@aws-cdk/cdk');
import dynamodb = require('@aws-cdk/aws-dynamodb');
import iam = require('@aws-cdk/aws-iam');


export interface dynamodbTableProps {
    dynamoDBtableName: string
}

export class dynamodbTable extends cdk.Construct  {
    readonly dynamodbTableObj: dynamodb.Table;
    constructor(parent: cdk.Construct, id: string, props: dynamodbTableProps) {
        super(parent, id);

        this.dynamodbTableObj = new dynamodb.Table(this, 'Table', {
            tableName: props.dynamoDBtableName,
            partitionKey: { name: 'id', type: dynamodb.AttributeType.String },
            readCapacity: 6,
            writeCapacity: 6
          });    
    }

    grantFullAccess(principal?: iam.IPrincipal): void {
        this.dynamodbTableObj.grantFullAccess(principal); 
    }

}