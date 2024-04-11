import { House } from 'coliving-erp-api-client';
import {
  Button, CircularProgress, Dialog, DialogActions,
  DialogContent, DialogTitle, IconButton, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { useCallback, useMemo } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { ChooseHouseValue } from './types';

const ALL_OPTION = 'all';
const EMPTY_OPTION = '_empty';

export interface ChooseHouseDialogProps {
  open: boolean;
  value?: ChooseHouseValue;
  options?: House[];
  optionsPending: boolean;
  allowChooseAll?: boolean;
  onClose: () => void
  onChange: (e: ChooseHouseValue) => void
  onApply: () => void
}

interface SelectOption {
  value: string;
  label: string;
}

function ChooseHouseDialog(props: ChooseHouseDialogProps) {
  const {
    open, onClose, options, value, onChange, optionsPending, onApply, allowChooseAll,
  } = props;

  const curHidSafe = useMemo(() => {
    if (!value) { return EMPTY_OPTION; }
    return value.all ? ALL_OPTION : value.houseId!.toString();
  }, [value]);

  const handleSelectChange = useCallback((event: SelectChangeEvent<string>) => {
    const { value: newValue } = event.target;
    if (newValue === ALL_OPTION) {
      onChange({ all: true });
    } else {
      const intNewValue = parseInt(newValue, 10);
      onChange({ all: false, houseId: intNewValue });
    }
  }, [onChange]);

  const selectOptions: SelectOption[] = useMemo(() => {
    let o: SelectOption[] = [];
    if (!value) {
      o.push({ value: EMPTY_OPTION, label: ' - ' });
    }
    if (options) {
      o = o.concat(options.map((el) => ({ value: el.id!.toString(), label: el.name! })));
    }
    if (allowChooseAll) {
      o.push({ value: ALL_OPTION, label: 'All houses' });
    }
    return o;
  }, [options, allowChooseAll, value]);

  const handleApplyClick = useCallback(() => onApply(), [onApply]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={(theme) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
      })}
    >
      <DialogTitle>select house</DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent sx={{ minWidth: '400px' }}>
        {optionsPending && <CircularProgress />}
        <Select value={curHidSafe} onChange={handleSelectChange} fullWidth>
          { selectOptions.map((option) => <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>)}
        </Select>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button onClick={handleApplyClick}>Apply</Button>
      </DialogActions>
    </Dialog>
  );
}

ChooseHouseDialog.defaultProps = {
  allowChooseAll: false,
};

export default ChooseHouseDialog;
