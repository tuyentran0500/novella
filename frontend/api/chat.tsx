import axios from "axios"
import { CHAT_BRAINSTORM_API, CHAT_CHAPTER_BRAINSTORM_API } from "./endpoints"
import { BrainstormHistoryResponse, ChatResponse } from "./models/chat"
import {  ChatData } from "@/interfaces/Chat";

export const getBrainstormResponse = async (data : ChatResponse): Promise<ChatResponse | null> => {
    try {
      const result = await axios.post<ChatResponse>(CHAT_BRAINSTORM_API, data);
      if (result.status === 200) {
        return result.data;
      }
    } catch (error) {}
    return null
  }

export const getChapterBrainstormResponse = async (data : ChatResponse, title: string): Promise<ChatResponse | null> => {
  try {
    const result = await axios.post<ChatResponse>(CHAT_CHAPTER_BRAINSTORM_API, {...data, "title" : title});
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {}
  return null
}

export const getBrainstormHistory = async (): Promise<ChatData | null> => {
  try {
    const result = await axios<BrainstormHistoryResponse>(CHAT_BRAINSTORM_API);
    if (result.status === 200) {
      return result.data
    }
  } catch (error) {}
  return null
}