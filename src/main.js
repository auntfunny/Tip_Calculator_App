// Query Selectors

const fivePercentButton = document.querySelector("#fivePercentButton");
const tenPercentButton = document.querySelector("#tenPercentButton");
const fifteenPercentButton = document.querySelector("#fifteenPercentButton");
const twentyFivePercentButton = document.querySelector("#twentyFivePercentButton");
const fiftyPercentButton = document.querySelector("#fiftyPercentButton");
const customTipPercentage = document.querySelector("#customTipPercentage");
const clearAllButton = document.querySelector("#clearAllButton");
const totalBill = document.querySelector("#totalBill");
const numberOfPeople = document.querySelector("#numberOfPeople");
const totalTipPerson = document.querySelector("#totalTipPerson");
const totalBillPerson = document.querySelector("#totalBillPerson");
const errorMessage = document.querySelector("#errorMessage");
const allButtons = document.querySelectorAll(".tipButton");

/******************************************************************************


Button Selection and change of colors


*******************************************************************************/


let activeButton = null;
let errorToggle = 0;




fivePercentButton.addEventListener("click", changeBackground);
tenPercentButton.addEventListener("click", changeBackground);
fifteenPercentButton.addEventListener("click", changeBackground);
twentyFivePercentButton.addEventListener("click", changeBackground);
fiftyPercentButton.addEventListener("click", changeBackground);
customTipPercentage.addEventListener("click", changeBackground);
clearAllButton.addEventListener("click", clearButtons);

/************************************************************************************************
    Function: Change Background
    Purpose: Toggles background and text color of buttons, keeping track of button and only
        letting one button be active at a time.

    Psuedocode
    
    Begin
        Save the currrent button
        If there was a previously active button, toggle styles to original
        Toggle styles of current button to active states
        Update active button to current button
    End
*************************************************************************************************/

function changeBackground(event){


    if(activeButton !== null && activeButton !== customTipPercentage){
        activeButton.classList.toggle("bg-accGreen2");
        activeButton.classList.toggle("bg-accGreen1");
        activeButton.classList.toggle("text-accWhite");
        activeButton.classList.toggle("text-accGreen2");
    } else if(activeButton === customTipPercentage) {
        customTipPercentage.value = "";
        activeButton.classList.toggle("inset-ring-accGreen2");
        activeButton.classList.toggle("inset-ring-2");
    }

    if(event.target !== customTipPercentage){
        event.target.classList.toggle("bg-accGreen2");
        event.target.classList.toggle("bg-accGreen1");
        event.target.classList.toggle("text-accWhite");
        event.target.classList.toggle("text-accGreen2");
    } else if (event.target === customTipPercentage){
        event.target.classList.toggle("inset-ring-accGreen2");
        event.target.classList.toggle("inset-ring-2");
    }
    

    activeButton = event.target;
}

/***************************************************************************************

Function: Clear Buttons
Purpose: Reset button design to original

Begin
    When reset is clicked
    if there is an active button that isn't custom
        reset button style
    if it is custom
        reset border

    reset active button to null
End

******************************************************************************************/

function clearButtons(){

    if(activeButton !== null && activeButton !== customTipPercentage){
        activeButton.classList.toggle("bg-accGreen2");
        activeButton.classList.toggle("bg-accGreen1");
        activeButton.classList.toggle("text-accWhite");
        activeButton.classList.toggle("text-accGreen2");
    } else if(activeButton === customTipPercentage) {
        activeButton.classList.toggle("inset-ring-accGreen2");
        activeButton.classList.toggle("inset-ring-2");
    }

    activeButton = null;
    totalPeople = 0;
    tipPercent = 0;
    billToPay = 0;
    if(errorToggle > 0){
            errorMessage.classList.toggle("hidden");
            numberOfPeople.classList.toggle("inset-ring-accError");
            numberOfPeople.classList.toggle("inset-ring-2");
            numberOfPeople.classList.toggle("hover:inset-ring-accGray3");
            numberOfPeople.classList.toggle("focus:inset-ring-accGreen1");
            numberOfPeople.classList.toggle("hover:inset-ring-1");
            errorToggle--;
        }
    

}


/*******************************************************************************************

Calculation of individual tip and bill

Pseudocode:

Begin
    Get total bill
    Get tip percentage
    Get number of people
        if 0, send error code
    calculate individual tip
    calculate individual total
    display end prices
End

*******************************************************************************************/

totalBill.addEventListener("input",assignValueBill);
numberOfPeople.addEventListener("input",assignValuePeople);
customTipPercentage.addEventListener("input",assignValuePercent);
let totalPeople = 0;
let tipPercent = 0;
let billToPay = 0;


allButtons.forEach(button => {
    button.addEventListener("click", assignValuePercent);
})


function assignValueBill(event){
    billToPay = Number(event.target.value);
    console.log(billToPay.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));

    if(totalPeople !== 0 && tipPercent !== 0){
        let tipToPay = billToPay * (tipPercent / 100);
        totalTipPerson.value = tipToPay / totalPeople;
        totalBillPerson.value = (tipToPay + billToPay) / totalPeople;
        console.log(totalTipPerson.value);
        console.log(totalBillPerson.value);
        console.log(tipToPay);
    }

}

function assignValuePeople(event){
    totalPeople = Number(event.target.value);
    console.log(totalPeople);
    if(errorToggle > 0){
            errorMessage.classList.toggle("hidden");
            numberOfPeople.classList.toggle("inset-ring-accError");
            numberOfPeople.classList.toggle("inset-ring-2");
            numberOfPeople.classList.toggle("hover:inset-ring-accGray3");
            numberOfPeople.classList.toggle("focus:inset-ring-accGreen1");
            numberOfPeople.classList.toggle("hover:inset-ring-1");
            errorToggle--;
        }
    

    if(billToPay !== 0 && tipPercent !== 0 && totalPeople !== 0){
        let tipToPay = billToPay * (tipPercent / 100);
        totalTipPerson.value = tipToPay / totalPeople;
        totalBillPerson.value = (tipToPay + billToPay) / totalPeople;
        console.log(totalTipPerson.value);
        console.log(totalBillPerson.value);
        console.log(tipToPay);
    } else if (totalPeople === 0){
        errorMessage.classList.toggle("hidden");
        numberOfPeople.classList.toggle("inset-ring-accError");
        numberOfPeople.classList.toggle("inset-ring-2");
        numberOfPeople.classList.toggle("hover:inset-ring-accGray3");
        numberOfPeople.classList.toggle("focus:inset-ring-accGreen1");
        numberOfPeople.classList.toggle("hover:inset-ring-1");

        errorToggle++;
    }
}

function assignValuePercent(event){

    tipPercent = Number(event.target.value);
    console.log(tipPercent);

    if(totalPeople !== 0 && billToPay !== 0){
        let tipToPay = billToPay * (tipPercent / 100);
        totalTipPerson.value = Number(tipToPay / totalPeople);
        totalBillPerson.value = Number((tipToPay + billToPay) / totalPeople);

        
        console.log(totalTipPerson.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
        console.log(totalBillPerson.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }));
        console.log(tipToPay);


    }
}

const largeNum = 1234567.89;
// Format as currency (e.g., USD)
console.log(largeNum.toLocaleString('en-US', { style: 'currency', currency: 'USD' })); // Output: "$1,234,567.89"
// Format with locale-specific number separators
console.log(largeNum.toLocaleString('de-DE')); // Output: "1.234.567,89"


