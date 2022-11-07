export function generateUniqueId(arr: number[]) {
  let uniqueId = 1;
  while (arr.includes(uniqueId)) uniqueId++;
  return uniqueId;
}
