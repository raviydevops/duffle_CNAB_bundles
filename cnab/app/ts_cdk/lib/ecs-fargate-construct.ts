import cdk = require('@aws-cdk/cdk');
import ec2 = require('@aws-cdk/aws-ec2');
import ecs = require('@aws-cdk/aws-ecs');



export interface ecsFargateConstructProps {
    ecsVpc: ec2.VpcNetwork,
    memoryMiB: string,
    cpu: string
}

export class ecsFargateConstruct extends cdk.Construct  {
    readonly fargateTaskDefinition: ecs.FargateTaskDefinition;
    readonly ecsCluster: ecs.Cluster;
    constructor(parent: cdk.Construct, id: string, props: ecsFargateConstructProps) {
        super(parent, id);

        this.ecsCluster = new ecs.Cluster(this, 'fargateCluster', {
            vpc: props.ecsVpc
        });

        this.fargateTaskDefinition = new ecs.FargateTaskDefinition(this, 'TaskDef', {
            memoryMiB: props.memoryMiB,
            cpu: props.cpu
        });

    }
    
    addContainer(containerDefinitionProps: ecs.ContainerDefinitionProps): ecs.ContainerDefinition{
        return this.fargateTaskDefinition.addContainer('ecsContainer', containerDefinitionProps);
    };

}