import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseUrl } from "@/lib/configs";

export const generalAPI = createApi({
    reducerPath: "generalAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
    }),
    endpoints: (builder) => ({
        getFAQS: builder.query({
            query() {
                return {
                    url: 'faqs',
                };
            },
            providesTags: (result, error, id) => [{ type: "Faqs", id }],
        }),
        getContactInfos: builder.query({
            query() {
                return {
                    url: 'contact_infos',
                };
            },
            providesTags: (result, error, id) => [{ type: "ContactInfos", id }],
        }),
        getlegislaions: builder.query({
            query() {
                return {
                    url: 'legislations',
                };
            },
            providesTags: (result, error, id) => [{ type: "legislation", id }],
        }),
        getInformation: builder.query({
            query() {
                return {
                    url: 'information',
                };
            },
            providesTags: (result, error, id) => [{ type: "information", id }],
        }),
        getChecklists: builder.query({
            query() {
                return {
                    url: 'checklists',
                };
            },
            providesTags: (result, error, id) => [{ type: "checklists", id }],
        }),
        getServices: builder.query({
            query() {
                return {
                    url: 'services',
                };
            },
            providesTags: (result, error, id) => [{ type: "services", id }],
        }),
        getAboutCertificate: builder.query({
            query() {
                return {
                    url: 'about_certificates',
                };
            },
            providesTags: (result, error, id) => [{ type: "about_certificate", id }],
        }),
        getAdministrativePersonnels: builder.query({
            query() {
                return {
                    url: 'administrative_personnels',
                };
            },
            providesTags: (result, error, id) => [{ type: "administrative_pesonnels", id }],
        }),
        getService: builder.query({
            query(id) {
                return {
                    url: `services/${id}`,
                };
            },
            providesTags: (result, error, id) => [{ type: "services", id }],
        }),
    }),
});

export const {
    useGetFAQSQuery,
    useGetContactInfosQuery,
    useGetlegislaionsQuery,
    useGetChecklistsQuery,
    useGetServicesQuery,
    useGetAdministrativePersonnelsQuery,
    useGetAboutCertificateQuery,
    useGetServiceQuery,
    useGetInformationQuery } = generalAPI;