const API_KEY = 'API_KEY';

const ENCRYPTION_KEY = 'ENCRYPTION_KEY';

export function storeApiKey(key) {
  localStorage.setItem(API_KEY, key);
}

export function getApiKey() {
  return localStorage.getItem(API_KEY);
}

export function storeEncryptionKey(key) {
  localStorage.setItem(ENCRYPTION_KEY, key);
}

export function getEncryptionKey() {
  return localStorage.getItem(ENCRYPTION_KEY);
}
