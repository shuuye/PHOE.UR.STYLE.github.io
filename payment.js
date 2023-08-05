let javafname = JSON.parse(localStorage.getItem("lfname"));
let javalname = JSON.parse(localStorage.getItem("llname"));
let javaemail = JSON.parse(localStorage.getItem("lemail"));
let javapass = JSON.parse(localStorage.getItem("lpass"));
let javacpass = JSON.parse(localStorage.getItem("lcpass"));
let currentUser = localStorage.getItem("currentUser");
let currentEmail = localStorage.getItem("currentEmail");

if (!javaemail || !javaemail.length) { //if nothings then create array 
    javafname = [];
    javalname = [];
    javaemail = [];
    javapass = [];
    javacpass = [];
}


let productdata = JSON.parse(localStorage.getItem("title"));
let pricedata = JSON.parse(localStorage.getItem("price"));
let imgdata = JSON.parse(localStorage.getItem("productImg"));
let valuedata = JSON.parse(localStorage.getItem("value"));
let sizedata = JSON.parse(localStorage.getItem("size"));

if (!productdata || !productdata.length) {
    productdata = [];
    pricedata = [];
    imgdata = [];
    valuedata = [];
    sizedata = [];
}


//sessionStorage.clear();

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}


function ready() {

    addProductToPage();

    updatetotal();

    /*controlform();*/

    var Today = new Date();
    document.getElementById("date").value = Today.getDate() + "/" + (Today.getMonth() + 1) + "/" + Today.getFullYear();
    document.getElementById("name").value = currentUser;

    //remove items from cart
    var removeCartButton = document.getElementsByClassName("cart-remove");
    console.log(removeCartButton);
    for (let i = 0; i < removeCartButton.length; i++) {
        var button = removeCartButton[i];
        button.addEventListener("click", removeCartItem);
    }

    //quantity changes
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (let i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

    // checkout button work
    document.getElementsByClassName("btn-checkout")[0].addEventListener("click", checkoutButtonClicked);

    var sizeinput = document.getElementsByClassName("size");
    for (let i = 0; i < sizeinput.length; i++) {
        var input = sizeinput[i];
        input.addEventListener("change", sizeChanged);
    }

}

/*function controlform() {
    if (parseFloat(localStorage.getItem("totalData")) == 0) {
        document.getElementById("name").disabled = true;
        document.getElementById("address").disabled = true;
        document.getElementById("phoneBox").disabled = true;
        document.getElementById("phoneBox").disabled = true;
        document.getElementById("msg").disabled = true;
        document.getElementById("btn-checkout").disabled = true;
    }
    else {
        document.getElementById("name").disabled = false;
        document.getElementById("address").disabled = false;
        document.getElementById("phoneBox").disabled = false;
        document.getElementById("phoneBox").disabled = false;
        document.getElementById("msg").disabled = false;
        document.getElementById("btn-checkout").disabled = false;
    }
}*/

function checkoutButtonClicked(event) {

    var cartContent = document.getElementsByClassName("payment-box")[0];



    if (validate() == 1 && cartContent.hasChildNodes() && document.forms[0].checkValidity() && parseFloat(localStorage.getItem("totalData")) != 0) {

        alert("Thank you for your purchase! Hope to see you next time!");
        window.print();
        localStorage.removeItem("title");
        localStorage.removeItem("price");
        localStorage.removeItem("productImg");
        localStorage.removeItem("value");
        localStorage.removeItem("totalData");


        while (cartContent.hasChildNodes()) {
            cartContent.removeChild(cartContent.firstChild);
        }
        updatetotal();

    } else if (validate() != 1) {
        alert("Please fill in the required fields");

    } else if (document.forms[0].checkValidity() == 0) {
        if (deliveryinfo.contact_number.checkValidity() == 0) {
            alert("Please enter a valid mobile phone number using the format 01x-xxxxxxx (10 digits) or 01x-xxxxxxxx. (11 digits)");
            deliveryinfo.contact_number.focus();
        }
        if (deliveryinfo.city.checkValidity() == 0) {
            alert("Please enter a valid city name using alphabets and spaces.");
            deliveryinfo.city.focus();
        }
        if (deliveryinfo.state.checkValidity() == 0) {
            alert("Please enter a valid state name using alphabets and spaces.");
            deliveryinfo.state.focus();
        }
        if (deliveryinfo.postal_code.checkValidity() == 0) {
            alert("Invalid postal code. Please enter a valid postal code consisting of 5 to 10 digits.");
            deliveryinfo.postal_code.focus();
        }

        if (document.getElementsByClassName("paymentmethod")[0].value == "creditcard") {
            if (deliveryinfo.card_number.checkValidity() == 0) {
                alert("Invalid card number. Please ensure you enter a 16-digit number without spaces.");
                deliveryinfo.card_number.focus();
            }
            if (deliveryinfo.expiry_date.checkValidity() == 0) {
                alert("Please enter a valid expiry date in the format MM/YY or MM/YYYY.");
                deliveryinfo.expiry_date.focus();
            }
            if (deliveryinfo.cvv.checkValidity() == 0) {
                alert("Please enter a valid CVV consisting of three or four digits.");
                deliveryinfo.cvv.focus();
            }
            return false;
        }

        return false;


    } else {
        alert("There is nothing in the cart. Please add your product into the cart first.");
        return false;

    }

}

function proceed() {

    var cartContent = document.getElementsByClassName("payment-box")[0];
    var sizetrue = true;
    if (cartContent.hasChildNodes()) {

        var sizenum = document.getElementsByClassName("size");
        for (let i = 0; i < sizenum.length; i++) {
            if (sizenum[i].value == 0) {
                alert("Please fill up all the size");
                sizetrue = false;
                break;
            }
        }

        if (sizetrue == true) {
            if (confirm("Procced to payment") == true) {
                window.open("paymentdetails.html", "_self");
            }
        }
    }
    else {
        alert("There is nothing in the cart");
        
    }

}


function back() {

    if (confirm("Want to go back to home page?") == true) {
        window.open("index.html", "_self");
    }
}

function addProductToPage() {

    let titleData = JSON.parse(localStorage.getItem("title"));
    let pricedata = JSON.parse(localStorage.getItem("price"));
    let imgdata = JSON.parse(localStorage.getItem("productImg"));
    let sizedata = JSON.parse(localStorage.getItem("size"));


    if (titleData == null || titleData.length === undefined) {
        titleData = [];
    }

    var cartContent = document.getElementsByClassName("payment-box")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }

    for (var i = 0; i < titleData.length; i++) {
        let cartShopBox = document.createElement("div");
        cartShopBox.classList.add("payment-cart-box")
        let cartItems = document.getElementsByClassName("payment-box")[0];



        title = titleData[i];
        price = pricedata[i];
        productImg = imgdata[i];
        value = valuedata[i];
        size = sizedata[i];

        var cartBoxContent = `
                    
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <div class="displayqty">Quantity: </div>                        
                        <input type="number" value="${value}" class="cart-quantity">
                        <br>
                        <div class="displayqty hidefrom">Size: </div> 

                        <select name="size: " id="size" class="size hidefrom"  value= "${size}" required>
                        <option value="0">--</option>
                        <optgroup label="Earings Size">
                            <option value="1">--</option>
                        </optgroup>
                        <optgroup label="Bracelet Size">
                            <option value="Extra Small">Extra Small</option>
                            <option value="Small">Small</option>
                            <option value="Medium">Medium</option>
                            <option value="Large">Large</option>
                            <option value="Extra Large">Extra Large</option>
                        </optgroup>
                        <optgroup label="Necklace Size (in)">
                            <option value="16">16</option>
                            <option value="18">18</option>
                            <option value="20">20</option>
                            <option value="24">24</option>
                            <option value="30">30</option>
                            <option value="36">36</option>
                        </optgroup>
                        <optgroup label="Ring Size (US Size)">
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="4.5">4.5</option>
                            <option value="5">5</option>
                            <option value="5.5">5.5</option>
                            <option value="6">6</option>
                            <option value="6.5">6.5</option>
                            <option value="7">7</option>
                            <option value="7.5">7.5</option>
                            <option value="8">8</option>
                            <option value="8.5">8.5</option>
                            <option value="9">9 </option>
                            <option value="9.5">9.5</option>
                            <option value="10">10</option>
                            <option value="10.5">10.5</option>
                            <option value="11">11</option>
                            <option value="11.5">11.5</option>
                            <option value="12">12</option>
                            <option value="12.5">12.5</option>
                            <option value="13"></option>
                        </optgroup>
                    </select>

                    </div>

                    <!--remove cart-->
                    <img src="iconfolder/remove-cart.svg" alt="remove-cart" class="cart-remove">`;


        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
        cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
        cartShopBox.getElementsByClassName("size")[0].addEventListener("change", sizeChanged);

    }

}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var shopProducts = buttonClicked.parentElement;

    var title = shopProducts.getElementsByClassName("cart-product-title")[0].innerText;
    for (let i = 0; i < productdata.length; i++) {
        if (productdata[i] == title) {
            console.log(productdata[i]);

            productdata.splice(i, 1);
            pricedata.splice(i, 1);
            imgdata.splice(i, 1);

            datatitle = JSON.stringify(productdata);
            dataprice = JSON.stringify(pricedata);
            dataimg = JSON.stringify(imgdata);


            localStorage.setItem("title", datatitle);
            localStorage.setItem("price", dataprice);
            localStorage.setItem("productImg", dataimg);

            buttonClicked.parentElement.remove();
            updatetotal();
            /*controlform();*/
            return;
        }
    }

}


