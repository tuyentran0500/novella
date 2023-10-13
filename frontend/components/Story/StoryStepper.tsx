import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Brainstorm from './Brainstorm';
import { StoryProvider } from '@/context/Story';
import StoryWriting from './StoryWriting';

const steps = ['Brainstorm', 'Research', 'Outline Story', "Writing", "Feedback"];

const StoryStepper = (): JSX.Element => {

  return (
    <Box className="w-full h-full flex flex-col">
      <div className='grow'>
          <div className='flex flex-col h-full'>
            <div className='grow'>
                <StoryWriting/>
            </div>
          </div>
      </div>
    </Box>
  );
}

export default StoryStepper;