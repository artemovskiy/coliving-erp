import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { ChooseHouseDialog, ChooseHouseValue } from '../../input/ChooseHouseDialog';
import { SmartChooseHouseValue } from './types';
import { housesContext } from '../../../logic/HousesProvider';

export interface SmartChooseHouseDialogProps {
  open: boolean;
  value?: SmartChooseHouseValue
  allowChooseAll?: boolean;
  onClose: () => void
  onApply: (e: SmartChooseHouseValue) => void
}

function SmartChooseHouseDialog({
  open, value, allowChooseAll, onApply, onClose,
}: SmartChooseHouseDialogProps) {
  const { data: houses, isPending: housesPending, fetchIfNeed } = useContext(housesContext);
  useEffect(() => {
    if (open) return fetchIfNeed();
    return () => {};
  }, [fetchIfNeed, open]);

  const [internalValue, setInternalValue] = useState<ChooseHouseValue | undefined>();
  const handleChooseHouseApply = useCallback(() => {
    if (internalValue) {
      if (internalValue.all) {
        onApply({ all: true });
      } else {
        const house = houses?.find((i) => i.id === internalValue.houseId);
        onApply({ all: false, house });
      }
    }
    onClose();
  }, [internalValue, onApply, onClose, houses]);

  useEffect(() => {
    setInternalValue(value ? {
      all: value.all,
      houseId: value.house?.id,
    } : undefined);
  }, [open, setInternalValue, value]);

  return (
    <ChooseHouseDialog
      onChange={setInternalValue}
      value={internalValue}
      onApply={handleChooseHouseApply}
      open={open}
      onClose={onClose}
      options={houses}
      optionsPending={housesPending}
      allowChooseAll={allowChooseAll}
    />
  );
}

SmartChooseHouseDialog.defaultProps = {
  allowChooseAll: false,
};

export default SmartChooseHouseDialog;
