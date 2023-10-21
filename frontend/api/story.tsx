import axios from "axios"
import { BRAINSTORMING_API, BRAINSTORMING_CONFIRM_API, IMPROVE_API, OUTLINE_API, REVIEW_API, SAVE_CHAPTER_API, WRITING_API } from "./endpoints"
import {  ChatResponse } from "./models/chat"
import { CreateChapterResponse, ImproveChapterResponse, OutlineStoryResponse, ReviewChapterResponse } from "./models/story";
import { ChapterContent } from "@/interfaces/Story";
import { getintialContent } from "@/helper/editor";

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

// Create Chapter
export const createChapter = async (data: ChapterContent): Promise<CreateChapterResponse | null> => {
  try {
    const result = await axios.post<CreateChapterResponse>(WRITING_API, data)
    if (result.status === 200){
      return {...result.data, contentBlock: JSON.stringify(getintialContent(result.data))}
    }
  } catch (error) {}
  return null
}

// Improve the chapter text
export const improveText = async (data: ChapterContent): Promise<ImproveChapterResponse | null> => {
  try {
    const result = await axios.post<ImproveChapterResponse>(IMPROVE_API, data)
    if (result.status === 200){
      return result.data
    }
  } catch (error) {}
  return null
}


// save story outline
export const saveChapterContent = async (data: ChapterContent): Promise<CreateChapterResponse | null> => {
  try {
    const result = await axios.post<CreateChapterResponse>(SAVE_CHAPTER_API, data)
    if (result.status === 200){
      return result.data
    }
  } catch (error) {}
  return null
}

// review story
export const reviewStory = async (): Promise<ReviewChapterResponse | null> => {
  try {
    const result = await axios<CreateChapterResponse>(REVIEW_API)
    if (result.status === 200){
      return result.data
    }
  } catch (error) {}
  return null
}