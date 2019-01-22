// import cdk = require('@aws-cdk/cdk');
// import dynamodb = require('@aws-cdk/aws-dynamodb');
// import ecs = require('@aws-cdk/aws-ecs');
// import ec2 = require('@aws-cdk/aws-ec2');


// export class fargateStack extends cdk.Stack {
//   constructor(parent: cdk.App, id: string, props?: cdk.StackProps) {
//       super(parent, id, props);
//       const vpc = new ec2.VpcNetwork(this, 'fargateVPC');

//       const cluster = new ecs.Cluster(this, 'fargateCluster', {
//           vpc: vpc,
//           clusterName: "Spring boot ECS fargateCluster"
//       });

//       const table = new dynamodb.Table(this, 'Table', {
//           readCapacity: 20,
//           writeCapacity: 20
//         });

      

//       new ecs.LoadBalancedFargateService(this, 'fargateService', {
//           cluster: cluster,  
//           cpu: '256', 
//           desiredCount: 1,
//           image: ecs.ContainerImage.fromDockerHub('raviydevops/crud-springboot:1.0.0'),
//           memoryMiB: '1024',
//           containerPort: 8080,
//           publicLoadBalancer: true 
//       });
      
//   }
// }


// class fargateApp extends cdk.App {
//   constructor() {
//       super();
//       new fargateStack(this, 'fargate');
//   }
// }

// new fargateApp().run();