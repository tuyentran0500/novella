import { ChatResponse } from '@/api/models/chat';
import { getBrainstormResponse } from '@/api/story';
import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import ChatContent from '../Chat/ChatContent';
const names = [
    'Drama',
    'Fantasy',
    'Mystery',
    'Romance',
    'Sci-fi',
  ];
  
const Brainstorm = (): JSX.Element => {
    const [chatContentList, setChatContentList] = useState<ChatResponse[]>([]);
    const [personName, setPersonName] = React.useState<string[]>([]);
    const { handleSubmit, register } = useForm<ChatResponse>();
  
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    const handleChatPrompt = async (data: ChatResponse): Promise<void> => {
        console.log(data);
        const result = await getBrainstormResponse(data);
        if (result != null){
            setChatContentList(prevState => [...prevState, result]);
            console.log(result);
        }
    }
  
    return (
        <div>
            <div className='flex align-middle'>
                <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    input={<OutlinedInput label="Tag" />}
                    renderValue={(selected) => selected.join(', ')}
                    {...register('content', {
                    onChange: handleChange
                    })}
                >
                    {names.map((name) => (
                    <MenuItem key={name} value={name}>
                        <Checkbox checked={personName.indexOf(name) > -1} />
                        <ListItemText primary={name} />
                    </MenuItem>
                    ))}
                </Select>
                </FormControl>
                <Button className='bg-green-500 hover:bg-green-600 text-white' onClick={handleSubmit(handleChatPrompt)}>Submit</Button>
            </div>
            <ChatContent chatContentList={chatContentList}></ChatContent>
        </div>

    );
  }
export default Brainstorm