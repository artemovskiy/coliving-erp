import { Box, Button, ButtonPropsColorOverrides, ButtonPropsVariantOverrides, CircularProgress } from '@mui/material';
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
  variant?: OverridableStringUnion<'text' | 'outlined' | 'contained', ButtonPropsVariantOverrides>;
}

function ProgressButton(props: ProgressButtonProps) {
  return <Box sx={{ m: 1, position: 'relative' }}>
    <Button
      onClick={props.onClick}
      variant={props.variant}
      color={props.color}
      fullWidth
      disabled={props.disabled}
    >
      { props.children }
    </Button>
    { props.pending
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
}

export default ProgressButton;