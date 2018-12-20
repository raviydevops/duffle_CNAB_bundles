FROM maven:3.6.0-jdk-8
COPY crud-springboot-dynamodb/pom.xml /usr/src/mymaven/
WORKDIR /usr/src/mymaven
RUN mvn dependency:go-offline -B --fail-never

COPY crud-springboot-dynamodb /usr/src/mymaven
# RUN mkdir -p /usr/src/mymaven/target
WORKDIR /usr/src/mymaven

# RUN mvn clean package -Dmaven.test.skip=true 

ENTRYPOINT [ "mvn", "package" ]
# ENTRYPOINT [ "java", "-jar", "./target/crud-springboot-dynamodb-0.0.1.jar" ]

