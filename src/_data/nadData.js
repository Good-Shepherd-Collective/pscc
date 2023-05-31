const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async () => {
  const url = "https://us-east-1.aws.data.mongodb-api.com/app/may-1-2023-new-data-qyjru/endpoint/results";
  const response = await EleventyFetch(url, {
    duration: "1d",
    type: "json"
  });

  // Log the fetched data to the console
  console.log('Fetched data from MongoDB:', response);

  // Format the fetched data
  const formattedData = response.map((item) => {
    const date = Object.keys(item)[1]; // Get the date key
    return { ...item[date], date }; // Flatten the object and add the date as a separate property
  }).sort((a, b) => new Date(b.date) - new Date(a.date)); 

  return formattedData;
};
