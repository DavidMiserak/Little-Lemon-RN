RUNTIME=docker
IMAGE=little-lemon-restaurant
TAG=latest
IMAGE_NAME=$(IMAGE):$(TAG)

.PHONY: run
run:
	yarn install
	export NODE_OPTIONS=--openssl-legacy-provider && npx expo start

.PHONY: run-container
run-container: build-image
	$(RUNTIME) run -it --rm \
		-p 19000:19000 \
		-p 19001:19001 \
		-p 19002:19002 \
		-p 19006:19006 \
		--user $(shell id -u):$(shell id -g) \
		$(IMAGE_NAME)

.PHONY: build-image
build-image: Dockerfile
	$(RUNTIME) build -f $< -t $(IMAGE_NAME) .

.PHONY: clean
clean:
	rm -rf .expo .expo-shared node_modules
	$(RUNTIME) rmi -f $(IMAGE_NAME)
