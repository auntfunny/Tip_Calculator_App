// Query Selectors

const fivePercentButton = document.querySelector("#fivePercentButton");
const tenPercentButton = document.querySelector("#tenPercentButton");
const fifteenPercentButton = document.querySelector("#fifteenPercentButton");
const twentyFivePercentButton = document.querySelector(
  "#twentyFivePercentButton",
);
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
let buttonToggle = 0;
let customToggle = 0;

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

function changeBackground(event) {
  if (activeButton !== null && activeButton !== customTipPercentage) {
    activeButton.classList.toggle("bg-accGreen2");
    activeButton.classList.toggle("bg-accGreen1");
    activeButton.classList.toggle("text-accWhite");
    activeButton.classList.toggle("text-accGreen2");
  } else if (
    activeButton === customTipPercentage &&
    customTipPercentage.value != 0
  ) {
    customTipPercentage.value = "";
    activeButton.classList.toggle("inset-ring-accGreen2");
    activeButton.classList.toggle("inset-ring-2");
    customToggle--;
  }

  if (event.target !== customTipPercentage) {
    event.target.classList.toggle("bg-accGreen2");
    event.target.classList.toggle("bg-accGreen1");
    event.target.classList.toggle("text-accWhite");
    event.target.classList.toggle("text-accGreen2");
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

function clearButtons() {
  if (activeButton !== null && activeButton !== customTipPercentage) {
    activeButton.classList.toggle("bg-accGreen2");
    activeButton.classList.toggle("bg-accGreen1");
    activeButton.classList.toggle("text-accWhite");
    activeButton.classList.toggle("text-accGreen2");
  } else if (
    activeButton === customTipPercentage &&
    customTipPercentage.value != 0
  ) {
    activeButton.classList.toggle("inset-ring-accGreen2");
    activeButton.classList.toggle("inset-ring-2");
    customToggle = 0;
  }

  activeButton = null;
  totalPeople = 0;
  tipPercent = 0;
  billToPay = 0;
  if (errorToggle > 0) {
    errorMessage.classList.toggle("hidden");
    numberOfPeople.classList.toggle("inset-ring-accError");
    numberOfPeople.classList.toggle("inset-ring-2");
    numberOfPeople.classList.toggle("hover:inset-ring-accGray3");
    numberOfPeople.classList.toggle("focus:inset-ring-accGreen1");
    numberOfPeople.classList.toggle("hover:inset-ring-1");
    errorToggle--;
  }

  if (buttonToggle > 0) {
    clearAllButton.classList.toggle("bg-accInactive");
    clearAllButton.classList.toggle("bg-accGreen1");
    buttonToggle--;
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

totalBill.addEventListener("input", assignValueBill);
numberOfPeople.addEventListener("input", assignValuePeople);
customTipPercentage.addEventListener("input", assignValuePercent);
let totalPeople = 0;
let tipPercent = 0;
let billToPay = 0;

allButtons.forEach((button) => {
  button.addEventListener("click", assignValuePercent);
});

/*******************************************************************************************

Assign bill value and calculate totals

Pseudocode:

Begin
    Get total bill
    if it is 0, set totals to 0
    if it isn't zero, and both tip and people have values
        calculate and assign totals to show
    if 0 and everything is zero
        turn off reset button.
End

*******************************************************************************************/

function assignValueBill(event) {
  billToPay = Number(event.target.value);

  if (billToPay == 0) {
    let tipMoney = 0;
    let billMoney = 0;

    totalBillPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(billMoney);

    totalTipPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(tipMoney);
  } else if (totalPeople !== 0 && tipPercent !== 0) {
    let tipToPay = billToPay * (tipPercent / 100);
    let tipMoney = tipToPay / totalPeople;
    let billMoney = (tipToPay + billToPay) / totalPeople;

    totalBillPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(billMoney);

    totalTipPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(tipMoney);
  }
  if (totalPeople === 0 && tipPercent === 0 && billToPay === 0) {
    clearAllButton.classList.toggle("bg-accInactive");
    clearAllButton.classList.toggle("bg-accGreen1");
    buttonToggle--;
  } else if (buttonToggle === 0) {
    clearAllButton.classList.toggle("bg-accInactive");
    clearAllButton.classList.toggle("bg-accGreen1");
    buttonToggle++;
  }
}

/*******************************************************************************************

Assign people value and calculate totals

Pseudocode:

Begin
    Get total people
    if error message is on and value is above 0, turn off
    if it is 0, show error message and set totals to 0
    if it isn't zero, and both tip and bill have values
        calculate and assign totals to show
    if 0 and everything is zero
        turn off reset button.
End

*******************************************************************************************/

function assignValuePeople(event) {
  totalPeople = Number(event.target.value);
  if (errorToggle > 0) {
    errorMessage.classList.toggle("hidden");
    numberOfPeople.classList.toggle("inset-ring-accError");
    numberOfPeople.classList.toggle("inset-ring-2");
    numberOfPeople.classList.toggle("hover:inset-ring-accGray3");
    numberOfPeople.classList.toggle("focus:inset-ring-accGreen1");
    numberOfPeople.classList.toggle("hover:inset-ring-1");
    errorToggle--;
  }

  if (totalPeople == 0) {
    let tipMoney = 0;
    let billMoney = 0;

    totalBillPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(billMoney);

    totalTipPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(tipMoney);

    errorMessage.classList.toggle("hidden");
    numberOfPeople.classList.toggle("inset-ring-accError");
    numberOfPeople.classList.toggle("inset-ring-2");
    numberOfPeople.classList.toggle("hover:inset-ring-accGray3");
    numberOfPeople.classList.toggle("focus:inset-ring-accGreen1");
    numberOfPeople.classList.toggle("hover:inset-ring-1");

    errorToggle++;
  } else if (billToPay !== 0 && tipPercent !== 0 && totalPeople !== 0) {
    let tipToPay = billToPay * (tipPercent / 100);
    let tipMoney = tipToPay / totalPeople;
    let billMoney = (tipToPay + billToPay) / totalPeople;

    totalBillPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(billMoney);

    totalTipPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(tipMoney);
  }

  if (totalPeople === 0 && tipPercent === 0 && billToPay === 0) {
    clearAllButton.classList.toggle("bg-accInactive");
    clearAllButton.classList.toggle("bg-accGreen1");
    buttonToggle--;
  } else if (buttonToggle === 0) {
    clearAllButton.classList.toggle("bg-accInactive");
    clearAllButton.classList.toggle("bg-accGreen1");
    buttonToggle++;
  }
}

/*******************************************************************************************

Assign tip value and calculate totals

Pseudocode:

Begin
    Get total tip
    if it is 0, set totals to 0
    if it isn't zero, and both people and bill have values
        calculate and assign totals to show
    if custom and value isn't 0, turn on border
        if it returns to 0, turn off border
    if 0 and everything is zero
        turn off reset button.
End

*******************************************************************************************/

function assignValuePercent(event) {
  tipPercent = Number(event.target.value);

  if (tipPercent == 0) {
    let tipMoney = 0;
    let billMoney = 0;

    totalBillPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(billMoney);

    totalTipPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(tipMoney);
  } else if (totalPeople !== 0 && billToPay !== 0) {
    let tipToPay = billToPay * (tipPercent / 100);
    let tipMoney = Number(tipToPay / totalPeople);
    let billMoney = Number((tipToPay + billToPay) / totalPeople);

    totalBillPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(billMoney);

    totalTipPerson.value = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(tipMoney);
  }

  if (
    event.target === customTipPercentage &&
    tipPercent != 0 &&
    customToggle === 0
  ) {
    event.target.classList.toggle("inset-ring-accGreen2");
    event.target.classList.toggle("inset-ring-2");
    customToggle = 1;
  }
  let resetButtonColorToggle = 0;
  if (tipPercent != 0) {
    resetButtonColorToggle = 1;
  }

  if (
    totalPeople === 0 &&
    tipPercent === 0 &&
    billToPay === 0 &&
    resetButtonColorToggle != 0
  ) {
    clearAllButton.classList.toggle("bg-accInactive");
    clearAllButton.classList.toggle("bg-accGreen1");
    buttonToggle = 0;
    resetButtonColorToggle = 0;
  } else if (buttonToggle === 0 && resetButtonColorToggle != 0) {
    clearAllButton.classList.toggle("bg-accInactive");
    clearAllButton.classList.toggle("bg-accGreen1");
    buttonToggle = 1;
    resetButtonColorToggle = 0;
  } else if (
    buttonToggle === 1 &&
    tipPercent < 10 &&
    event.target !== fivePercentButton
  ) {
    clearAllButton.classList.toggle("bg-accInactive");
    clearAllButton.classList.toggle("bg-accGreen1");
    buttonToggle = 0;
    resetButtonColorToggle = 0;
  }
}
