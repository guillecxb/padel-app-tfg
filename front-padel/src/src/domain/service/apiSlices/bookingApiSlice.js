import { generateParams } from "domain/restOrigins";
import { serviceApiSlice } from "domain/service/serviceApiSlice";
import { SERVICE_TAGS } from "domain/tags";

export const boookingAPiSlice = serviceApiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // useAvailableCourtsQuery
    availableCourts: builder.query({
      query: ({ customer_id, date }) => ({
        url: `/customers/${customer_id}/available-courts/`,
        params: { date },
      }),
      providesTags: [SERVICE_TAGS.Reservations],
    }),

    // useCreateReservationMutation
    createReservation: builder.mutation({
      query: ({ user_id, court_id, reservation_time, customer_id }) => ({
        url: `/reservations/`,
        method: "POST",
        body: {
          user_id,
          court_id,
          reservation_time,
          customer_id
        },
      }),
      providesTags: [SERVICE_TAGS.Reservations],
    }),

    // useGetUserReservationsQuery
    getUserReservations: builder.query({
      query: ({ user_id }) => ({
        url: `/users/${user_id}/reservations/`,
      }),
      providesTags: [SERVICE_TAGS.Reservations],
    }),

    // useDeleteReservationMutation
    deleteReservation: builder.mutation({
        query: (reservation_id) => ({
          url: `/reservations/${reservation_id}/`,
          method: 'DELETE',
        }),
        invalidatesTags: [SERVICE_TAGS.Reservations],
    }),

    // useGetCustomerReservationsQuery
    getCustomerReservations: builder.query({
      query: ({ customer_id }) => ({
        url: `/customers/${customer_id}/reservations/`,
      }),
      providesTags: [SERVICE_TAGS.Reservations],
    }),

    // useGetCustomerReservationsByDateQuery
    getCustomerReservationsByDate: builder.query({
      query: ({ customer_id, from_date }) => ({
        url: `/customers/${customer_id}/reservations-by-date/`,
        params: from_date ? { from_date } : {},
      }),
      providesTags: [SERVICE_TAGS.Reservations],
    }),

    // useGetReservationCountByCourtQuery
    getReservationCountByCourt: builder.query({
      query: ({ customer_id }) => ({
        url: `/customers/${customer_id}/reservations/count-by-court/`,
      }),
      providesTags: [SERVICE_TAGS.Reservations],
    }),

  }),
});

export const {
  useAvailableCourtsQuery,
  useCreateReservationMutation,
  useGetUserReservationsQuery,
  useDeleteReservationMutation,
  useGetCustomerReservationsQuery,
  useGetCustomerReservationsByDateQuery,
  useGetReservationCountByCourtQuery,
} = boookingAPiSlice;
