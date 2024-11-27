import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Definir el slice para la API pública
export const publicApiSlice = createApi({
  reducerPath: "publicApi", // Nombre del slice
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000", // Base URL del backend FastAPI sin el prefijo /api
  }),
  endpoints: (builder) => ({
    // Endpoint para buscar noticias sobre pádel a través del backend
    getPadelNews: builder.query({
      query: (queryParams) => ({
        url: `/news/`,  // Directamente /news/ sin /api
        params: {
          q: queryParams.q || "padel", // Por defecto busca "padel"
          from_date: queryParams.from || "2024-09-09", // Fecha por defecto
          sortBy: queryParams.sortBy || "popularity", // Ordenar por popularidad
        },
      }),
    }),
  }),
});

// Hooks auto-generados por createApi para utilizar en los componentes
export const { useGetPadelNewsQuery } = publicApiSlice;
