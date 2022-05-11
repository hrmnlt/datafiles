const Axios = require('axios').default;
const Cheerio = require('cheerio');

const URL = 'https://a-z-animals.com/animals/';
const SELECTOR = '#single-content .container ul li';

const extract = async () => {
    try {
        const response = await Axios.get(URL);
        const $ = Cheerio.load(response.data);

        let nameLis = $(SELECTOR);
        let names = nameLis.toArray().map(el => {
            return {
                name: $(el).text()
            };
        });

        return names;
    } catch (err) {
        console.error(err);
    }
}; 

module.exports = {
    url: URL,
    extract,
    dataType: 'animals'
};