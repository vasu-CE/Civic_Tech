import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Toaster } from "sonner";
import { Provider } from "react-redux";
import App from "./App";
import store, { persistor } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
      <Toaster position="bottom-right" richColors />
    </PersistGate>
  </Provider>
);
