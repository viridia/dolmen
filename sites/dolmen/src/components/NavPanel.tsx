import { Aside, Nav } from 'dolmen';
import { For, Match, ParentComponent, Switch } from 'solid-js';
import { A } from 'solid-start';
import styles from './NavPanel.module.scss';
import { pageIndex } from './pageIndex';

const NavItem: ParentComponent<{ href: string; disabled?: boolean }> = props => (
  <Nav.Link as={A} {...props} end />
);
// props.disabled ? (
//   <li class={styles.disabled}>{props.children}</li>
// ) : (
//   <li>
//     <A class={styles.link} href={props.href} end>
//       {props.children}
//     </A>
//   </li>
// );

export const NavPanel = () => {
  return (
    <Aside class={styles.navPanel}>
      <Nav>
        <For each={pageIndex}>
          {group => (
            <>
              <Nav.Group>{group.title}</Nav.Group>
              <Switch>
                <Match when={group.groups}>
                  <For each={group.groups}>
                    {subgroup => (
                      <>
                        <Nav.Subgroup>{subgroup.title}</Nav.Subgroup>
                        <For each={subgroup.pages}>
                          {page => (
                            <NavItem href={page.href} disabled={page.disabled}>
                              {page.title}
                            </NavItem>
                          )}
                        </For>
                      </>
                    )}
                  </For>
                </Match>
                <Match when={group.pages}>
                  <For each={group.pages}>
                    {page => (
                      <NavItem href={page.href} disabled={page.disabled}>
                        {page.title}
                      </NavItem>
                    )}
                  </For>
                </Match>
              </Switch>
            </>
          )}
        </For>
      </Nav>
    </Aside>
  );
};
