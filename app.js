
const bttn=document.getElementById("btn");
fromCurrency=document.querySelector(".from select");
toCurrency=document.querySelector(".to select");

const dropdown=document.querySelectorAll(".dropdown select");

//List of all the currency code
for(let select of dropdown){
    for(currcode in countryList){
        let newoption=document.createElement("option");
        newoption.value=currcode;
        newoption.innerText=currcode;
        if(select.name==="from" && currcode==="USD"){
            newoption.selected="selected";
        }
        else if(select.name==="to" && currcode==="PKR"){
            newoption.selected="selected";
        }

        
        select.append(newoption);
    }
    select.addEventListener("change",(evt)=>{
        updateflag(evt.target);
    })
}

//update the flag
const updateflag=(element)=>{
  let currcode=element.value;
  let countrycode=countryList[currcode];
  let newsource=`https://flagsapi.com/${countrycode}/flat/64.png`;
  let img=element.parentElement.querySelector("img");
  img.src=newsource;

}
bttn.addEventListener("click",e=>{
    e.preventDefault();
    updatePrice();
})
//update the price in statement
 async function updatePrice(){
    let amountt=document.querySelector(".amount input");
    let amountVal=amountt.value;
    if(amountVal == "" || amountVal == "0"){
        amountt.value="1";
        amountVal=1;
        
    }
    const url=`https://v6.exchangerate-api.com/v6/9da2f81a2664fa7615565428/latest/${fromCurrency.value}`;
  
    try {
        const response = await fetch(url);
        const result = await response.json();
        const exchangerate = result.conversion_rates[toCurrency.value];
        const totalExchangeRate = (amountVal * exchangerate).toFixed(2);
        const exchangetext = document.querySelector(".msg");
        exchangetext.innerText = `${amountVal} ${fromCurrency.value}=${totalExchangeRate} ${toCurrency.value}`;
      } catch (error) {
        console.error(error);
      }
}
 

//change icon 
changeicon=document.getElementById("change");
changeicon.addEventListener("click",()=>{
    let temp=fromCurrency.value;
    fromCurrency.value=toCurrency.value;
    toCurrency.value=temp;
    updateflag(fromCurrency);
    updateflag(toCurrency);
    updatePrice();

})



