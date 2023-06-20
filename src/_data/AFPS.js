const Parser = require('rss-parser');
let parser = new Parser({
    customFields: {
        item: [
            ['dc:date', 'date'],
            ['dc:creator', 'creator'],
            ['dc:subject', 'subject'],
            ['content:encoded', 'contentEncoded']
        ],
    },
});

module.exports = async function() {
    let feed = await parser.parseURL('https://www.france-palestine.org/?page=backend');
    return feed.items;
};
