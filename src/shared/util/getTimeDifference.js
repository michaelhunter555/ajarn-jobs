export const getTimeDifference = (creationDate) => {
  const now = new Date();
  const timeDifference = now.getTime() - new Date(creationDate).getTime();
  const days = 24 * 60 * 60 * 1000;

  if (timeDifference < days) {
    return "today";
  } else if (timeDifference < 2 * days) {
    return "1 day ago";
  } else {
    const daysPassed = Math.floor(timeDifference / days);
    return `${daysPassed} days ago`;
  }
};
