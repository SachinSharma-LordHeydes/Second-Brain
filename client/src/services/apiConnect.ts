
// import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

interface ApiConnect {
    method: "POST" | "GET" | "DELETE" | "UPDATE";
    url: string;
    data?: any;
    params?: string;
    headers?: Record<string, string>;
}



export const apiConnect = async ({ method, url, data, params, headers }: ApiConnect): Promise<AxiosResponse> => {
    try {
        // Get token and ensure it does not have extra quotes
        const token = localStorage.getItem("token")?.replace(/"/g, ""); // Remove unnecessary quotes

        // Ensure token is correctly formatted
        const authHeader = token ? `Bearer ${token}` : undefined;

        const config: AxiosRequestConfig = {
            method,
            url,
            data,
            params,
            headers: {
                ...headers,
                ...(authHeader && { Authorization: authHeader }), // Only add Authorization if token exists
            },
        };
        console.log("Congig-->",config)
        const response = await axios(config);
        return response;
    } catch (error: any) {
        console.log("Error occurred while calling backend---->", error.message);
        if (error instanceof AxiosError) {
            throw new Error(error.response?.data || error.message);
        }
        throw error;
    }
};

