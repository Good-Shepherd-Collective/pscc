const truncateBySentences = (content, numSentences = 1) => {
  const plainTextContent = content.replace(/<\/?[^>]+(>|$)/g, '');
  const sentences = plainTextContent.match(/[^\.!\?]+[\.!\?]+/g) || [];
  return sentences.slice(0, numSentences).join(' ').trim();
};

module.exports = {
  truncateBySentences,
};
