import { AgentTemplate, TokenData } from "@/interfaces";
import axios from "axios";


export async function createToken(authToken: string, tokenData: TokenData) {
    try {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/agent/create-token`,
            {
                "tokenName": tokenData.tokenName,
                "symbol": tokenData.symbol,
                "tokenDescription": tokenData.tokenDescription,
                "tokenImageUrl": tokenData.tokenImageUrl,
                "supply": parseInt(tokenData.supply.toString()),
                "contractAddress": tokenData.contractAddress,
                "website": tokenData.website,
                "twitter": tokenData.twitter,
                "telegram": tokenData.telegram,
                "discord": tokenData.discord,
                "youtube": tokenData.youtube,
                "youtubeChannelId": tokenData.youtubeChannelId,
                "twitchChannelId": tokenData.twitchChannelId
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        console.log("Access Token:", response.data.access_token);
        return {
            message: response.data.id,
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

export async function getAgentTemplates(authToken: string): Promise<AgentTemplate[]> {

    try {

        const response = await axios.get(`${import.meta.env.VITE_API_URL}/agent/templates`,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        const agentTemplates: AgentTemplate[] = response.data;

        return agentTemplates;

    } catch {
        return [];
    }

}

export async function addTokenCharacter(authToken: string, aiTokenId: number, agentImageUrl: string, agentName: string, agentIpfsUrl: string) {

    try {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/agent/add-token-character`,
            {
                aiTokenId,
                agentImageUrl,
                agentName,
                agentIpfsUrl
                
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        if (response.status === 201) {
            return {
                message: aiTokenId,
                errorType: null,
                statusCode: response.status
            }
        } else {
            return {
                message: "something went wrong!",
                errorType: "danger",
                statusCode: response.status
            }
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



export async function addTokenPersonality(authToken: string, aiTokenId: number, voiceType: string, personalityType: string[]) {

    try {

        const response = await axios.post(`${import.meta.env.VITE_API_URL}/agent/add-token-personality`,
            {
                aiTokenId,
                voiceType,
                personalityType
            },
            {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            }
        );

        if (response.status === 201) {
            return {
                message: aiTokenId,
                errorType: null,
                statusCode: response.status
            }
        } else {
            return {
                message: "something went wrong!",
                errorType: "danger",
                statusCode: response.status
            }
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