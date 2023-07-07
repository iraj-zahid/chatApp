// import { configureStore } from "@reduxjs/toolkit";
// import CounterReducer from "./reducers/CounterReducer/counterreducer"
// const store = configureStore({
//     reducer: {
//       CounterReducer: CounterReducer,
//     },
//   });
  
//   export { store };
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import rootReducer from "./rootReducer";

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

//reducer key is the state of redux
const store = configureStore({
  reducer: persistedReducer,
});

const persistor = persistStore(store);

export { store, persistor };