export const copyToClipboard = (text: string): void => {
  navigator.clipboard.writeText(text);
};

export const generateBookingId = (): string => {
  return `HTL${Date.now().toString().slice(-8)}${Math.random()
    .toString(36)
    .substr(2, 4)
    .toUpperCase()}`;
};
