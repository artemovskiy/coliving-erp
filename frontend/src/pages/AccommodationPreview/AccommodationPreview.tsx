import {
  Box, Button, Card, CircularProgress, Dialog, DialogActions, DialogContent,
  DialogTitle, Drawer, FormControl, FormLabel, Grid, IconButton, Toolbar, Typography,
} from '@mui/material';
import React, {
  useCallback, useEffect, useMemo, useState,
} from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { AccommodationDto } from 'coliving-erp-api-client';
import { DatePicker } from '@mui/x-date-pickers';
import { useApi } from '../../providers/ApiClient';
import { useApiFetch } from '../../api/useApiFetch';
import { ProgressButton } from '../../components/common/ProgressButton';

export interface DateSpan {
  start: Date;
  end: Date;
}

export interface AccommodationPreviewFormProps {
  accommodation: AccommodationDto;
  onSaveChanges: (dateSpan: DateSpan) => void;
  onRemove: () => void;
  isSavePending: boolean;
}
function AccommodationPreviewForm({
  accommodation, onRemove, isSavePending, onSaveChanges,
}: AccommodationPreviewFormProps) {
  // @ts-ignore
  const [startDateValue, setStartDateValue] = useState<Date>(new Date(accommodation.startDate as string));
  const [endDateValue, setEndDateValue] = useState<Date>(new Date(accommodation.endDate as string));
  useEffect(() => {
    if (accommodation !== undefined) {
      // @ts-ignore
      setStartDateValue(new Date(accommodation.startDate as string));
      setEndDateValue(new Date(accommodation.endDate as string));
    }
  }, [accommodation]);

  const isSaveAvailable = useMemo(() => {
    // @ts-ignore
    return startDateValue.getTime() !== new Date(accommodation.startDate as string).getTime()
     || endDateValue.getTime() !== new Date(accommodation.endDate as string).getTime();
  }, [startDateValue, endDateValue, accommodation]);

  const handleStartDateChange = useCallback((value: Date | null) => {
    if (value === null) {
      throw new Error();
    }
    setStartDateValue(value);
  }, []);

  const handleEndDateChange = useCallback((value: Date | null) => {
    if (value === null) {
      throw new Error();
    }
    setEndDateValue(value);
  }, []);

  return (
    <Box>
      <Card>
        <Typography>{accommodation.resident?.firstName}</Typography>
        <Link to={`/residents/${accommodation.resident?.id}`}>view</Link>
      </Card>
      <Grid container direction="column">
        <Grid item>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>Start date</FormLabel>
            <DatePicker
              value={startDateValue}
              onChange={handleStartDateChange}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl sx={{ display: 'flex' }}>
            <FormLabel>End date</FormLabel>
            <DatePicker
              value={endDateValue}
              onChange={handleEndDateChange}
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button color="error" onClick={onRemove}>delete</Button>
          <ProgressButton
            color="primary"
            disabled={!isSaveAvailable}
            onClick={() => onSaveChanges({
              start: startDateValue,
              end: endDateValue,
            })}
            pending={isSavePending}
          >
            save changes
          </ProgressButton>
        </Grid>
      </Grid>
    </Box>
  );
}
interface RemoveAccommodationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
function RemoveAccommodationDialog({ open, onClose, onConfirm }: RemoveAccommodationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove accommodation</DialogTitle>
      <DialogContent>
        <Typography>Do you want to remove the accommodation?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onConfirm} color="error">confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

function AccommodationPreview() {
  const { id } = useParams();
  const naigate = useNavigate();
  const onClose = () => {
    naigate('/accommodations');
  };

  const { accommodationsApi } = useApi();
  const [accommodation, accommodationPending] = useApiFetch(() => {
    if (id === undefined) {
      throw new Error();
    }
    const intId = parseInt(id, 10);
    if (Number.isNaN(intId)) {
      throw new Error();
    }
    return accommodationsApi.get2(intId);
  }, [id]);

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const removeAccommodation = useCallback(() => {
    setRemoveDialogOpen(false);
    naigate('/accommodations');
  }, []);

  const [savePending, setSavePending] = useState(false);

  const changeDateSpan = useCallback(() => {
    setSavePending(true);
    alert('not implemented');
  }, []);

  return (
    <Drawer anchor="right" open PaperProps={{ sx: { width: 1 / 3, padding: 2 } }} onClose={onClose}>
      <Toolbar />
      <Grid container direction="column">
        <Grid item>
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography>
                Accommodation
                {id}
              </Typography>
            </Grid>
            <Grid item justifySelf="end">
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          { accommodationPending && <CircularProgress />}
          { accommodation && (
          <AccommodationPreviewForm
            accommodation={accommodation}
            onSaveChanges={changeDateSpan}
            onRemove={() => setRemoveDialogOpen(true)}
            isSavePending={savePending}
          />
          )}
        </Grid>
      </Grid>
      <Box />
      <RemoveAccommodationDialog
        open={removeDialogOpen}
        onClose={() => setRemoveDialogOpen(false)}
        onConfirm={removeAccommodation}
      />
    </Drawer>
  );
}

export default AccommodationPreview;
