const EleventyFetch = require("@11ty/eleventy-fetch");

async function getGoodShepherdCollective() {
  const url = "https://goodshepherdcollective.org/wp-json/wp/v2/posts?_embed/?&per_page=6";
  const response = await EleventyFetch(url, {
    duration: "1d", 
    type: "json"
  });
  const articles = response;
  return articles;
}

module.exports = getGoodShepherdCollective;