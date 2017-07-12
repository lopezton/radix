# radix-server
---
## General information

This is the server-side component to the employee portal application Radix. **radix-server** is a JWT Authenticated RESTful webservice application utilizing Spring Data Rest.

This application needs to be running for any dependent front-end applications (e.g. radix-dashboard).

## Running the Application
Before running the application be sure to have the following installed:  
* Java 8 (or greater)
* Maven
* Spring Tool Suite

### Running the Application: LOCAL (non-docker)

If running the application without using Docker, MongoDB is required. Install and start MongoDB (if not already completed). Verify MongoDB is running by executing the following command in a terminal:
```bash
mongo
```

You should see output similar to the following:
```bash
MongoDB shell version v3.4.5
connecting to: mongodb://127.0.0.1:27017
MongoDB server version: 3.4.5
2017-07-07T10:30:24.629-0500 I CONTROL  [initandlisten]
> _
```

Type ```exit``` to exit MongoDB.

**Run radix-server in Spring Tool Suite**
In Spring Tool Suite, locate the file  ```src/main/java/org/xpanxion/radix/radixserver/RadixServerApplication.java```, right click and select **Run As** > **Spring Boot Application**.

**Run radix-server in Terminal**
Open a terminal/command prompt at the **radix-server** root directory and issue the following command:  

```bash
mvn spring-boot:run
```

You should see the following output with no errors:

```bash
...
2017-07-11 21:21:45.985  INFO 4796 --- [  restartedMain] s.b.c.e.t.TomcatEmbeddedServletContainer : Tomcat started on port(s): 9001 (http)
2017-07-11 21:21:46.095  INFO 4796 --- [  restartedMain] org.mongodb.driver.connection            : Opened connection [connectionId{localValue:2, serverValue:68}] to localhost:27017
2017-07-11 21:21:46.199  INFO 4796 --- [  restartedMain] o.x.r.r.RadixServerApplication           : Started RadixServerApplication in 9.59 seconds (JVM running for 10.083)
```

**Validating the server is running**
Open your favorite web browser and navigate to http://localhost:9001/.  You should see the following output:  

```json
{"status":"UNAUTHORIZED","message":"Authentication failed","errorCode":10,"timestamp":1499826311606}
```

### Running the Application: LOCAL (w/ docker)

Coming soon.