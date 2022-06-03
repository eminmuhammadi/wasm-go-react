/**
 *  WASM Adapter
 *  @author Emin Muhammadi
 *  @version 1.0.0
 */
class WasmAdapter {
    go: Go;
    importObject: WebAssembly.Imports;

    /**
     * Initialize the adapter
     */
    constructor() {
        // Defined in wasm_exec.js. Don't forget to add this in your index.html.
        this.go = new Go();
        // Get the importObject from the go instance.
        this.importObject = this.go.importObject;
    }

    /**
     * Inject
     * @param {*} wasmFile 
     * @returns 
     */
    async inject(wasmFile: string): Promise<WebAssembly.Exports> {
        // Instantiate our wasm module
        const wasmModule = await this.importWasmModule(
            wasmFile,
            this.importObject
        );

        // Allow the wasm_exec go instance, bootstrap and execute our wasm module
        this.go.run(wasmModule.instance);

        return wasmModule.instance.exports;
    }

    /**
     * Import the wasm module
     * @param {*} wasmModuleUrl 
     * @param {*} importObject 
     * @returns 
     */
    async importWasmModule(
        wasmModuleUrl: string,
        importObject: WebAssembly.Imports
    ): Promise<WebAssembly.WebAssemblyInstantiatedSource> {
        let response = undefined;

        // Check if the browser supports streaming instantiation
        if (WebAssembly.instantiateStreaming) {
            // Fetch the module, and instantiate it as it is downloading
            response = await WebAssembly.instantiateStreaming(
                fetch(wasmModuleUrl),
                importObject
            );
        } else {
            // Fallback to using fetch to download the entire module
            // And then instantiate the module
            const fetchAndInstantiateTask = async () => {
                const wasmArrayBuffer = await fetch(wasmModuleUrl).then((response) =>
                    response.arrayBuffer()
                );
                return WebAssembly.instantiate(wasmArrayBuffer, importObject);
            };

            response = await fetchAndInstantiateTask();
        }

        return response;
    }
}

export default WasmAdapter;