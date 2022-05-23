const cardContainer = document.querySelector("#cardContainer");
let productImg;
let productTitle;
let productPrice;
let productBtn;

let btnArray;
fetch("http://localhost:3002/products")
  .then((response) => response.json())
  .then((data) => drawSite(data));
let drawSite = (obj) => {
  for (let i = 0; i < obj.products.length; i++) {
    cardContainer.innerHTML += `<div class = "card">
        <img class ="productImg" src="" alt="">
        <h3 class ="productTitle"></h3>
        <p class ="productPrice"></p>
        <button class ="btn" type="submit">הנחה</button>
        </div>`;
  }
  productImg = document.querySelectorAll(".productImg");
  productTitle = document.querySelectorAll(".productTitle");
  productPrice = document.querySelectorAll(".productPrice");
  productBtn = document.querySelectorAll(".productBtn");
  let count = 0;
  obj.products.forEach((data) => {
    for (const [key, value] of Object.entries(data)) {
      switch (key) {
        case "img":
          productImg[count].src = value;
          break;
        case "name":
          productTitle[count].innerHTML = value;
          break;
        case "price":
          productPrice[count].innerHTML = value;
          break;
        default:
          "";
          break;
      }
    }
    count++;
  });
  setTimeout(() => {
    cardContainer.style.opacity = 1;
  }, 500);
};
document.addEventListener("click", btnClicker);
let message = (json, evt) => {
  if (evt.path[1].innerHTML.includes("אבטיח")) {
    alert(` יש הנחה${json.watermelon}`);
  } else if (evt.path[1].innerHTML.includes("תפוח")) {
    alert(` יש הנחה${json.apple}`);
  } else {
    alert(`אין לנו היום הנחות בכלל`);
  }
};
function btnClicked(event) {
  let element = event.target;
  let json;
  if (element.classList[0] === `btn`) {
    fetch("http://localhost:3002/discount")
      .then((response) => response.json())
      .then((data) => message(data, event));
  }
}
