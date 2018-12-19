import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');


class fargateStack extends cdk.Stack {
    constructor(parent: cdk.App, id: string, props?: cdk.StackProps) {
        super(parent, id, props);
        const vpc = new ec2.VpcNetwork(this, 'fargateVPC');

        const cluster = new ecs.Cluster(this, 'fargateCluster', {
            vpc: vpc
        });

        new ecs.LoadBalancedFargateService(this, 'fargateService', {
            cluster: cluster,  
            cpu: '256', 
            desiredCount: 1,
            image: ecs.ContainerImage.fromDockerHub('raviydevops/simple-nodejs-weather-app:1.0'),
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