//quantity change function
function quantityChanged(event) {

    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;

    }

    var cartContent = document.getElementsByClassName("payment-box")[0];
    var cartBoxes = cartContent.getElementsByClassName("payment-cart-box");
    var cartItems = document.getElementsByClassName("payment-box")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            var cartBox = cartBoxes[i];
            var datavalue = cartBox.getElementsByClassName("cart-quantity")[0];

            var quantity = datavalue.value;
            console.log(quantity);
            valuedata[i] = quantity;

            storevalue = JSON.stringify(valuedata);
            localStorage.setItem("value", storevalue)


        }

    }
    updatetotal();
}

function updatetotal() {
    var cartContent = document.getElementsByClassName("payment-box")[0];
    var cartBoxes = cartContent.getElementsByClassName("payment-cart-box");
    var total = 0;
    for (let i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("RM ", ""));

        //replace = make sure take only numbers
        //parses a value as a string and returns the first number.
        var quantity = quantityElement.value;
        total = total + price * quantity;

    }
    // if pricecontain some cents value
    total = Math.round(total * 100) / 100;

    total = total.toFixed(2);

    document.getElementsByClassName("total-price")[0].innerText = "RM " + total;

    localStorage.setItem("totalData", total);

}

function sizeChanged(event) {

    var input = event.target;

    var cartContent = document.getElementsByClassName("payment-box")[0];
    var cartBoxes = cartContent.getElementsByClassName("payment-cart-box");
    var cartItems = document.getElementsByClassName("payment-box")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            var cartBox = cartBoxes[i];
            var sizevalue = cartBox.getElementsByClassName("size")[0];

            var size = sizevalue.value;
            sizedata[i] = size;

            storesize = JSON.stringify(sizedata);
            localStorage.setItem("size", storesize)

        }

    }
    updatetotal();
    /*controlform();*/
}

