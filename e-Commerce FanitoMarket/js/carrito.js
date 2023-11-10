let productInCart = localStorage.getItem("Products-in-cart");
productInCart = JSON.parse(productInCart);

const cartEmptyContainer = document.querySelector("#cart-empty");
const cartProductsContainer = document.querySelector("#cart-products-container")
const cartActionsContainer = document.querySelector("#cart-actions");
const cartGreetingsContainer = document.querySelector("#cart-greetings");
let deleteButton = document.querySelectorAll(".cart-product-delete");
const clearCart = document.querySelector("#clearCart");
const totalPrice = document.querySelector("#total");
const cartBuy = document.querySelector("#cartBuy");

function loadProductsCart(){

    if(productInCart && productInCart.length > 0){

    cartEmptyContainer.classList.add("disabled");
    cartProductsContainer.classList.remove("disabled");
    cartActionsContainer.classList.remove("disabled");
    cartGreetingsContainer.classList.add("disabled");
    
    cartProductsContainer.innerHTML="";
    
    productInCart.forEach(x => {
        const div = document.createElement("div");
        div.classList.add("cart-product");
        div.innerHTML=`
        <img class="img-cart" src="../${x.imagen}" alt="${x.titulo}">
        <div class="cart-product-title">
        <small>Titulo</small>
        <h3>${x.titulo}</h3>
        </div>
        <div class="cart-product-q">
        <small>Cantidad</small>
                <p>${x.cantidad}</p>
            </div>
            <div class="cart-product-price">
            <small>Precio</small>
            <p>${x.precio}</p>
            </div>
            <div class="cart-product-subtotal">
            <small>Subtotal</small>
            <p>${x.precio * x.cantidad}</p>
            </div>
            <button class="cart-product-delete" id="${x.id}"><i class="bi bi-trash-fill"></i></button>
            </div>
            `;
            cartProductsContainer.append(div);
        });
    }else{
        cartEmptyContainer.classList.remove("disabled");
        cartProductsContainer.classList.add("disabled");
        cartActionsContainer.classList.add("disabled");
        cartGreetingsContainer.classList.add("disabled");
    }
    updateDeleteButton();
    updateTotal();
}

loadProductsCart();

function updateDeleteButton(){
    deleteButton = document.querySelectorAll(".cart-product-delete");
    deleteButton.forEach(btn =>{
      btn.addEventListener("click", deleteProductCart);
    });
  }

function deleteProductCart(e){
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true,
        offset: {
          x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
          y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
        }, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right ,#1b2223 , #3a4f50)",
          borderRadius: ".5rem",
          textTransform: "uppercase",
          fontSize: '.75rem',
          boxShadow: 'none'
        },// Callback after click
      }).showToast();
    const idButton = e.currentTarget.id;
    const index = productInCart.findIndex(x=>x.id === idButton);
    productInCart.splice(index,1);
    loadProductsCart();
    localStorage.setItem("Products-in-cart",JSON.stringify(productInCart));
}

clearCart.addEventListener("click",cleanCart);
function cleanCart(){
    Swal.fire({
        title: "<strong>Estas seguro de eliminar todo el carrito?</strong>",
        icon: "question",
        html: `
          No podras reestablecerlo una vez eliminados
          Productos a eliminar: ${productInCart.reduce((acc,producto)=> acc + producto.cantidad, 0)}
        `,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: `Si, estoy seguro`,
        confirmButtonAriaLabel: "Thumbs up, great!",
        cancelButtonText: `No, no estoy seguro`,
        cancelButtonAriaLabel: "Thumbs down",
        background: '#3a4f50',
        color: '#0EF6CC',
        confirmButtonColor: '#0ba387',
        cancelButtonColor: 'red'
      }).then((result)=>{
        if(result.isConfirmed){
            Toastify({
                text: "Productos eliminados",
                duration: 3000,
                close: true,
                gravity: "top", // `top` or `bottom`
                position: "right", // `left`, `center` or `right`
                stopOnFocus: true,
                offset: {
                  x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                  y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
                }, // Prevents dismissing of toast on hover
                style: {
                  background: "linear-gradient(to right ,#1b2223 , #3a4f50)",
                  borderRadius: ".5rem",
                  textTransform: "uppercase",
                  fontSize: '.75rem',
                  boxShadow: 'none'
                },// Callback after click
              }).showToast();
            productInCart.length = 0;
            localStorage.setItem("Products-in-cart",JSON.stringify(productInCart));
            loadProductsCart();
        }
      });
}


function updateTotal(){
    const totalPriceCal = productInCart.reduce((acc,p) => acc +(p.precio * p.cantidad), 0);
    totalPrice.innerText = `$${totalPriceCal}`;
}


cartBuy.addEventListener("click", buyCart);

function buyCart(){
    productInCart.length = 0;
    localStorage.setItem("Products-in-cart",JSON.stringify(productInCart));
    cartEmptyContainer.classList.add("disabled");
    cartProductsContainer.classList.add("disabled");
    cartActionsContainer.classList.add("disabled");
    cartGreetingsContainer.classList.remove("disabled");
}