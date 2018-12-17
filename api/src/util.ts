export let omit = (obj: any, keys: string[]): object => {
  return Object.keys(obj).reduce((acc, key) => {
    if (keys.includes(key)) return acc;
    return { ...acc, [key]: obj[key] };
  }, {});
}
