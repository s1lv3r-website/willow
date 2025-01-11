// place files you want to import through the `$lib` alias in this folder.

/**
 * https://stackoverflow.com/a/29202760
 *
 * @param {string} string Input string to split
 * @param {string} size Chunk size
 * @returns {string[]} Chunked string
 */
export function chunkString(string: string, size: number): string[] {
  const chunks: string[] = []

  for (let stringIndex = 0; stringIndex < string.length; stringIndex += size) {
    chunks.push(string.substring(stringIndex, stringIndex + size));
  }

  return chunks;
}
