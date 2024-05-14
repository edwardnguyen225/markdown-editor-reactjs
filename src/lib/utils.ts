/**
 * @param dateIsoString - ISO string of the date
 * @returns formatted date string in the format of "DD MMM YYYY"
 */
export const formatDate = (dateIsoString: string): string => {
  const date = new Date(dateIsoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export const generateUUID = (): string => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
