const days = 24 * 60 * 60 * 1000;
const months = 30 * 24 * 60 * 60 * 1000;
const years = 12 * 30 * 60 * 60 * 1000;

const TODAY = "today";
const YESTERDAY = "yesterday";
const ONE_DAY_AGO = "1 day ago";
const ONE_MONTH_AGO = "1 month ago";
const ONE_YEAR_AGO = "1 year ago";

export const getTimeDifference = (creationDate) => {
  const now = new Date();
  const timeDifference = now.getTime() - new Date(creationDate).getTime();

  if (timeDifference < days) {
    return TODAY;
  } else if (timeDifference >= days && timeDifference < 2 * days) {
    return YESTERDAY;
  } else if (timeDifference <= 2 * days) {
    return ONE_DAY_AGO;
  } else if (timeDifference > 2 * days && timeDifference <= months) {
    const daysPassed = Math.floor(timeDifference / days);
    return `${daysPassed} days ago`;
  } else if (timeDifference < months * 2) {
    return ONE_MONTH_AGO;
  } else if (timeDifference >= months * 2 && timeDifference <= years) {
    const monthsPassed = Math.floor(timeDifference / months);
    return `${monthsPassed} months ago`;
  } else if (timeDifference >= years) {
    return ONE_YEAR_AGO;
  } else {
    const yearsPassed = Math.floor(timeDifference / years);
    return `${yearsPassed} years ago`;
  }
};
