export function storageWrite(key, value) {
  if (!key) {
    throw new Error('You forgot to pass an argument "key".');
  }

  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

export function storageRead(key) {
  if (!key) {
    throw new Error('You forgot to pass an argument "key".');
  }

  let result = null;

  try {
    result = JSON.parse(localStorage.getItem(key));
  } catch (e) {}

  return result;
}

function remove(key) {
  if (!key) {
    throw new Error('You forgot to pass an argument "key".');
  }

  try {
    localStorage.removeItem(key);
  } catch (e) {}
}
