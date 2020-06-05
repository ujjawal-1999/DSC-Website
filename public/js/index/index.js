
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

const section = document.querySelectorAll("section");
const h2 = document.querySelectorAll("h2");

const observer1 = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting == true) {
      entry.target.classList.add("animate");
    } else {
      entry.target.classList.remove("animate");
    }
  });
});

section.forEach((title) => {
  observer1.observe(title);
});
h2.forEach((title) => {
  observer1.observe(title);
});
