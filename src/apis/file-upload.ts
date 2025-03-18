import axios from "axios";


export async function uploadFile(authToken: string, file: File, containerName: string) {

    const formData = new FormData();
    formData.append("file", file);
    formData.append("containerName", containerName)

    try {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/file/upload`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        return {
            message: response.data.url,
            errorType: null,
            statusCode: response.status
        }
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