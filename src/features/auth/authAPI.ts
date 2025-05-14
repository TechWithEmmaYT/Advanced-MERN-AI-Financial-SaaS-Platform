import { apiClient } from "@/app/api-client";

export const authApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (credentials) => ({
        url: '/auth/register',
        method: 'POST',
        body: credentials
      }),
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      })
    }),
    refresh: builder.mutation({
      query: () => ({
        url: '/auth/refresh-token',
        method: 'POST',
      })
    })
  })
});

export const { useLoginMutation, useRefreshMutation, useRegisterMutation, useLogoutMutation } = authApi;