const start = document.querySelector("#btn-start");
const main = document.querySelector("#content");
const cody = document.querySelector("#cody")

start.addEventListener("click", ()=>{
    start.classList.add("boton-off")
    main.classList.add("content-on")
    cody.classList.remove("body");
});