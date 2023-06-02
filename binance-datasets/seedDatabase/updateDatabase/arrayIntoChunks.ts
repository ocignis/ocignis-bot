export const arrayIntoChunks = <T extends ReadonlyArray<unknown>>(
  array: T,
  chunkSize: number,
): ReadonlyArray<Array<T[number]>> => {
  const arrayChunks = [];

  for (let i = 0; i < array.length; i += chunkSize) {
    const chunk = array.slice(i, i + chunkSize);
    arrayChunks.push(chunk);
  }

  return arrayChunks;
};
