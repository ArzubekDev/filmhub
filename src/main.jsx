import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { MainProvider } from "./providers";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      {" "}
      {/* ✅ Redux Provider кошулду */}
      <BrowserRouter>
        <MainProvider>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </MainProvider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
