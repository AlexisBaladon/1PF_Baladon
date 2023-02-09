export const generateId = (function () {
  let id = 6;
  return function () {
    return (++id).toString();
  }
})();