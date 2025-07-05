up:
	docker compose -f ./infra/compose.yaml up -d

down:
	docker compose -f ./infra/compose.yaml down

.PHONY: run
