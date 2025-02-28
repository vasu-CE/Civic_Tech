import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import problemReducer from "./problemSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { combineReducers } from "redux";

const userPersistConfig = {
  key: "user",
  storage,
};

const problemPersistConfig = {
  key: "problems",
  storage,
};

const rootReducer = combineReducers({
  user: persistReducer(userPersistConfig, userReducer),
  problem: persistReducer(problemPersistConfig, problemReducer),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, 
    }),
});

export const persistor = persistStore(store);
export default store;
