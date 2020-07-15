# K6 Load testing tool
Docker environment (based on official loadimpact/k6 docker hub repository) required to run K6 load testing tool.

[![Actions Status](https://github.com/dimadeush/docker-k6-influxdb-grafana/workflows/k6/badge.svg)](https://github.com/dimadeush/docker-k6-influxdb-grafana/actions)
[![CircleCI](https://circleci.com/gh/dimadeush/docker-k6-influxdb-grafana.svg?style=svg)](https://circleci.com/gh/dimadeush/docker-k6-influxdb-grafana)

[Source code](https://github.com/dimadeush/docker-k6-influxdb-grafana.git)

## Requirements
* Docker version 18.06 or later
* Docker compose version 1.22 or later
* An editor or IDE

Note: OS recommendation - Linux Ubuntu based.

## Components
1. K6
2. Influxdb
3. Grafana

## Setting up environment
1.Clone this repository from GitHub.

2.Build, start the docker images from your terminal:
```bash
docker-compose build
make start
```

3.Make sure that you have created necessary test scripts in `scripts` folder.

4.Edit/extend command (`make tests`) in Makefile

5.Start your load tests:
```bash
make tests
```

6.In order to use visual report, please open in your browser next url: [http://localhost:3000](http://localhost:3000) and create/configure necessary dashboard.

## Getting shell to influxdb or grafana container
After application will start (`make start`) and in order to get shell access inside influxdb/grafana container you can run following commands:
```bash
make ssh-influxdb
make ssh-grafana
```
Note : Please use `exit` command in order to return from container's shell to local shell.

## Building containers
In case you edited Dockerfile or other environment configuration you'll need to build containers again using next commands:
```bash
make stop
docker-compose build
make start
```

## Start and stop environment
Please use next make commands in order to start and stop environment:
```bash
make start
make stop
```

## Additional main command available
```bash
make start
make stop

make restart

make ssh-influxdb
make ssh-grafana

make info

make tests

make logs-influxdb
make logs-grafana
make logs-k6

etc....
```
Notes: Please see more commands in Makefile

## External links / resources
* [loadimpact/k6](https://github.com/loadimpact/k6)

## Guidelines
* [K6](https://k6.io/docs/)
* [K6 + Grafana](https://k6.io/blog/k6-loves-grafana)

## Working on your project
1. For new feature development, fork `develop` branch into a new branch with one of the two patterns:
    * `feature/{ticketNo}`
2. Commit often, and write descriptive commit messages, so its easier to follow steps taken when reviewing.
3. Push this branch to the repo and create pull request into `develop` to get feedback, with the format `feature/{ticketNo}` - "Short descriptive title of Jira task".
4. Iterate as needed.
5. Make sure that "All checks have passed" on CircleCI(or another one in case you are not using CircleCI) and status is green.
6. When PR is approved, it will be squashed & merged, into `develop`.
