PHONY: \
	build_test_image \

build_test_image:
	docker-compose -f docker-compose-test.yml up -d
