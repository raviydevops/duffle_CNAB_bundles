"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cdk = require("@aws-cdk/cdk");
const ec2 = require("@aws-cdk/aws-ec2");
const ecs = require("@aws-cdk/aws-ecs");
class fargateStack extends cdk.Stack {
    constructor(parent, id, props) {
        super(parent, id, props);
        const vpc = new ec2.VpcNetwork(this, 'fargateVPC');
        const cluster = new ecs.Cluster(this, 'fargateCluster', {
            vpc: vpc
        });
        new ecs.LoadBalancedFargateService(this, 'fargateService', {
            cluster: cluster,
            cpu: '256',
            desiredCount: 1,
            image: ecs.ContainerImage.fromDockerHub('jenkins:2.60.3'),
            memoryMiB: '1024',
            containerPort: 8080,
            publicLoadBalancer: true
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
