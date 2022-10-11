import { globalStyle, style } from '@vanilla-extract/css';
import { theme } from '../../styles';

export const codeStyle = style({
  fontFamily: 'monospace',
  fontSize: '1rem',
});

export const titleStyle = style({
  fontFamily: theme.font.title,
  fontWeight: 'bold',
  marginTop: 0,
  marginBottom: '0.3em',
});

globalStyle(`h1.${titleStyle}`, {
  fontSize: '2rem',
});

globalStyle(`h2.${titleStyle}`, {
  fontSize: '1.4rem',
});

globalStyle(`h3.${titleStyle}`, {
  fontSize: '1.2rem',
});

globalStyle(`h4.${titleStyle}`, {
  fontSize: '1rem',
});

globalStyle(`h5.${titleStyle}`, {
  fontSize: '0.9rem',
});
