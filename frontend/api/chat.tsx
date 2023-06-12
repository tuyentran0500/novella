import axios from "axios"
import { CHAT_API } from "./endpoints"
import { ChatResponse } from "./models/chat"

export const getChatResponse = async (data : ChatResponse): Promise<ChatResponse | null> => {
    try {
      const result = await axios.post<ChatResponse>(CHAT_API, data);
      console.log(data, result);
      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {}
    return null
  }