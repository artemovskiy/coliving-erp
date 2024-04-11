import { Box, IconButton } from '@mui/material';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { addMonths } from 'date-fns';
import { useCallback } from 'react';

interface Interval {
  start: Date;
  end: Date;
}

const stepForward = (interval: Interval): Interval => {
  return {
    start: addMonths(interval.start, 1),
    end: addMonths(interval.end, 1),
  };
};

const stepBackward = (interval: Interval): Interval => {
  return {
    start: addMonths(interval.start, -1),
    end: addMonths(interval.end, -1),
  };
};

interface DisplayIntervalPickerProps {
  value: Interval;
  onChange: (value: Interval) => void;
}

function DisplayIntervalPicker({ value, onChange }: DisplayIntervalPickerProps) {
  const handleNextClick = useCallback(() => {
    onChange(stepForward(value));
  }, [value, onChange]);

  const handleBeforeClick = useCallback(() => {
    onChange(stepBackward(value));
  }, [value, onChange]);

  return (
    <Box>
      <IconButton onClick={handleBeforeClick}>
        <NavigateBeforeIcon />
      </IconButton>
      <IconButton onClick={handleNextClick}>
        <NavigateNextIcon />
      </IconButton>
    </Box>
  );
}

export default DisplayIntervalPicker;
