// Getting DOM elements by their IDs
const content = document.getElementById("content"),
  addBtn = document.getElementById("add"),
  calculate = document.getElementById("calculate"),
  form = document.getElementById("form"),
  results = document.getElementById("results");

// Initializing variables and arrays
let btnRemove = document.getElementsByClassName("btnRemove"),
  count = 0,
  calculosNum = [],
  calculosDem = [],
  numerator = 0,
  denominator = 0,
  // Array of input colors
  inputsColors = [
    "#3cc5f3",
    "#51bd7f",
    "#905bab",
    "#d16b5d",
    "#7e1236",
    "#3d9e97",
    "#e6b85a",
    "#920f3b",
    "#1c732c",
    "#2c433c",
    "#4b764a",
    "#6c244b",
  ];

// Adding event listeners
addBtn.addEventListener("click", addItem);
calculate.addEventListener("click", calculator);

// Function to disable buttons and clean UI based on content
function disableBtnSubmitANdClean() {
  if (content.innerHTML == "") {
    calculate.disabled = true;
    results.innerHTML = "";
  } else {
    calculate.disabled = false;
  }
}
disableBtnSubmitANdClean(); // Initial state

// Function to add an item dynamically to the UI
function addItem() {
  if (count <= 0) {
    count = 0;
  }

  count++;
  // Creating HTML element for the item
  let element = `<div class="group">
    <h4>Materia</h4>
    <select class="controlSmall credit" name="credit${count}">
          <option >Cr</option>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>

      <select class="controlSmall literal" name="literal${count}">
        <option >Lit</option>
        <option value="4">A</option>
        <option value="3.5">B+</option>
        <option value="3">B</option>
        <option value="2.5">C+</option>
        <option value="2">C</option>
        <option value="0">F</option>
      </select>
      <button class="btnRemove" onclick="removeItem(this)" type="button"><i class="fas fa-minus-square"></i></button>
    </div>`,
    // Accessing the 'group' elements
    let group = document.getElementsByClassName("group");

    // Setting input borders with random colors
    if (group.length >= 0 ) {
          // Adding a delay to show random colors
    setTimeout(() => {
        for (let key in group) {
          let randomColor = inputsColors[Math.floor(Math.random()*(inputsColors.length))]  
          group[key].children[1].style.borderColor = randomColor
          group[key].children[2].style.borderColor = randomColor
  
        }
    }, 50);
  }
  
  // Alert if the item limit is reached, otherwise, add the item to the UI
  if (group.length > 11) {
    alert("You have raised the limit");
  } else {
    content.insertAdjacentHTML("beforeend", element);
  }
  disableBtnSubmitANdClean(); // Update button state
}

// Function to remove an item from the UI
function removeItem(elem) {
  content.removeChild(elem.parentElement);
  disableBtnSubmitANdClean();
}

// Function to perform calculations based on user input
function calculator() {
  calculosNum.splice(0, calculosNum.length);
  calculosDem.splice(0, calculosDem.length);
  numerator = 0;
  denominator = 0;

  // Getting input elements
  let credit = document.getElementsByClassName("credit"),
    literal = document.getElementsByClassName("literal");
  
  // Calculating numerator and denominator based on input values
  for (let index = 0; index < credit.length; index++) {
    let numProd = credit[index].value * literal[index].value;
    calculosNum.push(numProd);
    calculosDem.push(+credit[index].value);
  }
  
  // Calculating the sum of numerator and denominator
  calculosNum.forEach((num) => {
    numerator = numerator + num;
  });

  calculosDem.forEach((num) => {
    denominator = denominator + num;
  });
  
  let val = 0;
  if (
    !denominator <= 0 ||
    denominator == "undefined" ||
    !denominator == undefined ||
    !denominator == NaN ||
    !numerator == undefined ||
    !numerator == NaN
  ) {

    // Calculating and displaying results based on the calculated value
    let val = parseFloat(numerator / denominator).toFixed(2);
    if (val >= 3 && val <= 4) {
      results.innerHTML = "<p class='result success'>" + val + "</p> ";
    }
    if (val >= 2 && val <= 2.9) {
      results.innerHTML = "<p class='result warming'>" + val + "</p> ";
    }
    if (val <= 1.9) {
      results.innerHTML = "<p class='result danger'>" + val + "</p> ";
    }
  } else {
    alert("error");
    results.innerHTML = "";
  }
}

// Preventing form submission
form.onsubmit = (event) => {
  event.preventDefault();
};
