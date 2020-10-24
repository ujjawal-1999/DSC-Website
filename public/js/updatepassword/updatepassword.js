function showpasswordupdate() {
  var oldps = document.getElementById("oldPassword");
  var ops = document.getElementById("newPassword");
  var nps = document.getElementById("confirmPassword");

  if (ops.type == "password") {
    ops.type = "text";
    nps.type = "text";
    oldps.type = "text";
  } else {
    ops.type = "password";
    nps.type = "password";
    oldps.type = "password";
  }
}

function updatePasswordValidate() {
  var ops = document.getElementById("newPassword");
  var nps = document.getElementById("confirmPassword");
  var error = document.getElementById("error");

  if (ops !== nps) {
    error.style.opacity = 1;
    error.style.color = "red";
    error.innerText = "Password doesn't match !";
    return false;
  }
  error.style.opacity = 0;
  return true;
}
