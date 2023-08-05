const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});


const form = document.querySelector('form');

// add a submit event listener to the form
form.addEventListener('submit', (event) => {
  event.preventDefault(); // prevent the form from submitting
  const requiredInput = document.getElementById("name").value; // get the value of the required input field
  if (requiredInput === "") {
    alert("Input field has no value!");
  } else {
    // clear any error messages that may have been displayed before
    const errorMessage = document.getElementById("name-error");
    if (errorMessage) {
      errorMessage.textContent = "";
    }
    // submit the form
    location.href = 'repair2.html';
  }
});

 