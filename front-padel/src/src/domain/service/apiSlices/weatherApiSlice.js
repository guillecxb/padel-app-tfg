import { serviceApiSlice } from "domain/service/serviceApiSlice";
import { SERVICE_TAGS } from "domain/tags";

export const weatherApiSlice = serviceApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Hook para obtener el clima actual
    getCurrentWeather: builder.mutation({
      query: ({ latitude, longitude }) => ({
        url: `/weather/`,
        method: "POST",
        body: { latitude, longitude },  // Envío de latitud y longitud en el cuerpo
      }),
      providesTags: [SERVICE_TAGS.Sims],
    }),

    // Hook para obtener el clima de una fecha específica
    getWeatherByDate: builder.mutation({
      query: ({ latitude, longitude, date }) => ({
        url: `/weather/`,
        method: "POST",
        body: { latitude, longitude, date },  // Envío de latitud, longitud y fecha en el cuerpo
      }),
      providesTags: [SERVICE_TAGS.Sims],
    }),
  }),
});

// Exporta los hooks generados por RTK Query
export const { useGetCurrentWeatherMutation, useGetWeatherByDateMutation } = weatherApiSlice;
