export function removeAllKeys() {
  localStorage.removeItem('user');
  localStorage.removeItem('token_user');
}

export function getToken() {
  if (typeof window !== 'undefined') {
    const storageItem = localStorage.getItem('token_user') ?? '{}';

    const parsedItem = JSON.parse(storageItem);

    if (!Object.keys(parsedItem).length) return null;

    return parsedItem;
  }

  return null;
}
