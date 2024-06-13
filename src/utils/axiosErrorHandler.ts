import axios, { AxiosError } from "axios";

export const axiosErrorHandler = (err: AxiosError) => {
    if (axios.isAxiosError(err)) {
        return err.message;
    }
}