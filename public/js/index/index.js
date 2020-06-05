
const rightBtn = document.querySelector("#right-button");
const leftBtn = document.querySelector("#left-button");

rightBtn.addEventListener("click", function (event) {
  const conent = document.querySelector("#row");
  conent.scrollLeft += 300;
  event.preventDefault();
});

leftBtn.addEventListener("click", function (event) {
  const conent = document.querySelector("#row");
  conent.scrollLeft -= 300;
  event.preventDefault();
});
