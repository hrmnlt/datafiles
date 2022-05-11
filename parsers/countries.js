const Axios = require('axios').default;
const Cheerio = require('cheerio');

const URL = 'https://www.worldometers.info/geography/alphabetical-list-of-countries/';
const SELECTOR = '.table-responsive table.table tbody tr';

const extract = async () => {
    try {
        const response = await Axios.get(URL);
        const $ = Cheerio.load(response.data);

        let rows = $(SELECTOR);
        let countriesData = rows.toArray().map(el => {
            const tds = $(el).find('td');
            return {
                name: $(tds[1]).text(),
                population: Number($(tds[2]).find('a').text().replaceAll(',', '')),
                area: Number($(tds[3]).text().replaceAll(',', ''))
            }
        });

        return countriesData;
    } catch (err) {
        console.error(err);
    }
}; 

module.exports = {
    url: URL,
    extract,
    dataType: 'countries'
};