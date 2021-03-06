import { useState } from "react";

// Store
import store from "./store";
import { useTypedSelector } from "./store";

// Add Action
import { Add } from "./store/calculator/actions";

function App() {
  // Get the state from the store
  const calculator = useTypedSelector((state) => state.calculator);

  // State
  const [state, setState] = useState({
    ...calculator,
  });

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
  const calculate = async () => {
    return store.dispatch(await Add(Number(state.a), Number(state.b)));
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
        <input type="number" name="result" value={calculator.result} disabled />
      </div>

      {/* Button  */}
      <button onClick={calculate}>Calculate</button>
    </main>
  );
}

export default App;
