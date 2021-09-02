export function once(fn) {
  //console.log("hi");
  return function (...args) {
    if (fn) {
      const ret = fn.apply(this, args);
      fn = null;
      return ret;
    }
  };
}