if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

// call the needed function
function ready() {

  var searchButton = document.getElementsByClassName("find-location")[0];
  searchButton.addEventListener("click", changeaddress);


}

function changeaddress() {
  var locationchoose = document.getElementsByClassName("address");

  var location = document.getElementsByClassName("location-choose")[0].value;

  for (let i = 0; i < locationchoose.length; i++) {
      if (location  == i) {
          locationchoose[i].classList.remove("hide-address");
      }
      else {
          locationchoose[i].classList.add("hide-address");
      }
  }

}
