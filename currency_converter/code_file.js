const axios=require('axios');
const getExchangeRate=(fromCurrency,toCurrency)=>
{
    const data=axios.get('http://data.fixer.io/api/latest?access_key=6e7a630d7757bf963c86c1e72300118f&format=1');
    data.then(
        (response)=>
        {
            const rate=response.data.rates;//an array
            //now get the rate factor by reciprocaling the from currency
            const euro=1/rate[fromCurrency];//we used euro as we know that base currencyy is EURO
            const exchangeRate=euro*rate[toCurrency];
            
            //console.log(exchangeRate);
            return exchangeRate;
        }
    );
}
//making a same asynchronous function-just add keyword async before the definition of the method
const getExchangeRateAsync=async (fromCurrency,toCurrency)=>
{
    const data=await axios.get('http://data.fixer.io/api/latest?access_key=6e7a630d7757bf963c86c1e72300118f&format=1');
   
            const rate=data.data.rates;//an array
            //now get the rate factor by reciprocaling the from currency
            const euro=1/rate[fromCurrency];//we used euro as we know that base currencyy is EURO
            const exchangeRate=euro*rate[toCurrency];
            if(isNaN(exchangeRate))
            {
                throw new Error(`Unable to get currency ${fromCurrency} and ${toCurrency}`);
            }
            
            //console.log(exchangeRate);
            return exchangeRate;
      
}
const getCountries=async (toCurrency)=>
{
    //NOTE:FREE ACCOUNT DOESN'T USE HTTPS PROTOCOL-ONLY SIMPLE NON SECURE HTTP PROTOCOL CAN BE USED
    //const fullresponse=await axios.get('http://api.countrylayer.com/v2/all?access_key=d88648b41b5b150dcc832bd2e42bc706&format=1');
   try{
    const response_currency=await axios.get(`http://api.countrylayer.com/v2/currency/${toCurrency}?access_key=d88648b41b5b150dcc832bd2e42bc706`);
    //ABOVE IS A TEMPLATE LITERAL IN JAVASCRIPT-SEE DOCUMENTATION OF USING ${} AND ALSO ENCODING THIS INSIDE BACKTICKS AND NOT SIMPLE QUOTES
    //console.log(response_currency.data);
    const mapped_data=response_currency.data.map
    (
        country=>country.name
        //console.log(country.name)
    );
    return mapped_data;
   }
   catch(error){
    throw new Error(`Unable to get countries that use ${toCurrency}`);
   }
}
const convertCurrency=async (fromCurrency,toCurrency,amount)=>
{
    const exchangeRate= await getExchangeRateAsync(fromCurrency,toCurrency);//await has no effect on these type of expressions where we call other functions which are asynchronous
    console.log(exchangeRate);
    const countries=await getCountries(toCurrency);
    console.log(countries);
    const convertedAmount=amount*exchangeRate;
    console.log(convertedAmount);
    return `${amount} of ${fromCurrency} is worth ${convertedAmount} of ${toCurrency}. So you can spend these in the following countries-\n${countries}`;
}
//getExchangeRate('USD','EUR');
//getExchangeRateAsync('USD','EUR');
//getCountries('USD');
convertCurrency('EUR','USD',1000).then(message=>
    {
        console.log(message);
    }
).catch(error=>
    {
        console.log(error.message);
    }
);
