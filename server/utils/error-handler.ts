import { ResError } from "../types/error";

export const errorHandler = (message: string, status: number) => {
    const error = new Error() as ResError;
    error.statusCode = status, 
    error.message = message
    return message
}