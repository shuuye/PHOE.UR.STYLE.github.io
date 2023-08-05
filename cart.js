const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const closeCart = document.querySelector("#close-cart");

//for the cart to be able to use in any page



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



// open cart 
cartIcon.onclick = () => {
    cart.classList.add("active");
}

//close cart 
closeCart.onclick = () => {
    cart.classList.remove("active");
}

//check if cart working is
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

// call the needed function
function ready() {

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

    //add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (let i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

    // buy button work
    document.getElementsByClassName("btn-buy")[0].addEventListener("click", buyButtonClicked);

    addProductToCart();
}

function on(x) {
    document.getElementById("background").style.display = "block";
    var overlaypage = document.getElementsByClassName("overlay");

    document.getElementsByClassName("overlay")[x].style.display = "block";

}

function off() {
    document.getElementById("background").style.display = "none";
    var overlaypage = document.getElementsByClassName("overlay");

    for (let i = 0; i <= overlaypage.length; i++) {
        document.getElementsByClassName("overlay")[i].style.display = "none";
    }

}

//buy button
function buyButtonClicked(event) {
    let currentUser = localStorage.getItem("currentUser");
    let currentEmail = localStorage.getItem("currentEmail");
    if (currentUser == null) {
        console.log(currentUser)
        alert("Please login first")
    } else {

        var cartContent = document.getElementsByClassName("cart-content")[0];
        if (cartContent.hasChildNodes()) {
            if (confirm("Do you want to place order?") == 1) {
                window.open("payment.html", "_self");

                while (cartContent.hasChildNodes()) {
                    cartContent.removeChild(cartContent.firstChild);
                }
            }

            updatetotal();
        } else {
            alert("There is nothing in the cart");
        }
    }
}


//remove item from cart
function removeCartItem(event) {
    var buttonClicked = event.target;
    var shopProducts = buttonClicked.parentElement;

    var title = shopProducts.getElementsByClassName("cart-product-title")[0].innerText;

    if (!valuedata || valuedata.length === 0) {
        console.log("valuedata is empty or null");
        return;
    }

    for (let i = 0; i < productdata.length; i++) {
        if (productdata[i] == title) {
            console.log(productdata[i]);

            productdata.splice(i, 1);
            pricedata.splice(i, 1);
            imgdata.splice(i, 1);
            valuedata.splice(i, 1);
            sizedata.splice(i, 1);

            datatitle = JSON.stringify(productdata);
            dataprice = JSON.stringify(pricedata);
            dataimg = JSON.stringify(imgdata);
            datavalue = JSON.stringify(valuedata);
            datasize = JSON.stringify(sizedata);

            localStorage.setItem("title", datatitle);
            localStorage.setItem("price", dataprice);
            localStorage.setItem("productImg", dataimg);
            localStorage.setItem("value", datavalue);
            localStorage.setItem("size", datasize);

            buttonClicked.parentElement.remove();
            updatetotal();

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

    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
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


//add to cart button 
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;



    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemNames = cartItems.getElementsByClassName("cart-product-title");

    for (var i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText == title) {
            alert("You have already add this item to cart");
            return;
        }

    }

    productdata.push(title);
    pricedata.push(price);
    imgdata.push(productImg);
    valuedata.push(1);
    sizedata.push(0);


    datatitle = JSON.stringify(productdata);
    dataprice = JSON.stringify(pricedata);
    dataimg = JSON.stringify(imgdata);
    datavalue = JSON.stringify(valuedata);
    datasize = JSON.stringify(sizedata);


    localStorage.setItem("title", datatitle);
    localStorage.setItem("price", dataprice);
    localStorage.setItem("productImg", dataimg);
    localStorage.setItem("value", datavalue);
    localStorage.setItem("size", datasize);

    alert("Success! The " + title + " has been added to your cart. Continue shopping or proceed to checkout to complete your purchase.")
    updatetotal();
    addProductToCart();
    return;

}

// add the details to cart 
function addProductToCart() {
    let titleData = JSON.parse(localStorage.getItem("title"));
    let priceData = JSON.parse(localStorage.getItem("price"));
    let ImgData = JSON.parse(localStorage.getItem("productImg"));


    if (titleData == null || titleData.length === undefined) {
        titleData = [];
    }

    var cartContent = document.getElementsByClassName("cart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }



    for (var i = 0; i < titleData.length; i++) {

        let cartShopBox = document.createElement("div");
        cartShopBox.classList.add("cart-box")
        let cartItems = document.getElementsByClassName("cart-content")[0];



        title = titleData[i];
        price = priceData[i];
        productImg = ImgData[i];
        value = valuedata[i];

        var cartBoxContent = `
                    
                    <img src="${productImg}" alt="" class="cart-img">
                    <div class="detail-box">
                        <div class="cart-product-title">${title}</div>
                        <div class="cart-price">${price}</div>
                        <div class= "displayqty"></div>
                        <input type="number" value="${value}" class="cart-quantity">
                        

                    </div>

                    <!--remove cart-->
                    <img src="iconfolder/remove-cart.svg" alt="remove-cart" class="cart-remove">`;


        cartShopBox.innerHTML = cartBoxContent;
        cartItems.append(cartShopBox);
        cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
        cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
    }
    updatetotal();
}

//update total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
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

