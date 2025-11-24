import axios, { AxiosError } from "axios";

export const getErrorMessage = (error: unknown): string => {
  // Axios error 
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<any>;

    // 1. If backend sends { message: "" }
    if (axiosError.response?.data?.message) {
      return axiosError.response.data.message;
    }

    // 2. If backend sends text (string)
    if (typeof axiosError.response?.data === "string") {
      return axiosError.response.data;
    }

    // 3. fallback to axios internal message
    return axiosError.message || "Request failed. Please try again.";
  }

  // Normal JS error
  if (error instanceof Error) return error.message;

  // Unknown error
  return "Unexpected error occurred.";
};
