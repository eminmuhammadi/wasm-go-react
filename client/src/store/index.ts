import { configureStore } from '@reduxjs/toolkit'
import { reduxBatch } from '@manaflair/redux-batch'
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { combineReducers } from 'redux';

// Reducers
import { calculator as reducerCalculator }  from './calculator/reducer';

// Initial States
import { initialState as calculatorInitialState  } from './calculator/';

// Middleware
import reduxSaga from 'redux-saga';
import logger from 'redux-logger';
import { rootSaga } from './sagas';

// Redux saga
const sagaMiddleware = reduxSaga();

// Root Reducer
export const reducer = combineReducers({
    calculator: reducerCalculator,
});

// Store (initial state)
export const preloadedState = {
    calculator: calculatorInitialState,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, sagaMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [reduxBatch],
});

sagaMiddleware.run(rootSaga);

export type AppState = ReturnType<typeof reducer>;

export const useTypedSelector: TypedUseSelectorHook<AppState> = useSelector;

export default store;