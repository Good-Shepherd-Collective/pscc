const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async () => {
  const url = "https://api.acleddata.com/acled/read/?key=NKGMxfd9aYKKxOBAX4qa&email=cody@goodshepherdcollective.org&iso=275";
  const response = await EleventyFetch(url, {
    duration: "1d",
    type: "json"
  });

  return response.data;
};
