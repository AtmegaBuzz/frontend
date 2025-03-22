import { AIToken } from "@/interfaces";
import axios from "axios";



export async function getTokens(filterByWalletAddress: string, filterByTokenName: string, page: number, pageSize: number) {

    try {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/agent`, {
            params: {
                walletAddress: filterByWalletAddress,
                tokenName: filterByTokenName,
                tokenDescription: "",
                page,
                pageSize
            }
        });
    
        if (response.status !== 200) {
            return { message: "Something went wrong!", error: "danger", statusCode: 500 };
        }

        return {message: response.data, error: "success", statusCode: 200}

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const { message, error: errType, statusCode } = error.response.data;
            console.error(`Error ${statusCode}: ${message} (${errType})`);
            return { message, error: errType, statusCode }
        } else {
            console.error("Unexpected error:", error);
        }
        return { message: 'Something went wrong!', error: "danger", statusCode: 404 };
    }

} 



export async function getToken(tokenId: number) {

    try {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/agent/${tokenId}`);
    
        if (response.status !== 200) {
            return { message: "Something went wrong!", error: "danger", statusCode: 500 };
        }

        return {message: response.data, error: "success", statusCode: 200}

    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const { message, error: errType, statusCode } = error.response.data;
            console.error(`Error ${statusCode}: ${message} (${errType})`);
            return { message, error: errType, statusCode }
        } else {
            console.error("Unexpected error:", error);
        }
        return { message: 'Something went wrong!', error: "danger", statusCode: 404 };
    }

}