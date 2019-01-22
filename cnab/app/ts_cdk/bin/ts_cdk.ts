#!/usr/bin/env node
import cdk = require('@aws-cdk/cdk');
import ecs = require('@aws-cdk/aws-ecs');
import ec2 = require('@aws-cdk/aws-ec2');
import { dynamodbTable } from '../lib/dynamodb-table';
import { loadBalancerConstruct } from '../lib/load-balancer-construct';
import { ecsFargateConstruct } from '../lib/ecs-fargate-construct';

class fargateStack extends cdk.Stack {
    constructor(parent: cdk.App, id: string, props?: cdk.StackProps) {
        super(parent, id, props);
        
        const ecsVpc = new ec2.VpcNetwork(this, 'fargateVPC');

        // dynamodb table creation
        const table = new dynamodbTable(this, 'dynamoDBTableECS', {
            dynamoDBtableName: 'ProductCatalog'
        });


        // ecs fargate cluster
        let ecsFargate = new ecsFargateConstruct(this, 'ecsFargate', {
            ecsVpc: ecsVpc,
            cpu: '512',
            memoryMiB: '1024',
        });

        // environment variables the container needs
        let ecsEnvs: { [ key: string ]: string } = {};
        ecsEnvs["AWS_ACCESS_KEY_ID"] = String(process.env.AWS_ACCESS_KEY_ID);
        ecsEnvs["AWS_SECRET_ACCESS_KEY"] = String(process.env.AWS_SECRET_ACCESS_KEY);

        ecsFargate.addContainer({
            image: ecs.ContainerImage.fromDockerHub('raviydevops/crud-springboot:2.0.0'),
            environment: ecsEnvs
        }).addPortMappings({
            containerPort:8080,
            protocol: ecs.Protocol.Tcp
        });

        const ecsService = new ecs.FargateService(this, 'Service', {
            cluster: ecsFargate.ecsCluster,
            taskDefinition: ecsFargate.fargateTaskDefinition,
            desiredCount: 1
        });
        
        

        // attaching loadbalancer to ecs fargate cluster
        const lb =new loadBalancerConstruct(this, 'ecsLB', {
            internetFacingLB: true,
            vpcLB: ecsVpc
        });

        lb.addTargets({
            port: 8080,
            targets: [ecsService]
        });

        
        // granting full access on dynamodb table to ecs
        table.grantFullAccess(ecsFargate.fargateTaskDefinition.taskRole);


        new cdk.Output(this, 'lbDnsName', {
            value: lb.dnsName
        });

        
    }
}


class fargateApp extends cdk.App {
    constructor() {
        super();
        new fargateStack(this, 'fargate');
    }
}

new fargateApp().run();

