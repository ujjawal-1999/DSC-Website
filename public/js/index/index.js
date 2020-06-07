
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


//flash message
var close = document.getElementsByClassName("closebtn");
var i;

// Loop through all close buttons
for (i = 0; i < close.length; i++) {
  // When someone clicks on a close button
  close[i].onclick = function(){

    // Get the parent of <span class="closebtn"> (<div class="alert">)
    var div = this.parentElement;

    // Set the opacity of div to 0 (transparent)
    div.style.opacity = "0";

    // Hide the div after 600ms (the same amount of milliseconds it takes to fade out)
    setTimeout(function(){ div.style.display = "none"; }, 600);
  }
}