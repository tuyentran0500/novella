import { useChatContext } from '@/context/Chat';
import { useStoryContext } from '@/context/Story';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
const ChapterSelect = (): JSX.Element => {
    const {chapterHistoryList, changeSelectedChapter, selectedChapter} = useChatContext();
    const handleChange = (event: SelectChangeEvent) => {
        changeSelectedChapter(event.target.value)
      };
    return (
        <div>
            <Select
            className="mr-2 mt-2 h-14 content-end w-36 rounded-lg"
            value={selectedChapter.title}
            onChange={(handleChange)}
            // displayEmpty
            inputProps={{'borderRadius' : 10}}
                >
                    {chapterHistoryList.map((chapter, index) => (
                        <MenuItem value={chapter.title} key={index}>{chapter.title}</MenuItem>
                    ))}
            </Select>
        </div>

    )
}

export default ChapterSelect;