function changepayment() {
    console.log(document.getElementsByClassName("paymentmethod")[0].value);

    if (document.getElementsByClassName("paymentmethod")[0].value == "creditcard") {
        document.getElementsByClassName("creditcard")[0].classList.remove("hide");
        document.getElementsByClassName("onlinebanking")[0].classList.add("hide");

    } else if (document.getElementsByClassName("paymentmethod")[0].value == "online") {
        document.getElementsByClassName("onlinebanking")[0].classList.remove("hide");
        document.getElementsByClassName("creditcard")[0].classList.add("hide");

    } else {
        document.getElementsByClassName("creditcard")[0].classList.add("hide");
        document.getElementsByClassName("onlinebanking")[0].classList.add("hide");
    }


}

function formatCardNumber() {
    const cardNumberInput = document.getElementById('card_number');
    let cardNumber = cardNumberInput.value.replace(/\s|-/g, ''); // Remove existing spaces or dashes
    let formattedNumber = '';

    for (let i = 0; i < cardNumber.length; i++) {
        if (i % 4 === 0 && i !== 0) {
            formattedNumber += ' '; // Add a space every 4 digits
        }
        formattedNumber += cardNumber[i];
    }

    cardNumberInput.value = formattedNumber.trim();
}

function formatAndValidateContactNumber() {
    const contactNumberInput = document.getElementById('contact_number');
    let contactNumber = contactNumberInput.value.replace(/-/g, ''); // Remove existing hyphens
    let formattedNumber = '';

    if (contactNumber.length <= 3) {
        formattedNumber = contactNumber; // No need for hyphen in the first three digits
    } else if (contactNumber.length <= 10) {
        formattedNumber = contactNumber.substring(0, 3) + '-' + contactNumber.substring(3); // Add hyphen after the first three digits
    }

    contactNumberInput.value = formattedNumber;

}




