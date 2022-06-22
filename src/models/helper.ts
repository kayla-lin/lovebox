// Reduces string replace with ellipses
export const strReducer = (s: string, limit: number) => {
  return s.length > limit ? `${s.substring(0, limit)}...` : s;
};

// Hide and show scrollbar
export const hideScroll = () => {
  document.querySelector("body")!.style.overflow = "hidden";
};

export const showScroll = () => {
  document.querySelector("body")!.style.overflow = "auto";
};

// Generate random ID
export const generatePushID = (function () {
  var PUSH_CHARS =
    "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz";
  var lastPushTime = 0;
  var lastRandChars: number[] = [];

  return function () {
    var now = new Date().getTime();
    var duplicateTime = now === lastPushTime;
    lastPushTime = now;

    var timeStampChars = new Array(8);
    for (var i = 7; i >= 0; i--) {
      timeStampChars[i] = PUSH_CHARS.charAt(now % 64);
      now = Math.floor(now / 64);
    }
    if (now !== 0)
      throw new Error("We should have converted the entire timestamp.");

    var id = timeStampChars.join("");

    if (!duplicateTime) {
      for (i = 0; i < 12; i++) {
        lastRandChars[i] = Math.floor(Math.random() * 64);
      }
    } else {
      for (i = 11; i >= 0 && lastRandChars[i] === 63; i--) {
        lastRandChars[i] = 0;
      }
      lastRandChars[i]++;
    }
    for (i = 0; i < 12; i++) {
      id += PUSH_CHARS.charAt(lastRandChars[i]);
    }
    if (id.length !== 20) throw new Error("Length should be 20.");

    return id;
  };
})();

// Convert seconds to hours:minutes:seconds
export const convertSecondsToTime = (unix_timestamp: number) => {
  const date = new Date(unix_timestamp * 1000);
  const hours = date.getHours();
  const minutes =
    date.getMinutes().toString().length === 2
      ? date.getMinutes().toString()
      : "0" + date.getMinutes();
  const seconds =
    date.getSeconds().toString().length === 2
      ? date.getSeconds().toString()
      : "0" + date.getSeconds();

  const formattedTime =
    hours + ":" + minutes.substring(-2) + ":" + seconds.substring(-2);

  return formattedTime;
};

// Convert seconds to hours
export const convertSecondsToHours = (unix_timestamp: number) => {
  const date = new Date(unix_timestamp * 1000);
  return date.getHours();
};

// Convert seconds to date
export const convertSecondsToDate = (unix_timestamp: number) => {
  const date = new Date(unix_timestamp * 1000);
  const month = date.getUTCMonth() + 1;
  const day = date.getUTCDate();
  const year = date.getUTCFullYear();

  const formattedDate = `${month} / ${day} / ${year}`;

  return formattedDate;
};
