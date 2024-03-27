import React, { useCallback } from 'react';
import { Grid, TextField } from '@mui/material';
import { BasicHouseFormData } from './types';
import { ProgressButton } from '../../common/ProgressButton';

export interface BasicHouseFormProps {
  data: BasicHouseFormData;
  onChange: (value: BasicHouseFormData) => void;
  onCreate?: () => void;
  createPending?: boolean;
}

function BasicHouseForm({
  data, onChange, onCreate, createPending,
}: BasicHouseFormProps) {
  const handleNameChange: React.ChangeEventHandler<HTMLInputElement> = useCallback((e) => {
    onChange({
      name: e.target.value,
    });
  }, [onChange]);

  const handleCreate = useCallback(() => {
    if (onCreate) onCreate();
  }, [onCreate]);

  return (
    <Grid container rowSpacing={2}>
      <Grid item lg={12}>
        <TextField
          required
          id="outlined-required"
          label="name"
          fullWidth
          value={data.name}
          onChange={handleNameChange}
        />
      </Grid>
      <Grid item lg={12}>
        <ProgressButton color="primary" onClick={handleCreate} pending={createPending}>
          Create
        </ProgressButton>
      </Grid>
    </Grid>
  );
}

export default BasicHouseForm;
