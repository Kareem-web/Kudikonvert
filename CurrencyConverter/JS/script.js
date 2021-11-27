const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from select");
const toCurrency = document.querySelector(".to select");
const getButton = document.querySelector("form button");

for(let i = 0; i < dropList.length; i++){
    for(currency_code in country_code){
        //selecting USD by default as FROM currency and NPR as TO currency
let selected;
if(i==0){
    selected = currency_code == "USD" ? "selected" : "";
}else if(i==1){
    selected = currency_code == "NGN" ? "selected" : "";
}
       //creating option tag with passing currency code as a text and value
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        //inserting options tag inside selecting tag
        dropList[i].insertAdjacentHTML("beforeend", optionTag); 
    }

    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); //calling loadFlag with passing target element as an argument
    });
}

function loadFlag(element){
    for(code in country_code){
        if(code == element.value){ // if currency code of country list is equal to option value
            let imgTag = element.parentElement.querySelector("img"); // selecting img tag with paricular droplist
            imgTag.src = 'https://ipdata.co/flags/us.png';
        }
    }
}



window.addEventListener("load", () =>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); //preventing form submission
    getExchangeRate();
})

function getExchangeRate(){
    const amount = document.querySelector(".amount input"),
         exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
        exchangeRateTxt.innerText = "Getting exchange rate...";
    let myKey = '71c8633ea76d44c8a2d2fc90e92e8df6';
    let url = `https://openexchangerates.org/api/latest.json?app_id=${myKey}&base=${fromCurrency.value}`;
    fetch(url).then(Response =>Response.json()).then(result=>{
         let exchangeRate = result.rates[toCurrency.value];
         let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
         exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`; 
    })
    // let exchangeRate = data.conversion_rates;
}    


