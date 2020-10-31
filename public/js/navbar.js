let filterInput1 = document.getElementById("search1");
let srh1 = document.getElementById("srh1");
var flag1 = 1;

window.addEventListener("keydown", (e) => {
  if (document.getElementById("search1").value.toUpperCase().length == 0) {
    document.getElementById("search_list1").style.display = "none";
  }

  if (e.key === "Escape") {
    document.getElementById("search_list1").style.display = "none";
  }
});

srh1.addEventListener("click", () => {
  let ul1 = document.getElementById("search_list1");
  if (ul1.style.display !== "none" || flag1 == 0) {
    ul1.style.display = "none";
    flag1 = 1;
  }
});
//add event listener
filterInput1.addEventListener("keydown", filternames1);

function filternames1() {
  //get value of input
  let filterValue1 = document.getElementById("search1").value.toUpperCase();
  //Get names ul
  let ul1 = document.getElementById("search_list1");
  //get lis from ul
  let li1 = ul1.querySelectorAll("li.collection-item1");
  if (filterValue1.trim().length > 0 && filterValue1.trim() !== "") {
    ul1.style.display = "block";
  }
  //loop through collection item lis
  let count = 0;
  for (let i = 0; i < li1.length; i++) {
    let a1 = li1[i].getElementsByTagName("a")[0];
    //if matched

    if (
      a1.innerHTML.toUpperCase().trim().indexOf(filterValue1.trim()) > -1 &&
      filterValue1.trim() !== "" &&
      filterValue1.trim().length > 1
    ) {
      ul1.style.display = "block";
      li1[i].style.display = "block";
      count++;
    } else {
      li1[i].style.display = "none";
    }
  }
  if (count === 0) ul1.style.display = "none";
}
// #################################################################################
let filterInput2 = document.getElementById("search2");
let srh2 = document.getElementById("srh2");
var flag2 = 1;

window.addEventListener("keydown", (e) => {
  // console.log(document.getElementById("search2").value.length);
  if (document.getElementById("search2").value.toUpperCase().length == 0) {
    document.getElementById("search_list2").style.display = "none";
  }

  if (e.key === "Escape") {
    document.getElementById("search_list2").style.display = "none";
  }
});

srh2.addEventListener("click", () => {
  let ul2 = document.getElementById("search_list2");
  if (ul2.style.display !== "none" || flag2 == 0) {
    ul2.style.display = "none";
    flag2 = 1;
  }
});
//add event listener
filterInput2.addEventListener("keydown", filtername2);

function filtername2() {
  //get value of input
  let filterValue2 = document.getElementById("search2").value.toUpperCase();
  //Get names ul
  let ul2 = document.getElementById("search_list2");
  //get lis from ul
  let li2 = ul2.querySelectorAll("li.collection-item2");
  if (filterValue2.trim().length > 0 && filterValue2.trim() !== "") {
    ul2.style.display = "block";
  }
  //loop through collection item lis
  let count = 0;
  for (let i = 0; i < li2.length; i++) {
    let a2 = li2[i].getElementsByTagName("a")[0];
    //if matched

    if (
      a2.innerHTML.toUpperCase().trim().indexOf(filterValue2.trim()) > -1 &&
      filterValue2.trim() !== "" &&
      filterValue2.trim().length > 1
    ) {
      ul2.style.display = "block";
      li2[i].style.display = "block";
      count++;
    } else {
      li2[i].style.display = "none";
    }
  }
  if (count === 0) ul2.style.display = "none";
}
// #####
/*
Inspired by Florin Pop's coding challenges, you can check them here: https://www.florin-pop.com/blog/2019/03/weekly-coding-challenge/
*/

// UI Elements
const toggle = document.getElementById("toggle"),
  circle = document.querySelector(".circle"),
  body = document.querySelector("body");
let span = document.getElementById("shift");
let theme = "bright";

var navWrap = document.getElementById("navwrap");

$(".menu-toggle").click(function () {
  $(".nav").toggleClass("mobile-nav");
  $(this).toggleClass("is-active");

  $("#navwrap").toggleClass("uparneeche");
});

$("#dropper").hover(function (e) {
  $(".dropdown-content").toggleClass("block");
});

// Helper function for setting theme parameters
// "params" needs to be written like object {"key1": "value1", "key2": "value2", ...}

window.addEventListener("click", (e) => {
  if (
    e.target != document.getElementById("search_list1") &&
    e.target != document.getElementById("collection-item1")
  ) {
    // console.log(e.target != document.getElementById("search_list1"));
    document.getElementById("search_list1").style.display = "none";
  }
  if (
    e.target != document.getElementById("search_list2") &&
    e.target != document.getElementById("collection-item2")
  ) {
    // console.log(e.target != document.getElementById("search_list2"));
    document.getElementById("search_list2").style.display = "none";
  }
});
