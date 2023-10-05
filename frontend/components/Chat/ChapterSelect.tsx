import { useChatContext } from '@/context/Chat';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import React from 'react';
const ChapterSelect = (): JSX.Element => {
    const handleChange = (event: SelectChangeEvent) => {
        // changeSelectedChapter(event.target.value)
      };
    return (
        <div>
            <Select
            className="mr-2 mt-2 h-14 content-end w-36 rounded-lg"
            // value={selectedChapterID}
            // onChange={(handleChange)}
            // displayEmpty
            inputProps={{'borderRadius' : 10}}
                >
                    <MenuItem value="Chapter 1">Chapter 1</MenuItem>
                    <MenuItem value="Chater 2">Chapter 2</MenuItem>
                    <MenuItem value="Chapter 3">Chapter 3</MenuItem>
            </Select>
        </div>

    )
}

export default ChapterSelect;
