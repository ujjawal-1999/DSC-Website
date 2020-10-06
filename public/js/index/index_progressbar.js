function uploadFile() {
  var file = document.getElementById("status")("file1").files[0];
  progressBar.style.opacity = 1;
  var formdata = new FormData();
  formdata.append("file1", file);
  var ajax = new XMLHttpRequest();
  ajax.upload.addEventListener("progress", progressHandler, false);
  ajax.addEventListener("load", completeHandler, false);
  ajax.addEventListener("error", errorHandler, false);
  ajax.addEventListener("abort", abortHandler, false);
  ajax.open("POST", " ");

  ajax.send(formdata);
}

const progressBar = document.querySelector(".progress");
function progressHandler(event) {
  progressBar.style.opacity = 1;
  var percent = (event.loaded / event.total) * 100;
  document.getElementById("status").style.fontSize = "0.8rem";
  document.getElementById("status").style.fontWeight = "200";
  document.getElementById("status").style.marginTop = "1rem";
  document.getElementById("progressBar").style.opacity = "1";
  document.getElementById("progressBar").value = Math.round(percent);
  document.getElementById("status").innerHTML =
    Math.round(percent) + "% uploaded";
}

function completeHandler(event) {
  document.getElementById("status").innerHTML = event.target.responseText;
  progressBar.style.opacity = 1;
  document.getElementById("progressBar").value = "Uploaded Successfully";
}

function errorHandler(event) {
  document.getElementById("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
  document.getElementById("status").innerHTML = "Upload Aborted";
}

var file = document.getElementById("file1");
var lb = document.getElementById("lb");

lb.addEventListener("mousedown", function () {
  // console.log("cankn");
  file.click();
});

//Scroll To Top Function
// window.addEventListener("scroll", () => {
//   document.getElementById("ScrolltoTop").style.display = "block";
// });
// document.getElementById("ScrolltoTop").addEventListener("click", (e) => {
//   e.preventDefault();
//   window.focus();
//   window.scrollTo({
//     top: 0,
//     left: 0,
//     behavior: "smooth",
//   });
// });
