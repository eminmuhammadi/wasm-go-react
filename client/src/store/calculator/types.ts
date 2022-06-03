import { Action } from 'redux';

export enum CalculatorActionTypes {
    ADD = "@@calculator/AddAction",
}

export interface ICalculator {
    a: number;
    b: number;
    result: number;
}

/**
 * Add Action
 */
export interface AddAction extends Action<CalculatorActionTypes.ADD> {
    a: number;
    b: number;
    result: number;
}

export type CalculatorActions = AddAction;