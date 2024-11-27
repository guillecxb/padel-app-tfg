// Se define un SLICE de estado para manejar el estado de la autenticación del usuario.

import { createSlice } from "@reduxjs/toolkit";

// initialState -> estado inicial de la autenticación
const initialState = {
  access: null,
  customerId: null,
  role: null,
  id: null,
  obId: null,
  language: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  // createSlice es una función de Redux Toolkit que simplifica la creación de reducers y acciones. Automáticamente genera las acciones correspondientes a los reducers que defines.
  name: "auth", // nombre del slice -> auth
  initialState, // estado inicial de la autenticación

  reducers: {
    // reducers -> funciones que modifican el estado de la autenticación
    setMe: (state, action) => {
      const { ob_id: obId, id, role, customer_id: customerId, language } = action.payload; // extrae datos del payload de la acción

      state.role = role;
      state.customerId = customerId;
      state.language = language;
      state.id = id;
      state.obId = obId;
      state.isLoggedIn = true;
    },

    // Configura el token de acceso y maneja la persistencia del token de refresco en el almacenamiento local o de sesión dependiendo si el usuario quiere ser recordado o no
    setCredentials: (state, action) => {
      const { access, refresh, rememberMe } = action.payload;

      // console.log("setCredentials action", action.payload);
      // console.log("access:", access);
      // console.log("refresh:", refresh);
      // console.log("rememberMe:", rememberMe);

      state.access = access;

      // Guardar el access token en el local storage
      localStorage.setItem("accessToken", access);

      rememberMe
        ? localStorage.setItem("refreshToken", refresh)
        : sessionStorage.setItem("refreshToken", refresh);
    },

    // Limpia el estado del usuario y elimina los tokens de refresco almacenados, efectivamente deslogueando al usuario
    logOut: (state) => {
      state.role = undefined;
      state.customerId = undefined;
      state.id = undefined;
      state.obId = undefined;
      state.language = undefined;
      state.isLoggedIn = undefined;
      localStorage.setItem("refreshToken", "");
      sessionStorage.setItem("refreshToken", "");

      return state;
    },
  },
});

// Las acciones generadas por createSlice se exportan para ser usadas en componentes o en otros lugares donde se necesite modificar el estado de autenticación.
export const { setCredentials, setRole, logOut, setMe } = authSlice.actions;

// El reducer generado por createSlice se exporta para ser utilizado en el store de Redux.
export default authSlice.reducer;

// Selectores -> funciones que extraen datos específicos del estado global de la aplicación
export const getToken = (state) => state.auth.access; // devuelve el token de acceso
export const getMe = (state) => state.auth; // devuelve el estado de la autenticación
export const getRole = (state) => state?.auth; // devuelve el rol del usuario
