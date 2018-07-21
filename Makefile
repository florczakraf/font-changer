lint:
	npx eslint .
	npx web-ext lint --warnings-as-errors
build:
	npx web-ext build --artifacts-dir=dist --overwrite-dest --ignore-files \
	    docs Makefile package.json package-lock.json README.md
