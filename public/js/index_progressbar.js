function _(el) {
  return document.getElementById(el);
}

function uploadFile() {
  var file = _("file1").files[0];
  
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

function progressHandler(event) {
  _("loaded_n_total").innerHTML =
    "Uploaded " + event.loaded + " bytes of " + event.total;
  _("loaded_n_total").style.fontSize = "0.8rem";
  _("loaded_n_total").style.fontWeight = "200";
  var percent = (event.loaded / event.total) * 100;
  _("status").style.fontSize = "0.8rem";
  _("status").style.fontWeight = "200";
  _("status").style.marginTop = "1rem";

  _("progressBar").value = Math.round(percent);
  _("status").innerHTML = Math.round(percent) + "% uploaded";
}

function completeHandler(event) {
  _("status").innerHTML = event.target.responseText;
  _("progressBar").value = "100"; 
}

function errorHandler(event) {
  _("status").innerHTML = "Upload Failed";
}

function abortHandler(event) {
  _("status").innerHTML = "Upload Aborted";
}

var file = document.getElementById("file1");
var lb = document.getElementById("lb");

lb.addEventListener("mousedown", function () {
  console.log("cankn");
  file.click();
});
