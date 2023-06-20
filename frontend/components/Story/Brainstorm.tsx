import { Button, Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, Slider } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form';
import ChatContent from '../Chat/ChatContent';
import { StoryProvider, useStoryContext } from '@/context/Brainstorm';
import { ChatPrompt } from '@/interfaces/Chat';
import TemperatureSlider from './TemperatureSlider';

export const BrainstormPage: React.FC<{}> = () => {
    return (
      <StoryProvider>
        <Brainstorm/>
      </StoryProvider>
    )
}

const Brainstorm = (): JSX.Element => {
    const {chatContentList, confirmBrainstorm, handleChatPrompt, genres: names} = useStoryContext();
    const [personName, setPersonName] = React.useState<string[]>([]);
    const { handleSubmit, register } = useForm<ChatPrompt>();
  
    const handleChange = (event: SelectChangeEvent<typeof personName>) => {
      const {
        target: { value },
      } = event;
      setPersonName(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
      );
    };

    return (
        <div>
            <div className='flex align-middle'>
                <FormControl sx={{ m: 1, width: 400 }}>
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
                      {names.map((name : string) => (
                      <MenuItem key={name} value={name}>
                          <Checkbox checked={personName.indexOf(name) > -1} />
                          <ListItemText primary={name} />
                      </MenuItem>
                      ))}
                  </Select>
                  <TemperatureSlider />
                </FormControl>
                <Button className='bg-green-500 hover:bg-green-600 text-white h-12' onClick={handleSubmit(handleChatPrompt)}>Submit</Button>

            </div>
            <ChatContent chatContentList={chatContentList}></ChatContent>
            <Button className='bg-green-500 hover:bg-green-600 text-white' onClick={confirmBrainstorm}>Confirm</Button>
        </div>

    );
  }
export default BrainstormPage