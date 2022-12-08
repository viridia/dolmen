import { Aside } from 'dolmen';
import { For, Match, ParentComponent, Switch } from 'solid-js';
import { A } from 'solid-start';
import styles from './NavPanel.module.scss';
import { pageIndex } from './pageIndex';

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
          <For each={pageIndex}>
            {group => (
              <li>
                <header>{group.title}</header>
                <Switch>
                  <Match when={group.groups}>
                    <For each={group.groups}>
                      {subgroup => (
                        <ul class={styles.componentGroup}>
                          <li>
                            <header>{subgroup.title}</header>
                            <ul class={styles.linkList}>
                              <For each={subgroup.pages}>
                                {page => (
                                  <NavItem href={page.href} disabled={page.disabled}>
                                    {page.title}
                                  </NavItem>
                                )}
                              </For>
                            </ul>
                          </li>
                        </ul>
                      )}
                    </For>
                  </Match>
                  <Match when={group.pages}>
                    <ul class={styles.linkList}>
                      <For each={group.pages}>
                        {page => (
                          <NavItem href={page.href} disabled={page.disabled}>
                            {page.title}
                          </NavItem>
                        )}
                      </For>
                    </ul>
                  </Match>
                </Switch>
              </li>
            )}
          </For>
        </ul>
      </nav>
    </Aside>
  );
};
