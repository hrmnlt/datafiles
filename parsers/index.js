const Fs = require('fs');
const Axios = require('axios').default;
const Cheerio = require('cheerio');

const countriesParser = require('./countries');
const animalsParser = require('./animals');

async function main() {
    [
        countriesParser,
        animalsParser
    ].forEach(async parser => {
        const { dataType: fileName, extract: cb } = parser;
        
        try {
            const data = await cb();
            const content = JSON.stringify({ data });
            Fs.writeFileSync('./data/' + fileName + '.json', content, 'utf8');
        } catch (err) {
            console.error(err);
        }
    });
}

main();