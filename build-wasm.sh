#/bin/env bash

rm -rf client/public/_wasm && \
mkdir -p client/public/_wasm && \
cp $(tinygo env TINYGOROOT)/targets/wasm_exec.js client/public/wasm_exec.js && \
tinygo build -target wasm -no-debug -o client/public/_wasm/main.wasm src/main.go