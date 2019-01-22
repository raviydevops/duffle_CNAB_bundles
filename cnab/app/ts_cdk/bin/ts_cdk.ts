#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import dynamodb = require('@aws-cdk/aws-dynamodb');
import ecs = require('@aws-cdk/aws-ecs');
import ec2 = require('@aws-cdk/aws-ec2');
// import iam = require('@aws-cdk/aws-iam');
// import { PolicyStatement, Role, ServicePrincipal } from '@aws-cdk/aws-iam';
import elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');
// import { TsCdkStack } from '../lib/ts_cdk-stack';

class fargateStack extends cdk.Stack {
    constructor(parent: cdk.App, id: string, props?: cdk.StackProps) {
        super(parent, id, props);
        const ecsVpc = new ec2.VpcNetwork(this, 'fargateVPC');

        const ecsCluster = new ecs.Cluster(this, 'fargateCluster', {
            vpc: ecsVpc
        });

        

        const table = new dynamodb.Table(this, 'Table', {
            tableName: 'ProductCatalog',
            partitionKey: { name: 'id', type: dynamodb.AttributeType.String },
            readCapacity: 6,
            writeCapacity: 6
          });

        // iam.Role r  = new iam.Role(this, 'ex', {

        // });

        //   const statement = new PolicyStatement().addAction('dynamodb:*').addResource(table.tableArn);
        //   statement.addServicePrincipal('ecs.amazonaws.com');
        //   statement.addServicePrincipal('ec2.amazonaws.com');


        // //    assumedBy: new ServicePrincipal('*'),
        // const role = new Role(this, "DynamodbRoleToECS", {
        //     assumedBy: new ServicePrincipal('ecs.amazonaws.com')
        // });

        // role.addToPolicy(statement);

        // role.addToPolicy(new PolicyStatement()
        //     .addAction('dynamodb:*')
        //     .addResource(table.tableArn)
        //     .addServicePrincipal('ecs.amazonaws.com')
        //     .addServicePrincipal('ec2.amazonaws.com'));

        const fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
            memoryMiB: '1024',
            cpu: '512'
            // taskRole: role,
        
        })
        // '[AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY]'

        let ecsEnvs: { [ key: string ]: string } = {};
        // ecsEnvs["AWS_ACCESS_KEY_ID"] = `process.env.AWS_ACCESS_KEY_ID`;
        ecsEnvs["AWS_ACCESS_KEY_ID"] = String(process.env.AWS_ACCESS_KEY_ID);
        ecsEnvs["AWS_SECRET_ACCESS_KEY"] = String(process.env.AWS_SECRET_ACCESS_KEY);
        // console.log(ecsEnvs);
        // console.log(process.env.AWS_ACCESS_KEY_ID);

        fargateTaskDefinition.addContainer('springbootContainer', {
            image: ecs.ContainerImage.fromDockerHub('raviydevops/crud-springboot:2.0.0'),
            environment: ecsEnvs
        }).addPortMappings({
            containerPort:8080,
            protocol: ecs.Protocol.Tcp
        });

        const ecsService = new ecs.FargateService(this, 'Service', {
            cluster: ecsCluster,
            taskDefinition: fargateTaskDefinition,
            desiredCount: 1
        });
        
        const lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
            vpc: ecsVpc,
            internetFacing: true
        })

        const lbListener = lb.addListener('Listener', {
            port: 80
        });

        lbListener.addTargets('ECS', {
            port: 8080,
            targets: [ecsService]
        })

        new cdk.Output(this, 'lbDnsName', {
            value: lb.dnsName
        })


        // const lbfs = new ecs.LoadBalancedFargateService(this, 'fargateService', {
        //     cluster: cluster,  
        //     cpu: '256', 
        //     desiredCount: 1,
        //     image: ecs.ContainerImage.fromDockerHub('raviydevops/crud-springboot:1.0.0'),
        //     memoryMiB: '1024',
        //     containerPort: 8080,
        //     publicLoadBalancer: true,
        // });
        
        table.grantFullAccess(fargateTaskDefinition.taskRole);
        
    }
}


class fargateApp extends cdk.App {
    constructor() {
        super();
        new fargateStack(this, 'fargate');
    }
}

new fargateApp().run();

