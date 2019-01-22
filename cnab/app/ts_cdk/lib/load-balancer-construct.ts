import cdk = require('@aws-cdk/cdk');
import elbv2 = require('@aws-cdk/aws-elasticloadbalancingv2');
import ec2 = require('@aws-cdk/aws-ec2');



export interface loadBalancerConstructProps {
    vpcLB: ec2.VpcNetwork,
    internetFacingLB: boolean    
}

export class loadBalancerConstruct extends cdk.Construct  {
    readonly lb: elbv2.ApplicationLoadBalancer;
    readonly lbListener: elbv2.ApplicationListener;
    readonly dnsName: string;
    constructor(parent: cdk.Construct, id: string, props: loadBalancerConstructProps) {
        super(parent, id);

        this.lb = new elbv2.ApplicationLoadBalancer(this, 'LB', {
            vpc: props.vpcLB,
            internetFacing: props.internetFacingLB
        });

        this.lbListener = this.lb.addListener('Listener', {
            port: 80
        });
    
        this.dnsName = this.lb.dnsName;
    }

    addTargets(addTargetsProps: elbv2.AddApplicationTargetsProps): loadBalancerConstruct{
        this.lbListener.addTargets('ecsTargets', addTargetsProps);
        return this;
    }

}