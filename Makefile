install: install-deps
	npx simple-git-hooks

run:
	bin/nodejs-package.js 10

install-deps:
	npm ci

test:
	npx -n --experimental-vm-modules jest

test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint:
	npx eslint .

publish:
	npm publish
gendiff:
	./bin/gendiff.js --format plain ./__fixtures__/file1.yaml ./__fixtures__/file2.json
.PHONY: test