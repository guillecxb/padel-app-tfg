import { serviceApiSlice } from "domain/service/serviceApiSlice";
import { SERVICE_TAGS } from "domain/tags";

export const faqApiSlice = serviceApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Hook para obtener las preguntas frecuentes (FAQs)
    getFaqs: builder.query({
      query: () => ({
        url: `/faqs/`,  // Endpoint del backend para obtener las FAQs
      }),
      providesTags: [SERVICE_TAGS.Faqs],  // Usamos un tag para manejar caché
    }),
  }),
});

// Exporta el hook generado por RTK Query
export const { useGetFaqsQuery } = faqApiSlice;