function validate() {
    var name = deliveryinfo.name.value;
    var contact = deliveryinfo.contact_number.value;
    var address = deliveryinfo.address_line.value;
    var city = deliveryinfo.city.value;
    var state = deliveryinfo.state.value;
    var postal = deliveryinfo.postal_code.value;
    var card = deliveryinfo.card_number.value;
    var expiry = deliveryinfo.expiry_date.value;
    var cvvv = deliveryinfo.cvv.value;
    if (name == "" || contact == "" || address == "" || city == "" || state == "" || postal == "" || document.getElementsByClassName("paymentmethod")[0].value == "default") {
        if (deliveryinfo.name.value == "") { RName.innerHTML = "*"; }
        if (deliveryinfo.contact_number.value == "") { RContact.innerHTML = "*"; }
        if (deliveryinfo.address_line.value == "") { RAddress.innerHTML = "*"; }
        if (deliveryinfo.city.value == "") { RCity.innerHTML = "*"; }
        if (deliveryinfo.state.value == "") { RState.innerHTML = "*"; }
        if (deliveryinfo.postal_code.value == "") { RPostal.innerHTML = "*"; }
        if (document.getElementsByClassName("paymentmethod")[0].value == "default") { RMethod.innerHTML = "*"; }
        if (deliveryinfo.card_number.value == "") { RCard.innerHTML = "*"; }
        if (deliveryinfo.expiry_date.value == "") { RExpiry.innerHTML = "*"; }
        if (deliveryinfo.cvv.value == "") { RCvv.innerHTML = "*"; }
        if (document.getElementById("bank").value == "") {RBank.innerHTML = "*";}
        return false;
    }

    if (document.getElementsByClassName("paymentmethod")[0].value == "creditcard") {
        if (deliveryinfo.card_number.value == "") { RCard.innerHTML = "*"; return false;}
        if (deliveryinfo.expiry_date.value == "") { RExpiry.innerHTML = "*"; return false;}
        if (deliveryinfo.cvv.value == "") { RCvv.innerHTML = "*"; return false;}
        

    } else if (document.getElementsByClassName("paymentmethod")[0].value == "online") {
        if (document.getElementById("bank").value == "") {
            RBank.innerHTML = "*";
            return false;
        }
    }
    return true;
}
