install: 
    npm ci && sudo npm link

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
	
.PHONY: test