import { combineReducers } from "@reduxjs/toolkit";
import CounterReducer from "./reducers/CounterReducer/counterreducer";

const rootReducer = combineReducers({
    CounterReducer: CounterReducer,
});

export default rootReducer;