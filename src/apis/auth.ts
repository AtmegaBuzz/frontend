import axios from "axios";

export async function login(authToken: string) {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/auth/login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      }
    );

    console.log("Access Token:", response.data.access_token);
    return {
      message: response.data.access_token,
      errorType: null,
      statusCode: 200,
    };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const { message, error: errType, statusCode } = error.response.data;
      console.error(`Error ${statusCode}: ${message} (${errType})`);
      return { message, error: errType, statusCode };
    } else {
      console.error("Unexpected error:", error);
    }
    return {
      message: "Something went wrong!",
      error: "danger",
      statusCode: 404,
    };
  }
}