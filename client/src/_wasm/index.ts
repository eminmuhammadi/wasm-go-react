import WasmAdapter from "./WasmAdapter";

export const adapter = new WasmAdapter();

interface AddFunction {
    (a: number, b: number): number;
}

// From public folder
export const wasm = adapter.inject("/_wasm/main.wasm").then((exports) => {
    return {
        add: exports.add as AddFunction,
    };
});