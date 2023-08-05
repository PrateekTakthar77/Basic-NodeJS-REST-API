const axios = require('axios');

const options = {
    method: 'GET',
    params: { city: 'noida' },
    headers: {
        'X-RapidAPI-Key': '14f4695591msh5fc6356915bc9b4p1dacd1jsnfe029779f3ca',
        'X-RapidAPI-Host': 'gold-rates-india.p.rapidapi.com'
    }
};


axios.request(options).then((res) => {
    console.log("**************", res.data);
})
    .catch(error => { console.error("Errrrrrrrrrrrrrrrrrrrrrrr", error); })

