function validate() {
  var ps = document.getElementById("password").value;
  var cps = document.getElementById("confirmPassword").value;

  if (ps.length < 3) {
    alert("Password is weak !");
    return false;
  }
  if (ps < 4 && cps < 4) {
    alert("Password is too short ! ");
    return false;
  }
  if (ps != cps) {
    alert("Password doesn't match !");
    return false;
  }

  return true;
}

function showpasswordsignup() {
  var ps = document.getElementById("password");
  var cps = document.getElementById("cpassword");

  if (ps.type === "password") {
    ps.type = "text";
    cps.type = "text";
  } else {
    ps.type = "password";
    cps.type = "password";
  }
}
