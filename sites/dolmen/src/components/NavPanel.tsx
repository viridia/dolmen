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
              <NavItem href="/start/overview" disabled>
                Overview
              </NavItem>
              <NavItem href="/start/installation">Installation</NavItem>
              <NavItem href="/start/philosophy">Philosophy</NavItem>
              <NavItem href="/start/themes" disabled>
                Themes
              </NavItem>
              <NavItem href="/start/flex">Flex Props</NavItem>
              <NavItem href="/start/roadmap" disabled>
                Roadmap
              </NavItem>
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
                  <NavItem href="/components/Modal">Modal</NavItem>
                  <NavItem href="/components/Slider" disabled>
                    Slider
                  </NavItem>
                </ul>
              </li>
              <li>
                <header>Data Display</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Avatar" disabled>
                    Avatar
                  </NavItem>
                  <NavItem href="/components/Badge">Badge</NavItem>
                  <NavItem href="/components/Callout">Callout</NavItem>
                  <NavItem href="/components/ColorGrid" disabled>
                    ColorGrid
                  </NavItem>
                  <NavItem href="/components/ColorSwatch">ColorSwatch</NavItem>
                  <NavItem href="/components/List" disabled>
                    List
                  </NavItem>
                  <NavItem href="/components/Table" disabled>
                    Table
                  </NavItem>
                  <NavItem href="/components/Tooltip" disabled>
                    Tooltip
                  </NavItem>
                </ul>
              </li>
              <li>
                <header>Feedback</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Alert">Alert</NavItem>
                  <NavItem href="/components/EmptyResult">EmptyResult</NavItem>
                  <NavItem href="/components/Toast" disabled>
                    Toast
                  </NavItem>
                </ul>
              </li>
              <li>
                <header>Forms</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/CheckBox">CheckBox</NavItem>
                  <NavItem href="/components/FormField" disabled>
                    FormField
                  </NavItem>
                  <NavItem href="/components/Input" disabled>
                    Input
                  </NavItem>
                  <NavItem href="/components/Label" disabled>
                    Label
                  </NavItem>
                  <NavItem href="/components/RadioButton" disabled>
                    RadioButton [planned]
                  </NavItem>
                  <NavItem href="/components/Select" disabled>
                    Select
                  </NavItem>
                  <NavItem href="/components/TextArea" disabled>
                    TextArea
                  </NavItem>
                  <NavItem href="/components/ToggleSwitch">ToggleSwitch</NavItem>
                </ul>
              </li>
              <li>
                <header>Layout</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Aside">Aside</NavItem>
                  <NavItem href="/components/Card">Card</NavItem>
                  <NavItem href="/components/Drawer" disabled>
                    Drawer
                  </NavItem>
                  <NavItem href="/components/Group">Group</NavItem>
                  <NavItem href="/components/Page">Page</NavItem>
                  <NavItem href="/components/ScrollArea">ScrollArea</NavItem>
                  <NavItem href="/components/Spacer">Spacer</NavItem>
                  <NavItem href="/components/SplitPane" disabled>
                    SplitPane
                  </NavItem>
                  <NavItem href="/components/Stack">Stack</NavItem>
                </ul>
              </li>
              <li>
                <header>Navigation</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Breadcrumbs" disabled>
                    Breadcrumbs
                  </NavItem>
                  <NavItem href="/components/Nav" disabled>
                    Nav
                  </NavItem>
                </ul>
              </li>
              <li>
                <header>Text</header>
                <ul class={styles.linkList}>
                  <NavItem href="/components/Code" disabled>
                    Code
                  </NavItem>
                  <NavItem href="/components/Header" disabled>
                    Header
                  </NavItem>
                  <NavItem href="/components/TextSpan" disabled>
                    TextSpan
                  </NavItem>
                </ul>
              </li>
            </ul>
          </li>
          <li>
            <header>Hooks</header>
            <ul class={styles.linkList}>
              <NavItem href="/hooks/createCssTransition">createCssTransition</NavItem>
              <NavItem href="/hooks/createDialogState" disabled>
                createDialogState
              </NavItem>
              <NavItem href="/hooks/createElementSize">createElementSize</NavItem>
              <NavItem href="/hooks/createFocusTrap">createFocusTrap</NavItem>
              <NavItem href="/hooks/createFormValidation" disabled>
                createFormValidation
              </NavItem>
              <NavItem href="/hooks/createTooltipWatcher" disabled>
                createTooltipWatcher
              </NavItem>
            </ul>
          </li>
          <li>
            <header>Customization</header>
            <ul class={styles.linkList}>
              <NavItem href="/customize/designTokens">Design Tokens</NavItem>
            </ul>
          </li>
          <li>
            <header>Packages</header>
          </li>
        </ul>
      </nav>
    </Aside>
  );
};
