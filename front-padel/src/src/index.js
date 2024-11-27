import "index.css";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { store } from "domain/store";

import HealthCheck from "modules/app/health-check/HealthCheck";
import ErrorBoundary from "modules/app/error-boundary/ErrorBoundary";
import SnackbarProvider from "modules/common/snackbar/SnackbarProvider";

import { MUIsticaProvider } from "custom/themes/default/MUIsticaProvider";
import { TranslationProvider } from "translations/TranslationProvider";

import App from "./App";
import ScrollToTop from "./ScrollToTop";

ReactDOM.render(
  <Provider store={store}>
    <TranslationProvider>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <MUIsticaProvider>
            <SnackbarProvider>
              <ErrorBoundary>
                <ScrollToTop />
                <Routes>
                  <Route element={<App />} path="/*" />
                </Routes>
              </ErrorBoundary>
              <HealthCheck />
            </SnackbarProvider>
          </MUIsticaProvider>
        </BrowserRouter>
    </TranslationProvider>
  </Provider>,
  document.getElementById("root")
);
