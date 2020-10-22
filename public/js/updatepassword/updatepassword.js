function showpasswordupdate() {
  var ops = document.getElementById("oldPassword");
  var nps = document.getElementById("newPassword");

  if (ops.type === "password") {
    ops.type = "text";
    nps.type = "text";
  }
  if (ops.type === "text") {
    ops.type = "password";
    nps.type = "password";
  }
}

function updatePasswordValidate() {
  var ops = document.getElementById("oldPassword");
  var nps = document.getElementById("newPassword");

  if (ops != nps) {
    alert("Password doesn't match");
    return false;
  }

  return true;
}
