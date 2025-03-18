import axios from "axios";


export async function login(wallet_address: string, public_key: string, message: string, signature: string) {
    try {

        console.log(wallet_address)
        console.log(public_key)
        console.log(message)
        console.log(signature)
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
            wallet_address,
            public_key,
            message,
            signature
        });

        console.log("Access Token:", response.data.access_token);
        return response.data.access_token;
    } catch (error) {

        if (axios.isAxiosError(error) && error.response) {
            const { message, error: errType, statusCode } = error.response.data;
            console.error(`Error ${statusCode}: ${message} (${errType})`);
        } else {
            console.error("Unexpected error:", error);
        }
        return null;
    }
}