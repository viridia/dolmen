import { ParentComponent } from 'solid-js';
import { Stack } from '../../components';
import { css, cx, styleProps } from '../../styles';

export const $category = 'styling';

const redCss = css({
  color: 'red',
});

const StyledComponent: ParentComponent<{ classList: Record<string, boolean> }> = props => {
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
      <StyledComponent classList={cx({ m: 10 })}>m: 10</StyledComponent>
      <StyledComponent classList={cx({ m: '1rem' })}>m: 1rem</StyledComponent>
      <StyledComponent classList={cx({ m: 'xl' })}>m: xl</StyledComponent>
      <StyledComponent classList={cx(redCss(), { m: 'xl' })}>m: xl red</StyledComponent>
    </Stack>
  );
}

export default () => <StylePropsFixture />;
