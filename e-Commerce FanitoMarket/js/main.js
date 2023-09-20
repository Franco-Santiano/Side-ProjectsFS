const productos = [
  {
    id: "abrigo-01",
    titulo:"Abrigo 1",
    imagen: "./assets/imgs/abrigos/buzo1.jpg",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos"
    },
    precio: 2000,
  },
  {
    id: "abrigo-02",
    titulo:"Abrigo 2",
    imagen: "./assets/imgs/abrigos/buzo2.jpg",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos"
    },
    precio: 2200,
  },
  {
    id: "abrigo-03",
    titulo:"Abrigo 3",
    imagen: "./assets/imgs/abrigos/buzo3.webp",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos"
    },
    precio: 4000,
  },
  {
    id: "abrigo-04",
    titulo:"Abrigo 4",
    imagen: "./assets/imgs/abrigos/buzo4.webp",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos"
    },
    precio: 20400,
  },
  {
    id: "abrigo-05",
    titulo:"Abrigo 5",
    imagen: "./assets/imgs/abrigos/buzo5.webp",
    categoria: {
      nombre: "Abrigos",
      id: "abrigos"
    },
    precio: 22000,
  },
  {
    id: "remera-01",
    titulo:"Remera 1",
    imagen: "./assets/imgs/remeras/remera1.jpg",
    categoria: {
      nombre: "Remeras",
      id: "remeras"
    },
    precio: 1000,
  },
  {
    id: "remera-02",
    titulo:"Remera 2",
    imagen: "./assets/imgs/remeras/remera2.webp",
    categoria: {
      nombre: "Remeras",
      id: "remeras"
    },
    precio: 3300,
  },
  {
    id: "remera-03",
    titulo:"Remera 3",
    imagen: "./assets/imgs/remeras/remera3.webp",
    categoria: {
      nombre: "Remeras",
      id: "remeras"
    },
    precio: 13000,
  },
  {
    id: "remera-04",
    titulo:"Remera 4",
    imagen: "./assets/imgs/remeras/remera4.webp",
    categoria: {
      nombre: "Remeras",
      id: "remeras"
    },
    precio: 14000,
  },
  {
    id: "remera-05",
    titulo:"Remera 5",
    imagen: "./assets/imgs/remeras/remera5.jpg",
    categoria: {
      nombre: "Remeras",
      id: "remeras"
    },
    precio: 10500,
  },
  {
    id: "pantalon-01",
    titulo:"Pantalon 1",
    imagen: "./assets/imgs/pantalones/jeans1.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones"
    },
    precio: 30500,
  },
  {
    id: "pantalon-02",
    titulo:"Pantalon 2",
    imagen: "./assets/imgs/pantalones/jeans2.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones"
    },
    precio: 40500,
  },
  {
    id: "pantalon-03",
    titulo:"Pantalon 3",
    imagen: "./assets/imgs/pantalones/jeans3.webp",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones"
    },
    precio: 20500,
  },
  {
    id: "pantalon-04",
    titulo:"Pantalon 4",
    imagen: "./assets/imgs/pantalones/jeans4.jpg",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones"
    },
    precio: 42500,
  },
  {
    id: "pantalon-05",
    titulo:"Pantalon 5",
    imagen: "./assets/imgs/pantalones/jeans5.webp",
    categoria: {
      nombre: "Pantalones",
      id: "pantalones"
    },
    precio: 50000,
  },
];

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


uploadProducts(productos);

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