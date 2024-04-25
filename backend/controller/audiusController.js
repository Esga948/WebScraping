const { sdk } = require("@audius/sdk");

const audiusSdk = sdk({
  apiKey: "23d416f15519ba06cee1d715d4ea81250c2c9837",
  apiSecret: "ad2d51a3d20e3bb964a904ef557180017280458ae67907c68e19ee30dad38c3b",
});
var audiusController = {};

audiusController.trackAu = async function (req, res) {
  const { data: track } = await audiusSdk.tracks.searchTracks({
    query: 'Dimension - Brownies and Lemonade Live in LA (Live Set)',
  });
    console.log("Track: ", track);
    console.log('..............................................................');
  return res.json(track);
};

audiusController.userAu = async function (req, res) {
  const { data: user } = await audiusSdk.users.searchUsers({
    query: 'Brownies & Lemonade',
  })
    console.log("User: " ,user);
  return res.json(user);
};
module.exports = audiusController;
