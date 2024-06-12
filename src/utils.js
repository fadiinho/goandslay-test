/**
 * @param {string} email */
export function isValidEmail(email) {
  const reg = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  return reg.test(email);
}

/**
 * @param {string} email
 * @param {IterableIterator<import(".").User>} users */
export function userEmailExists(email, users) {
  for (const user of users) {
    if (user.email === email) return true;
  }

  return false;
}
