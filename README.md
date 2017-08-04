# Radix

An employee portal application.

## Running the application
### Running the application with Docker
Running the application with Docker is the least involved way to start the application locally and check it out.  

Be sure to have docker installed and simply run the ```scripts/docker/start.sh``` script.  

1. Clone the project
2. Open a terminal and navigate to ```PROJECT_DIRECTORY/scripts/docker```
3. Execute the following command:  

```bash
# Start the application and it's dependencies
$ ./start.sh
```

To stop the application, simply remove the docker containers or use the supplied ```stop.sh``` script.

```bash
# Stop the application and it's dependencies
$ ./stop.sh
```

Verify the application is running by navigating to http://localhost:8080.

### Running the application independently
Running the application independently means to run each of the services locally. This will typically  be the best method of running the application during development.  

The instructions for running each of the services can be found in each of the individual project directories.