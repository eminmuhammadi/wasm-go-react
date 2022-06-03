import { Action } from 'redux';

export enum CalculatorActionTypes {
    ADD = "ADD",
}

export interface ICalculator {
    a: number;
    b: number;
    result: number;
}

// Action Types
export interface AddAction extends Action<CalculatorActionTypes.ADD> {
    a: number;
    b: number;
    result: number;
}

export type CalculatorActions = AddAction;