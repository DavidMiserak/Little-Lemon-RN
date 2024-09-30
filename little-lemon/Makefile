RUNTIME=docker
IMAGE=expo-react-native-runner
TAG=latest
IMAGE_NAME=$(IMAGE):$(TAG)

.PHONY: run
run:
	bun install
	npx expo start

.PHONY: run-container
run-container: build-image
	$(RUNTIME) run -it --rm \
		-p 8081:8081 \
		$(IMAGE_NAME)

.PHONY: build-image
build-image: Dockerfile
	$(RUNTIME) build -f $< -t $(IMAGE_NAME) .

.PHONY: clean
clean:
	rm -rf node_modules .expo ios android
	rm -fv bun.lockb package-lock.json yarn.lock
	$(RUNTIME) rmi -f $(IMAGE_NAME)
