package com.myorg;

import software.amazon.awscdk.*;
import software.amazon.awscdk.services.dynamodb.Table;
import software.amazon.awscdk.services.dynamodb.TableProps;
import software.amazon.awscdk.services.dynamodb.Attribute;
import software.amazon.awscdk.services.dynamodb.AttributeType;
import software.amazon.awscdk.services.ec2.VpcNetwork;
import software.amazon.awscdk.services.ecs.Protocol;
import software.amazon.awscdk.services.ecs.*;
import software.amazon.awscdk.services.elasticloadbalancingv2.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class SpringbootStack extends Stack {
    public SpringbootStack(final App parent, final String name) {
        this(parent, name, null);
    }

    public SpringbootStack(final App parent, final String name, final StackProps props) {
        super(parent, name, props);

        VpcNetwork ecsVpc = new VpcNetwork(this, "ecsFargateVPC");

        Cluster ecsCluster = new Cluster(this, "ecsFargateCluster", ClusterProps.builder()
                .withClusterName("Spring boot ECS fargateCluster")
                .withVpc(ecsVpc)
                .build());

        Table dynamodbTable = new Table(this, "ProductCatalogTable", TableProps.builder()
                .withTableName("ProductCatalog")
                .withPartitionKey(new Attribute.Builder().withName("id").withType(AttributeType.String).build())
                .withReadCapacity(10)
                .withWriteCapacity(10)
                .build());
//        String c = table.getTableArn();
//        System.out.print("arnName is ....." +c);

//        table.addPartitionKey(new Attribute.Builder()
//                .withName("id")
//                .withType(AttributeType.String)
//                .build());



//        DockerImageAsset dockerImageAsset = new DockerImageAsset(this, "SpringbootImage", DockerImageAssetProps.builder()
//                .withDirectory("C:\\Users\\yrtej\\Documents\\git_repos\\crud-springboot-dynamodb")
//                .build());

//        AssetImage assetImage = new ContainerImage.fromAsset(this, "spring-boot-image", AssetImageProps.builder()
//        .withDirectory("C:\\Users\\yrtej\\Documents\\git_repos\\crud-springboot-dynamodb")
//        .build());

//        ContainerImage.

//        new ContainerImage.fromAsset(this, "spring-boot-image", AssetImageProps.builder()
//                .withDirectory("C:\\Users\\yrtej\\Documents\\git_repos\\crud-springboot-dynamodb")
//                .build())


        Map<String, String> ecsEnvs = new HashMap<>();
        ecsEnvs.put("AWS_ACCESS_KEY_ID", System.getenv("AWS_ACCESS_KEY_ID"));
        ecsEnvs.put("AWS_SECRET_ACCESS_KEY", System.getenv("AWS_SECRET_ACCESS_KEY"));


        FargateTaskDefinition fargateTaskDefinition = new FargateTaskDefinition(this, "ecsFargateTaskDef", FargateTaskDefinitionProps.builder()
                .withCpu("512")
                .withMemoryMiB("1024")
                .build());

        fargateTaskDefinition.addContainer("springbootContainer", ContainerDefinitionProps.builder()
                .withImage(ContainerImage.fromDockerHub("raviydevops/crud-springboot:2.0.0"))
                .withEnvironment(ecsEnvs)
                .build())
        .addPortMappings(PortMapping.builder().withContainerPort(8080).withProtocol(Protocol.Tcp).build());

        FargateService ecsService = new FargateService(this, "ecsFargateService", FargateServiceProps.builder()
                .withCluster(ecsCluster)
                .withTaskDefinition(fargateTaskDefinition)
                .withDesiredCount(1)
                .build());


//        LoadBalancedFargateService loadBalancedFargateService = new LoadBalancedFargateService(this, "fargateService", LoadBalancedFargateServiceProps.builder()
//                .withCluster(cluster)
//                .withCpu("256")
//                .withDesiredCount(1)
//                .withImage(new DockerHubImage("raviydevops/crud-springboot:1.0.0"))
//                .withMemoryMiB("1024")
//                .withContainerPort(8080)
//                .withPublicLoadBalancer(true)
//                .build());

        ApplicationLoadBalancer lb = new ApplicationLoadBalancer(this, "LB", ApplicationLoadBalancerProps.builder()
                .withVpc(ecsVpc)
                .withInternetFacing(true)
                .build());

        ApplicationListener lbListener = lb.addListener("ecsListener", ApplicationListenerProps.builder()
                .withPort(80)
                .build());

       ArrayList<IApplicationLoadBalancerTarget> lbTarget = new ArrayList<>(1);
       lbTarget.add(ecsService);

        lbListener.addTargets("ECS", AddApplicationTargetsProps.builder()
                .withPort(8080)
               .withTargets(lbTarget)
             /*   .withTargets(new ArrayList<IApplicationLoadBalancerTarget>() {
                    {
                        add(ecsService);
                    }
                }
                )*/
                .build());

        dynamodbTable.grantFullAccess(fargateTaskDefinition.getTaskRole());

        Output lbDnsName = new Output(this, "lbDnsName", OutputProps.builder()
                .withValue(lb.getDnsName())
                .build());

//        ContainerDefinition containerDefinition = new TaskDefinition(this, )

        SpringbootConstruct springBoot = new SpringbootConstruct(this, "springboot", SpringbootConstructProps.builder()
                .build());

    }
}