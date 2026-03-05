import { AxiosError } from "axios";

export const handleError = (error:unknown):never=>{
if (error instanceof AxiosError) {
    throw new Error (
        error.response?.data?.message || "Somthing went wrong"
    )
}
throw new Error("Unexpected error occurred")
}