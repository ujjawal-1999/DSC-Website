// const { body } = require("express-validator");

$("#search-icon").click(function () {
  $(".nav").toggleClass("search");
  $(".nav").toggleClass("no-search");
  $(".search-input").toggleClass("search-active");
});

$(".menu-toggle").click(function () {
  $(".nav").toggleClass("mobile-nav");
  $(this).toggleClass("is-active");
});

let filterInput2 = document.getElementById("search1");
let srh2 = document.getElementById("srh1");
var flag = 1;

window.addEventListener("click", (e) => {
  if (e.target != document.getElementById("search_list1")) {
    console.log(e.target != document.getElementById("search_list1"));
    document.getElementById("search_list1").style.display = "none";
  }
});

window.addEventListener("keydown", (e) => {
  console.log(document.getElementById("search1").value.length);
  if (document.getElementById("search1").value.toUpperCase().length == 0) {
    document.getElementById("search_list1").style.display = "none";
  }

  if (e.key === "Escape") {
    document.getElementById("search_list1").style.display = "none";
  }
});

srh2.addEventListener("click", () => {
  let ul = document.getElementById("search_list1");
  if (ul.style.display !== "none" || flag == 0) {
    ul.style.display = "none";
    flag = 1;
  }
});
//add event listener
filterInput2.addEventListener("keydown", filternames2);

function filternames2() {
  //get value of input
  let filterValue = document.getElementById("search1").value.toUpperCase();
  //Get names ul
  let ul = document.getElementById("search_list1");
  //get lis from ul
  let li = ul.querySelectorAll("li.collection-item2");
  if (filterValue.length > 0) {
    ul.style.display = "block";
  }
  //loop through collection item lis

  for (let i = 0; i < li.length; i++) {
    let a = li[i].getElementsByTagName("a")[0];
    //if matched

    if (
      a.innerHTML.toUpperCase().indexOf(filterValue) > -1 &&
      filterValue != ""
    ) {
      li[i].style.display = "block";
    } else {
      li[i].style.display = "none";
    }
  }
}

// var dropBtn = document.getElementById("dropbtn");
// var dropdown = document.getElementsByClassName("dropdown")[0];
// dropBtn.addEventListener(
//   "click",
//   (onclick = function () {
//     dropdown.classList.toggle("hover-active");
//   })
// );
