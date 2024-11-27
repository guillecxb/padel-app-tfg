import { APP_FORM_DATA, CONTENT_TYPE_HEADER, CUSTOMERS_API_URL } from "domain/restOrigins";
import { accountsApiSlice } from "domain/accounts/accountsApiSlice";
import { ACCOUNTS_TAGS } from "domain/tags";

// La librería que está usando aquí dentro construye las URLs y hace las peticiones HTTP
export const customersApiSlice = accountsApiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // useCustomersQuery -> obtener todos los clientes
    customers: builder.query({
      query: () => `/customers/`,
      providesTags: [ACCOUNTS_TAGS.Customers],
    }),






    
    // 3º endpoint -> crear un nuevo cliente
    createCustomer: builder.mutation({
      query: (body) => ({
        // recibe un BODY y se envía un forma data
        url: `${CUSTOMERS_API_URL}/customers/`,
        method: "POST",
        formData: true,
        headers: {
          [CONTENT_TYPE_HEADER]: APP_FORM_DATA,
        },
        body,
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Customers],
    }),

    // 4º endpoint -> actualizar un cliente existente
    updateCustomer: builder.mutation({
      query: ({ body, customerId }) => ({
        // recibe un BODY y un customerId y se envía un forma data
        url: `${CUSTOMERS_API_URL}/customers/${customerId}/`,
        method: "PATCH",
        formData: true,
        headers: {
          [CONTENT_TYPE_HEADER]: APP_FORM_DATA,
        },
        body,
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Customers],
    }),
  }),
});

export const {
  useCustomersQuery,
  useCreateCustomerMutation,
  useUpdateCustomerMutation,
} = customersApiSlice;
