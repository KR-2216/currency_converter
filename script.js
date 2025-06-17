const base_URL =  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

selects = document.querySelectorAll("select");
btn = document.querySelector("button");
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of selects) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (select.name === "from" && currCode === "INR") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currCode === "OMR") {
            newOption.selected = "selected";
        }
    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector("input");
    let amountVal= amount.value;
    if (amountVal === "" || amountVal<0) {
        amountVal = 1;
        amount.value = 1;
    }
    const fromCurr = fromSelect.value;
    const toCurr = toSelect.value;
    const URL=`${base_URL}/${fromCurr.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data)
    let rate = data[fromCurr.toLowerCase()][toCurr.toLowerCase()];
    // console.log(rate)
    let finalAmount = amountVal * rate;
    msg.innerText = `${amountVal} ${fromCurr} = ${finalAmount} ${toCurr}`
})  

/*MISTAKES MADE:
and tried to access select by dropdown.select from
dropdown = document.querySelectorAll("currency-dropdown") instead of selects = document.querySelectorAll("select") directly

tried accessing 
btn = document.querySelectorAll("button") instead of btn = document.querySelector("button")
querySelectorAll returns a collection of elements, not a single element, and we cannot add eventListener to collection of elements.

added 
const fromCurr = toSelect.value;
const toCurr = fromSelect.value;
right after
const fromSelect = document.querySelector(".from select");
const toSelect = document.querySelector(".to select");
at this time storing .value property is pointless as it'll be empty since the loop of selects for adding options from codes.js is not implemented yet
it should instead be stored when the button is clicked; inside btn.EventListener
*/
