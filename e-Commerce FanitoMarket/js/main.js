let productos = [];

fetch("./js/productos.json")
  .then(response => response.json())
  .then(data => {
    productos = data;
    uploadProducts(productos);
  })



const productContainer = document.querySelector("#product-container");
const buttonCattegory = document.querySelectorAll(".nav-button");
const mainTitle = document.querySelector("#main-title");
let addButton = document.querySelectorAll(".add-button");
const numberito = document.querySelector("#numberito");


function uploadProducts(productsChosen){
 productContainer.innerHTML="";

  productsChosen.forEach(producto =>{

    const div = document.createElement("div");
    div.classList.add("products");
    div.innerHTML= `
      <div class="products">
        <img class="product-img" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="product-card">
          <h3 class="product-title">${producto.titulo}</h3>
          <p class="product-price">$${producto.precio}</p>
          <button class="add-button" id="${producto.id}">Agregar</button>
        </div>
      </div> `;
productContainer.append(div);
  })
  updateAddButton();
};




buttonCattegory.forEach(button =>{
  button.addEventListener("click",(e)=>{

    buttonCattegory.forEach(boton => boton.classList.remove("active"));
    e.currentTarget.classList.add("active");

    if(e.currentTarget.id !== "todos"){
      const productChategory = productos.find(producto => producto.categoria.id === e.currentTarget.id);
      mainTitle.innerText =productChategory.categoria.nombre;
      const productsButton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
      uploadProducts(productsButton);
    }else{
      mainTitle.innerText ="Todos los Productos";
      uploadProducts(productos);
    }
  })
});

function updateAddButton(){
  addButton = document.querySelectorAll(".add-button");

  addButton.forEach(btn =>{
    btn.addEventListener("click", addProductCart);
  });
}

let cartWithProducts;

let productInCartLS = localStorage.getItem("Products-in-cart");

if(productInCartLS){
  cartWithProducts = JSON.parse(productInCartLS);
  updateNumberito();
}else{
  cartWithProducts = [];
}

function addProductCart(e) {
  Toastify({
    text: "Producto agregado",
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
  const productAdded = productos.find(producto => producto.id === idButton);
  
  if(cartWithProducts.some(producto => producto.id === idButton)){
    const index = cartWithProducts.findIndex(producto => producto.id === idButton);
    cartWithProducts[index].cantidad++;
    // productAdded.cantidad +=1; forma alternativa de resolverlo?
  }else{
    productAdded.cantidad = 1;
    cartWithProducts.push(productAdded);
  }
  updateNumberito();

  localStorage.setItem("Products-in-cart", JSON.stringify(cartWithProducts));
}

function updateNumberito (){
  let numerito = cartWithProducts.reduce((acc,producto) => acc + producto.cantidad, 0);
  numberito.innerText = numerito;
}