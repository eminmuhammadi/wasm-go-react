import { Action } from 'redux';

export enum CalculatorActionTypes {
<<<<<<< HEAD
    ADD = "@@calculator/AddAction",
=======
    ADD = "ADD",
>>>>>>> 21efb61fe373fb7decd3f29458d4a86906bd7d88
}

export interface ICalculator {
    a: number;
    b: number;
    result: number;
}

<<<<<<< HEAD
/**
 * Add Action
 */
=======
// Action Types
>>>>>>> 21efb61fe373fb7decd3f29458d4a86906bd7d88
export interface AddAction extends Action<CalculatorActionTypes.ADD> {
    a: number;
    b: number;
    result: number;
}

export type CalculatorActions = AddAction;