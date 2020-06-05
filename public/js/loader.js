var logo = document.getElementById("dsclogo");
var dsc = document.getElementById("heading__secondary");
var nitsilchar = document.getElementById("heading__primary");
var get = document.getElementById("getStarted");

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector(".loaderr").style.visibility = "visible";
  } else {
    setTimeout(function () {
      document.querySelector(".loaderr").style.display = "none";
      document.querySelector("body").style.visibility = "visible";
      logo.style.animation = "fadeIn 1s forwards";
      dsc.style.animation = "fadeIn 1s 0.5s forwards";
      nitsilchar.style.animation = "fadeIn 1s 1s forwards";
      get.style.animation = "fadeIn 1s 1.5s forwards";
    }, 2000);
  }
};
