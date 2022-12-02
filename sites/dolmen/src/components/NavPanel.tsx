import { Aside } from 'dolmen';
import { ParentComponent } from 'solid-js';
import { A } from 'solid-start';
import styles from './NavPanel.module.scss';

const NavItem: ParentComponent<{ href: string }> = props => (
  <li>
    <A class={styles.link} href={props.href} end>
      {props.children}
    </A>
  </li>
);

export const NavPanel = () => {
  return (
    <Aside class={styles.navPanel}>
      <nav class={`${styles.nav}`}>
        <ul class={styles.navList}>
          <li>
            <header>Getting Started</header>
            <ul class={styles.linkList}>
              <NavItem href="/start/overview">Overview</NavItem>
              <NavItem href="/start/installation">Installation</NavItem>
            </ul>
          </li>
          <li>
            <header>Components</header>
            <ul class={styles.componentGroup}>
              <li>
                <header>Core</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Button">Button</NavItem>
                  <NavItem href="/components/ButtonGroup">ButtonGroup</NavItem>
                  <NavItem href="/components/DiscloseButton">DiscloseButton</NavItem>
                  <NavItem href="/components/Menu">Menu</NavItem>
                  <li>Modal</li>
                </ul>
              </li>
              <li>
                <header>Data Display</header>
              </li>
              <li>
                <header>Feedback</header>
              </li>
              <li>
                <header>Forms</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/CheckBox">CheckBox</NavItem>
                  <NavItem href="/components/FormField">FormField</NavItem>
                  <NavItem href="/components/Input">Input</NavItem>
                  <NavItem href="/components/Label">Label</NavItem>
                  <NavItem href="/components/Select">Select</NavItem>
                  <NavItem href="/components/TextArea">TextArea</NavItem>
                  <NavItem href="/components/ToggleSwitch">ToggleSwitch</NavItem>
                </ul>
              </li>
              <li>
                <header>Layout</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Aside">Aside</NavItem>
                  <NavItem href="/components/Card">Card</NavItem>
                  <NavItem href="/components/Drawer">Drawer</NavItem>
                  <NavItem href="/components/Group">Group</NavItem>
                  <NavItem href="/components/Page">Page</NavItem>
                  <NavItem href="/components/ScrollArea">ScrollArea</NavItem>
                  <NavItem href="/components/Spacer">Spacer</NavItem>
                  <NavItem href="/components/SplitPane">SplitPane</NavItem>
                  <NavItem href="/components/Stack">Stack</NavItem>
                </ul>
              </li>
              <li>
                <header>Navigation</header>
              </li>
              <li>
                <header>Text</header>
              </li>
            </ul>
          </li>
          <li>
            <header>Hooks</header>
          </li>
          <li>
            <header>Packages</header>
          </li>
        </ul>
      </nav>
    </Aside>
  );
};
