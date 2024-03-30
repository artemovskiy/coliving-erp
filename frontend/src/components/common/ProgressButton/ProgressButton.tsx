import {
  Box, Button, ButtonPropsColorOverrides, ButtonPropsVariantOverrides, CircularProgress,
} from '@mui/material';
import type { OverridableStringUnion } from '@mui/types';
import { MouseEventHandler, ReactNode } from 'react';

export interface ProgressButtonProps {
  children: ReactNode,
  onClick?: MouseEventHandler<Element> | undefined;
  pending?: boolean;
  disabled?: boolean;
  color?: OverridableStringUnion<
  'inherit' | 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning',
  ButtonPropsColorOverrides
  >;
  fullWidth?: boolean;
  variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>;
}

function ProgressButton({
  onClick, variant, color, children, disabled, pending, fullWidth,
}: ProgressButtonProps) {
  return (
    <Box sx={{ m: 1, position: 'relative' }}>
      <Button
        onClick={onClick}
        variant={variant}
        color={color}
        fullWidth={fullWidth}
        disabled={disabled}
      >
        { children }
      </Button>
      { pending
      && (
        <CircularProgress
          size={24}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: '-12px',
            marginLeft: '-12px',
          }}
        />
      )}
    </Box>
  );
}

ProgressButton.defaultProps = {
  fullWidth: true,
};

export default ProgressButton;
