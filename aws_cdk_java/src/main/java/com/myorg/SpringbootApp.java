package com.myorg;

import software.amazon.awscdk.App;

import java.util.Arrays;

public class SpringbootApp {
    public static void main(final String argv[]) {
        App app = new App();

        new SpringbootStack(app, "Spring-dynamodb");
        // new HelloStack(app, "hello-cdk-2");

        app.run();
    }
}
