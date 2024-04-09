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
import { format } from 'date-fns';
import { ProgressButton } from '../../components/common/ProgressButton';
import { useServerData } from '../../providers/ServerData';
import { useDataFetch } from '../../api/useApiFetch';

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
  deletePending: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
function RemoveAccommodationDialog({
  open, onClose, onConfirm, deletePending,
}: RemoveAccommodationDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Remove accommodation</DialogTitle>
      <DialogContent>
        <Typography>Do you want to remove the accommodation?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <ProgressButton onClick={onConfirm} color="error" pending={deletePending}>confirm</ProgressButton>
      </DialogActions>
    </Dialog>
  );
}

function AccommodationPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const onClose = () => {
    navigate('/accommodations');
  };

  const intId = useMemo(() => {
    if (id === undefined) {
      throw new Error();
    }
    const t = parseInt(id, 10);
    if (Number.isNaN(t)) {
      throw new Error();
    }
    return t;
  }, [id]);

  const { accommodations } = useServerData();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [accommodation, accommodationPending, accommodationError, setAccommodation] = useDataFetch(() => {
    return accommodations.get(intId);
  }, [intId]);

  const [removeDialogOpen, setRemoveDialogOpen] = useState(false);

  const [removePending, setRemovePending] = useState(false);
  const removeAccommodation = useCallback(() => {
    setRemovePending(true);
    accommodations.remove(intId)
      .then(() => {
        setRemoveDialogOpen(false);
        // naigate('/accommodations');
      })
      .finally(() => {
        setRemovePending(false);
      });
  }, [intId, accommodations]);

  const [savePending, setSavePending] = useState(false);

  const changeDateSpan = useCallback((value: DateSpan) => {
    setSavePending(true);
    accommodations.patch(intId, {
      startDate: format(value.start, 'yyyy-MM-dd'),
      endDate: format(value.end, 'yyyy-MM-dd'),
    })
      .then((res) => {
        setAccommodation(res);
        navigate(0);
      })
      .finally(() => {
        setSavePending(false);
      });
  }, [intId]);

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
        deletePending={removePending}
        onClose={() => setRemoveDialogOpen(false)}
        onConfirm={removeAccommodation}
      />
    </Drawer>
  );
}

export default AccommodationPreview;
