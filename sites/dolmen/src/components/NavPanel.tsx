import { Aside } from 'dolmen';
import { ParentComponent } from 'solid-js';
import { A } from 'solid-start';
import styles from './NavPanel.module.scss';

const NavItem: ParentComponent<{ href: string; disabled?: boolean }> = props =>
  props.disabled ? (
    <li class={styles.disabled}>{props.children}</li>
  ) : (
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
              <NavItem href="/start/overview" disabled>Overview</NavItem>
              <NavItem href="/start/installation" disabled>Installation</NavItem>
              <NavItem href="/start/themes" disabled>Themes</NavItem>
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
                  <NavItem href="/components/Menu" disabled>
                    Menu
                  </NavItem>
                  <NavItem href="/components/Menu" disabled>
                    Modal
                  </NavItem>
                  <NavItem href="/components/Menu" disabled>
                    Slider
                  </NavItem>
                </ul>
              </li>
              <li>
                <header>Data Display</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Avatar" disabled>Avatar</NavItem>
                  <NavItem href="/components/Badge">Badge</NavItem>
                  <NavItem href="/components/Callout" disabled>Callout</NavItem>
                  <NavItem href="/components/ColorGrid" disabled>ColorGrid</NavItem>
                  <NavItem href="/components/ColorSwatch" disabled>ColorSwatch</NavItem>
                  <NavItem href="/components/List" disabled>List</NavItem>
                  <NavItem href="/components/Table" disabled>Table</NavItem>
                  <NavItem href="/components/Tooltip" disabled>Tooltip</NavItem>
                </ul>
              </li>
              <li>
                <header>Feedback</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Alert" disabled>Alert</NavItem>
                  <NavItem href="/components/EmptyResult" disabled>EmptyResult</NavItem>
                  <NavItem href="/components/Toast" disabled>Toast</NavItem>
                </ul>
              </li>
              <li>
                <header>Forms</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/CheckBox" disabled>
                    CheckBox
                  </NavItem>
                  <NavItem href="/components/FormField" disabled>
                    FormField
                  </NavItem>
                  <NavItem href="/components/Input" disabled>
                    Input
                  </NavItem>
                  <NavItem href="/components/Label" disabled>
                    Label
                  </NavItem>
                  <NavItem href="/components/Select" disabled>
                    Select
                  </NavItem>
                  <NavItem href="/components/TextArea" disabled>
                    TextArea
                  </NavItem>
                  <NavItem href="/components/ToggleSwitch" disabled>
                    ToggleSwitch
                  </NavItem>
                </ul>
              </li>
              <li>
                <header>Layout</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Aside" disabled>
                    Aside
                  </NavItem>
                  <NavItem href="/components/Card" disabled>
                    Card
                  </NavItem>
                  <NavItem href="/components/Drawer" disabled>
                    Drawer
                  </NavItem>
                  <NavItem href="/components/Group" disabled>
                    Group
                  </NavItem>
                  <NavItem href="/components/Page" disabled>
                    Page
                  </NavItem>
                  <NavItem href="/components/ScrollArea" disabled>
                    ScrollArea
                  </NavItem>
                  <NavItem href="/components/Spacer" disabled>
                    Spacer
                  </NavItem>
                  <NavItem href="/components/SplitPane" disabled>
                    SplitPane
                  </NavItem>
                  <NavItem href="/components/Stack" disabled>
                    Stack
                  </NavItem>
                </ul>
              </li>
              <li>
                <header>Navigation</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Breadcrumbs" disabled>Breadcrumbs</NavItem>
                  <NavItem href="/components/Nav" disabled>Nav</NavItem>
                </ul>
              </li>
              <li>
                <header>Text</header>
                <NavItem href="/components/Code" disabled>Code</NavItem>
                <NavItem href="/components/Header" disabled>Header</NavItem>
                <NavItem href="/components/TextSpan" disabled>TextSpan</NavItem>
              </li>
            </ul>
          </li>
          <li>
            <header>Hooks</header>
          </li>
          <li>
            <header>Extending</header>
          </li>
          <li>
            <header>Packages</header>
          </li>
        </ul>
      </nav>
    </Aside>
  );
};
