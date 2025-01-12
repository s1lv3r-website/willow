/**
 * Split a string into an array of elements of length {size}
 *
 * @param string Input string to split
 * @param size Chunk size
 * @returns Chunked string
 */
export function chunkString(string: string, size: number): string[] {
  // Define the chunks array
  const chunks: string[] = []

  // Start at index, for every iteration add size to index
  for (let stringIndex = 0; stringIndex < string.length; stringIndex += size) {
    // Add index + size to the list
    chunks.push(string.substring(stringIndex, stringIndex + size));
  }

  return chunks;
}
