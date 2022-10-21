import { ParentComponent } from 'solid-js';
import { Stack } from '../../components';
import { styleProps, StyleProps } from '../../styles';

export const $category = 'styling';

const StyledComponent: ParentComponent<StyleProps> = props => {
  const [styles, rest] = styleProps(props);

  return (
    <div {...rest} classList={styles}>
      {props.children}
    </div>
  );
};

function StylePropsFixture() {
  return (
    <Stack gap="lg" alignItems="start">
      <StyledComponent m={10}>m: 10</StyledComponent>
      <StyledComponent m="1rem">m: 1rem</StyledComponent>
      <StyledComponent m="xl">m: xl</StyledComponent>
    </Stack>
  );
}

export default () => <StylePropsFixture />;
