export const generateId = (function () {
  let id = 0;
  return function () {
    return (++id).toString();
  }
})();