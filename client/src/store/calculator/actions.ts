import { AddAction, CalculatorActionTypes } from './types';
import { wasm } from "./../../_wasm";

/**
 * Add two numbers
 * @param a 
 * @param b 
 * @returns number
 */
export const Add = async (a: number, b: number): Promise<AddAction> => {
    const { add } = await wasm;
    
    return {
        type: CalculatorActionTypes.ADD,
        a,
        b,
        result: add(a, b),
    }
};