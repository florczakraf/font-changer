lint:
	npx eslint .
	npx web-ext lint --warnings-as-errors
build:
	npx web-ext build --artifacts-dir=dist --overwrite-dest
