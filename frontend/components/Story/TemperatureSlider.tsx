import { Slider } from "@mui/material";
import React from "react";
const marks = [
    {
      value: 0.0,
      label: 'Creative',
    },
    {
        value: 1.0,
        label: 'Balance',
      },
    {
      value: 2.0,
      label: 'Strict',
    },
  ];
const TemperatureSlider = ():JSX.Element => {
    return (
        <Slider
        className="m-6 text-green-500"
            defaultValue={1.0}
            min={0.0}
            max={2.0}
            step = {0.01}
            marks = {marks}

        />
    )
}

export default TemperatureSlider;
