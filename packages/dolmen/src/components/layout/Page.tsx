import { ParentComponent, JSX, splitProps } from 'solid-js';
import { flexKeys, flexProps, FlexProps } from '../../styles';

const PageHeaderTitle: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <span
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-page-header-title': true,
      }}
    />
  );
};

const PageHeader: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <header
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-page-header': true,
      }}
    />
  );
};

const PageContent: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <section
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-page-content': true,
      }}
    />
  );
};

export const Page: ParentComponent<JSX.HTMLAttributes<HTMLElement> & FlexProps> & {
  Header: typeof PageHeader;
  Title: typeof PageHeaderTitle;
  Content: typeof PageContent;
} = props => {
  const [local, rest] = splitProps(props, ['class', 'classList', ...flexKeys]);

  return (
    <main
      {...rest}
      classList={{
        ...local.classList,
        ...flexProps(local),
        [local.class as string]: !!local.class,
        'dm-page': true,
      }}
    />
  );
};

Page.Header = PageHeader;
Page.Title = PageHeaderTitle;
Page.Content = PageContent;
