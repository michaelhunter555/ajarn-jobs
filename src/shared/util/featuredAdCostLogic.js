//per day biddings
//users can store credits in their count via packages or... one time (digial product) payment.
//however credit accounts are more likely to be better suited for bidding wars
//current ad formats
// homefeatured ad, TEFL course ad, Official Site sponsors, Home footer featured
// classified urgent -home
// premium - userProfile placement ->
// premium school placement -->

//page from bonida -->
//api call to get total current users with accounts (teachers)
//BID =  MAX eCPC * Click Probability * Budget Pacing Part
//Click probability = determined from weekly analytics traffic data per week
/**
 *
 * factors affecting click -
 */

//const schoolIsRegistered = (val) => (val ? 0.1 : 0.05);
//const baseCostPerClick = 5;

export const featuredAdLogic = (advertisers, highestBid) => {
  for (let i = 0; i < advertisers.length; i++) {
    let highestBidder = advertisers[i][0];

    if (highestBidder < highestBid) {
      highestBidder = highestBid;
    }
  }
};

export const userProfileAdLogic = () => {};

export const featuredFooterAdLogic = () => {};
