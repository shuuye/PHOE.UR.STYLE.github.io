window.onload=init;

function init(){
    document.getElementById('name').value=sessionStorage.CurrentUser;
   
    //document.getElementById('date').value=Today;

    document.forms[0].onsubmit=function(){
        if(this.checkValidity()){
                if(confirm("Are sure that you would like to submit the reservation form?")==1){   //1==1 True
                    alert(document.getElementById('name').value+",your reservation has been successfully submitted.");
                  
                    return true;
                    //document.book.submit
                }else{
                    return false;
                }

            }


            }

        }







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
    if (requiredInput !== "") {
        sessionStorage.setItem("CurrentUser", requiredInput);
        location.href = 'success.html';

  }
}})
document.getElementById("picked").innerHTML=localStorage.getItem("date-picked");

 

    
