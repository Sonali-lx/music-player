export const formatTime = (sec) => {
  if (!sec || isNaN(sec)) {
    // NaN - not a number
    return "0:00";
  }

  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
//   not 1, 2, 3 but 01, 02, 03... - padStart

  return `${minutes}:${seconds}`;
};
