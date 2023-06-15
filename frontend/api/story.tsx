import axios from "axios"
import { BRAINSTORMING_API } from "./endpoints"
import {  ChatResponse } from "./models/chat"

export const getBrainstormResponse = async (data : ChatResponse): Promise<ChatResponse | null> => {
    try {
      const result = await axios.post<ChatResponse>(BRAINSTORMING_API, data);
      console.log(data, result);
      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {}
    return null
  }