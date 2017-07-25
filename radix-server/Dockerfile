FROM java:8-jre

MAINTAINER Tony Lopez <tony.lopez1013@gmail.com>

COPY ./target/radix-server-0.0.1-SNAPSHOT.jar /app/app.jar

COPY ./scripts /app/scripts

RUN /app/scripts/load-db.sh

CMD ["java", "-jar", "/app/app.jar"]

EXPOSE 9001