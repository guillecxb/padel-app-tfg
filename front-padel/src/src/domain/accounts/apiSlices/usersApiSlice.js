import { generateParams, REFRESH_TOKEN, USERS_API_URL } from "domain/restOrigins";
import { ROLES } from "domain/accounts/roles";
import { accountsApiSlice } from "domain/accounts/accountsApiSlice";
import { setMe, logOut } from "domain/accounts/slices/authSlice";
import { setCustomerId } from "domain/accounts/slices/customerIdSlice";
import { ACCOUNTS_TAGS } from "domain/tags";

export const usersApiSlice = accountsApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    operators: builder.query({
      query: () => `${USERS_API_URL}/operators/`,
      providesTags: [ACCOUNTS_TAGS.Operators],
    }),

    // useUsersQuery
    users: builder.query({
      query: ({ params }) => `/users/`,
      providesTags: [ACCOUNTS_TAGS.Users],
    }),

    // updateSim: builder.mutation({
    //   query: ({ customer_id, icc, imsi, ki, opc, msisdn, owner }) => ({
    //     url: `/sims/?customer_id=${customer_id}`,
    //     method: "PATCH", // Método PATCH
    //     body: { icc, imsi, ki, opc, msisdn, owner },
    //   }),
    //   invalidatesTags: [ACCOUNTS_TAGS.Users],
    // }),

    // updateSim: builder.mutation({
    //   query: ({ customer_id, body }) => ({
    //     url: `/sims/?customer_id=${customer_id}`,
    //     method: "PATCH",
    //     body, // Pasar el cuerpo tal cual
    //   }),
    //   invalidatesTags: [ACCOUNTS_TAGS.Users],
    // }),

    // useUpdateSimMutation
    updateSim: builder.mutation({
      query: ({ customer_id, body }) => ({
        url: `/sims/?customer_id=${customer_id}`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Users],
    }),

    getUserById: builder.query({
      query: ({ id }) => `${USERS_API_URL}/users/${id}`,
      providesTags: [ACCOUNTS_TAGS.Users],
    }),

    createUser: builder.mutation({
      query: ({ name, password, role }) => ({
        url: '/user/create',
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: { name, password, role },
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Users],
    }),
    

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `${USERS_API_URL}/users/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Users],
    }),

    updateUser: builder.mutation({
      query: ({ id, body }) => ({
        url: `${USERS_API_URL}/users/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Users, ACCOUNTS_TAGS.Me],
    }),

    getMe: builder.query({
      query: () => `/user/me`,
      providesTags: [ACCOUNTS_TAGS.Me],
      async onQueryStarted(_id, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setMe(data));
          if (data.role === ROLES.CUSTOMER) {
            dispatch(setCustomerId({ customerId: data.customer_id }));
          }
        } catch (err) {}
      },
    }),

    // useSignInMutation
    signIn: builder.mutation({
      query: ({ login, password }) => ({
        url: `/login`,
        method: "POST",
        body: { login, password },
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Me],
    }),

    // useSignIn1Mutation
    signIn1: builder.mutation({
      query: ({ login, password }) => {
        const formData = new FormData();
        formData.append('name', login);
        formData.append('password', password);
    
        return {
          url: `/login/`,
          method: "POST",
          body: formData,  // Enviar el FormData en lugar de un objeto JSON
        };
      },
      invalidatesTags: [ACCOUNTS_TAGS.Me],
    }),
    
    signOut: builder.mutation({
      query: () => ({
        url: `${USERS_API_URL}/tokens/`,
        method: "DELETE",
        body: {
          refresh: localStorage.getItem(REFRESH_TOKEN) || sessionStorage.getItem(REFRESH_TOKEN),
        },
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Me],
      async onQueryStarted(_id, arg) {
        try {
          await arg.queryFulfilled;
        } catch (err) {}
        arg.dispatch(logOut());
      },
    }),
    refreshToken: builder.mutation({
      query: ({ refresh }) => ({
        // url: `${USERS_API_URL}/tokens/refresh/`,
        url: `/refresh/`,
        method: "POST",
        body: { refresh },
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Me],
    }),
    getCredentials: builder.query({
      query: ({ id }) => `${USERS_API_URL}/credentials/${id}/`,
      providesTags: [ACCOUNTS_TAGS.Users, ACCOUNTS_TAGS.Operators],
    }),
    createCredentials: builder.mutation({
      query: ({ userId, login, password }) => ({
        url: `${USERS_API_URL}/credentials/${userId}/`,
        method: "POST",
        body: { login, password },
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Operators, ACCOUNTS_TAGS.Users],
    }),
    updateCredentials: builder.mutation({
      query: ({ userId, login, password }) => ({
        url: `${USERS_API_URL}/credentials/${userId}/`,
        method: "PATCH",
        body: { login, password },
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Operators, ACCOUNTS_TAGS.Users, ACCOUNTS_TAGS.Me],
    }),
    getOneLink: builder.query({
      query: ({ user_id }) => ({
        url: `${USERS_API_URL}/link/${user_id}/`,
      }),
      providesTags: (result, error, args) => [{ type: ACCOUNTS_TAGS.Links, id: args.user_id }],
    }),

    createOperator: builder.mutation({
      query: ({ payload }) => ({
        url: `${USERS_API_URL}/operators/`,
        method: "POST",
        body: payload,
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Operators],
    }),

    updateOperator: builder.mutation({
      query: ({ id, fields }) => ({
        url: `${USERS_API_URL}/operators/${id}/`,
        method: "PATCH",
        body: fields,
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Operators, ACCOUNTS_TAGS.Me],
    }),

    validateCredentials: builder.mutation({
      query: ({ login }) => ({
        url: `${USERS_API_URL}/credentials-validate/`,
        method: "POST",
        body: { login },
      }),
    }),

    site: builder.query({
      query: ({ id }) => `${USERS_API_URL}/sites/${id}/`,
      providesTags: [ACCOUNTS_TAGS.Sites],
    }),
    updateSite: builder.mutation({
      query: ({ id, body }) => ({
        url: `${USERS_API_URL}/sites/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Operators, ACCOUNTS_TAGS.Me],
    }),

    // useDeleteUserByIdMutation,
    deleteUserById: builder.mutation({
      query: ({ userId }) => ({
        url: `/user/${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Users],
    }),

    // useUpdateUserByIdMutation
    updateUserById: builder.mutation({
      query: ({ userId, name, password }) => ({
        url: `/user/${userId}`,
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        body: { name, password },
      }),
      invalidatesTags: [ACCOUNTS_TAGS.Users],
    }),
  }),
});

export const {
  useSignInMutation,
  useSignIn1Mutation,
  useSignOutMutation,
  useGetMeQuery,
  useGetCredentialsQuery,
  useRefreshTokenMutation,
  useOperatorsQuery,
  useUsersQuery,
  useDeleteUserMutation,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useCreateCredentialsMutation,
  useUpdateCredentialsMutation,
  useGetOneLinkQuery,
  useCreateOperatorMutation,
  useUpdateOperatorMutation,
  useValidateCredentialsMutation,
  useSiteQuery,
  useUpdateSiteMutation,
  useDeleteUserByIdMutation,
  useUpdateUserByIdMutation,
} = usersApiSlice;
