import { config } from './css';

export type FontSizes = keyof typeof config.theme.fontSizes;
export type SizeVariant = 'xl' | 'lg' | 'md' | 'sm' | 'xs';
export type ButtonSizeVariant = SizeVariant | 'mini' | 'tiny';
export type Spacings = keyof typeof config.theme.space;
export type ZIndices = keyof typeof config.theme.zIndices;
