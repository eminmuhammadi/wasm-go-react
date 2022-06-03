import { Reducer } from 'redux';
import { ICalculator, CalculatorActions, CalculatorActionTypes } from './types';

export const initialState: ICalculator = {
    a: 0,
    b: 0,
    result: 0,
}

<<<<<<< HEAD
/**
 * 
 * @param state 
 * @param param1 
 * @returns 
 */
=======
>>>>>>> 21efb61fe373fb7decd3f29458d4a86906bd7d88
export const calculator: Reducer<ICalculator, CalculatorActions> = (
    state = initialState, { type, ...payload }
) => {
    switch (type) {
        case CalculatorActionTypes.ADD:
            return {
                ...state,
                ...payload
            };
        default:
            return state;
    }
};