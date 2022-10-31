import { createEffect, useContext } from 'solid-js';
import { createStore } from 'solid-js/store';
import { isServer } from 'solid-js/web';
import { parseCookie, ServerContext } from 'solid-start';

/** A Solid Store which is backed by a cookie. It initializes the store to the parsed
    value of the cookie (both on server and the client.) It also (client only) writes to
    document.cookie whenever the store is mutated.
 */
export const createCookieStore = <T extends object>(
  cookieName: string,
  initialValue: T
) => {
  // Initialize store from cookie (server or client).
  let cookie: string | null;
  if (isServer) {
    const event = useContext(ServerContext);
    cookie = event.request.headers.get('Cookie');
  } else {
    cookie = document.cookie;
  }

  try {
    const cookieValue = cookie && parseCookie(cookie)?.[cookieName];
    if (typeof cookieValue === 'string') {
      const parsed = JSON.parse(cookieValue);
      if (typeof parsed === 'object') {
        initialValue = parsed;
      }
    }
  } catch (e) {
    console.error(`Malformed data for cookie "${cookieName}".`);
  }

  const store = createStore<T>(initialValue);

  // Create an effect which updates document.cookie when the store is mutated.
  if (!isServer) {
    const [storeValue] = store;
    createEffect(() => {
      document.cookie = `${cookieName}=${JSON.stringify(storeValue)}`;
    });
  }

  return store;
};
