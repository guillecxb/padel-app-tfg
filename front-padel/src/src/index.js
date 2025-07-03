import "index.css";

import ReactDOM from "react-dom"; // ReactDOM, que permite renderizar tu aplicación React dentro del HTML.
import { Provider } from "react-redux"; // Importa el Provider de Redux, que sirve para inyectar el estado global (store) a toda la app. Así, cualquier componente puede conectarse a Redux con useSelector, useDispatch, etc.
import { BrowserRouter, Routes, Route } from "react-router-dom"; // BrowserRouter maneja las URLs, mientras que Routes y Route definen qué componente se muestra en cada URL.

import { store } from "domain/store"; // Importa el Redux store, donde configuras los reducers, middlewares, etc. Este objeto guarda todo el estado global de tu app.

import HealthCheck from "modules/app/health-check/HealthCheck";  // Chequea salud backend + red + versión, muestra alertas.
import ErrorBoundary from "modules/app/error-boundary/ErrorBoundary"; // Atrapa errores y muestra fallback en vez de romper todo.
import SnackbarProvider from "modules/common/snackbar/SnackbarProvider"; // Permite notificaciones rápidas desde cualquier lado.

import { MUIsticaProvider } from "custom/themes/default/MUIsticaProvider"; // Importa el proveedor de tema visual, probablemente basado en Material UI, pero con tu diseño
import { TranslationProvider } from "translations/TranslationProvider";  // Importa el proveedor de traducciones/internacionalización.

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
