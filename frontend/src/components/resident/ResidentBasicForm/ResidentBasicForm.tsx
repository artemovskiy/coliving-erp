import { Button, Grid, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { ResidentBasicFormData } from './types';
import { useCallback } from 'react';
import { ProgressButton } from '../../common/ProgressButton';

export interface ResidentBasicFormProps {
  data: ResidentBasicFormData;
  onChange?: (data: ResidentBasicFormData) => void
  onCreate?: () => void;
  createPending?: boolean;
}

function ResidentBasicForm(props: ResidentBasicFormProps) {
  const { data, onChange, onCreate, createPending } = props;

  const handleCreate = useCallback(() => {
    if(onCreate) onCreate();
  }, [ onCreate ]);

  const handleFirstNameChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = useCallback((event) => {
    if(!onChange) { return; }
    const changedData = {
      ...data,
      firstName: event.target.value,
    }
    onChange(changedData);
  }, [onChange, data]);

  return <Grid container rowSpacing={2}>
    <Grid item lg={12}>
      <TextField
        required
        id="outlined-required"
        label="First name"
        fullWidth
        value={data.firstName}
        onChange={handleFirstNameChange}
      />
    </Grid>
    <Grid item lg={12}>
      <DatePicker
        label="Birthday"
        value={data.birthDate}
      />
    </Grid>
    <Grid item lg={12}>
      <ProgressButton color='primary' onClick={handleCreate} pending={createPending}>
        Create
      </ProgressButton>
    </Grid>
  </Grid>;
}

export default ResidentBasicForm;