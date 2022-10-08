import { style } from '@vanilla-extract/css';
import { palette } from '../../styles';

export const layoutStyle = style({
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  border: `1px solid ${palette.coolgray[350]}`
});
