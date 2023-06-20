import axios from "axios"
import { BRAINSTORMING_API, BRAINSTORMING_CONFIRM_API, OUTLINE_API } from "./endpoints"
import {  ChatResponse } from "./models/chat"
import { OutlineStoryResponse } from "./models/story";

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

export const getBrainstormHistory = async (): Promise<ChatResponse | null> => {
  try {
    const result = await axios<ChatResponse>(BRAINSTORMING_API);
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {}
  return null
}

export const confirmBrainstormResponse = async (data : ChatResponse): Promise<ChatResponse | null> => {
  try {
    const result = await axios.post<ChatResponse>(BRAINSTORMING_CONFIRM_API, data);
    if (result.status === 200) {
      return result.data;
    }
  } catch (error) {}
  return null
}

// Get story outline
export const getStoryOutline = async (): Promise<OutlineStoryResponse | null> => {
  try {
    const result = await axios<OutlineStoryResponse>(OUTLINE_API)
    if (result.status === 200){
      return result.data
    }
  } catch (error) {}
  return null
}