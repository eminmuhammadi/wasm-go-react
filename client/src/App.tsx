import WasmAdapter from "./_lib/WasmAdapter";
import { useEffect, useState } from "react";

interface IWasm {
  add: (a: number, b: number) => number;
}

function App() {
  const [state, setState] = useState({
    a: 0,
    b: 0,
    result: 0,
    // Dummy call to load the wasm module
    add: (a: number, b: number): number => {
      return 0;
    },
  });

  /**
   * Inject the wasm module into the state
   */
  useEffect(() => {
    const adapter = new WasmAdapter();
    const wasm = adapter.inject("http://localhost:3000/_wasm/main.wasm");

    wasm.then((exports: WebAssembly.Exports) => {
      const addFunction = exports.add as IWasm["add"];

      setState((prev) => {
        return {
          ...prev,
          add: addFunction,
        };
      });
    });
  }, []);

  /**
   * Listen input value changes
   * @param e 
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  /**
   * Calculate the result
   */
  const calculate = () => {
    setState((prev) => {
      return {
        ...prev,
        result: prev.add(prev.a, prev.b),
      };
    });
  };

  return (
    <main>
      <div
        style={{
          paddingBottom: "20px",
        }}
      >
        {/* A input */}
        <input type="number" name="a" value={state.a} onChange={handleChange} />

        {/* Arithmetic operator */}
        <span style={{ paddingRight: "10px", paddingLeft: "10px" }}>+</span>

        {/* B input */}
        <input type="number" name="b" value={state.b} onChange={handleChange} />

        {/* Result */}
        <span style={{ paddingRight: "10px", paddingLeft: "10px" }}>=</span>
        <input type="number" name="result" value={state.result} disabled />
      </div>

      {/* Button  */}
      <button onClick={calculate}>Calculate</button>
    </main>
  );
}

export default App;
