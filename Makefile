SHELL := /usr/bin/env bash

.PHONY: dev
dev: node_modules/.installed .env.local
	source .env.local && npm run dev

node_modules/.installed: package.json
	npm i && touch node_modules/.installed

.env.local:
	cp .env.sample .env.local

# ====================================
# ======= Docker Configuration =======
# ====================================

.PHONY: docker
docker: .env.local docker-build
	source .env.local && docker compose up

.PHONY: docker-build
docker-build:
	docker compose build
