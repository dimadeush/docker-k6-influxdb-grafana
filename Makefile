dir=${CURDIR}
project=-p k6
service=k6:latest
interactive:=$(shell [ -t 0 ] && echo 1)
ifneq ($(interactive),1)
	optionT=-T
endif

start:
	@docker-compose -f docker-compose.yml $(project) up -d
stop:
	@docker-compose -f docker-compose.yml $(project) down
restart: stop start

ssh-influxdb:
	@docker-compose $(project) exec $(optionT) influxdb bash
ssh-grafana:
	@docker-compose $(project) exec $(optionT) grafana /bin/sh

exec:
	@docker-compose $(project) run -v $(dir)/scripts:/scripts k6 $$cmd

tests:
	@make test-endpoints
test-endpoints:
	@make exec cmd="run /scripts/http_endpoints.js"

info:
	@make exec cmd="version"

logs-influxdb:
	@docker logs -f influxdb
logs-grafana:
	@docker logs -f grafana
logs-k6:
	@docker logs -f k6
