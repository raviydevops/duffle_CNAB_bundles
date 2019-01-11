#!/bin/bash
# This script is configured in cdk.json to be used to execute
# the CDK java app by the command-line toolkit.
# The file .classpath.txt is created by when `mvn package` is called
# The first argument will be used as argv[0]
# exec java -cp $(cat .classpath.txt) com.myorg.SpringbootApp hello-cdk $@
exec java -jar target/aws_cdk_java-0.1-jar-with-dependencies.jar hello-cdk $@