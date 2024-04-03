FROM eclipse-temurin:21-jre-alpine
RUN mkdir /opt/app
COPY target/*.jar /opt/app/japp.jar

RUN addgroup -S demo && adduser -S demo -G demo
USER demo

CMD ["java", "-jar", "/opt/app/japp.jar"]
