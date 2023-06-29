const { DateTime } = require("luxon");
require('dotenv').config();
const { truncateBySentences } = require('./_filters/filters');


module.exports = function(eleventyConfig) {
  
  eleventyConfig.addPassthroughCopy('./src/style.css');
  eleventyConfig.addPassthroughCopy('./src/assets');
  eleventyConfig.addPassthroughCopy('./src/admin');
  eleventyConfig.addPassthroughCopy("favicon.ico");
  eleventyConfig.addPassthroughCopy('./src/js');
  eleventyConfig.addNunjucksFilter('truncateBySentences', truncateBySentences);
  eleventyConfig.addFilter('keys', function (obj) {
    return Object.keys(obj);
  });
  
  eleventyConfig.setBrowserSyncConfig({
    open: 'external',
    notify: true,
  });

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });

  eleventyConfig.addFilter('date', (value, format) => {
    const date = DateTime.fromISO(value);
    return date.isValid ? date.toFormat(format) : '';
  });

  return {
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "public"
    }
  };
};
