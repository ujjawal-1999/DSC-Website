var slider = document.querySelector(".heading-block");
var container = document.getElementById("container");
//Switchers
var loginswitcher = document.getElementById("switchtologin");
var switchtosignup = document.getElementById("switchtosignup");
//Type
var label = document.getElementById("label");
//Forms
var signupform = document.getElementById("signupform");
var loginform = document.getElementById("loginform");

//Animation
loginswitcher.addEventListener("click", () => {
  login();
});
switchtosignup.addEventListener("click", () => {
  signup();
});

function signup() {
  const timeline = anime.timeline({
    duration: 200,
    easing: "easeInOutExpo",
  });

  timeline
    .add({
      targets: label,
      delay: 100,
      opacity: 0,
    })
    .add({
      targets: label,
      update: function () {
        label.innerHTML = "SignUp";
      },
    })
    .add({
      targets: label,
      opacity: 1,
    });

  timeline.add(
    {
      targets: slider,
      width: "100%",
    },
    "-=200"
  );

  timeline.add({
    delay: 100,
    update: function () {
      signupform.style.display = "flex";
      loginform.style.display = "none";
    },
  });
  timeline.add({
    targets: loginform,
    display: "none",
  });
  timeline.add({
    targets: slider,
    width: "40%",
  });
  type = false;
}

function login() {
  const timeline = anime.timeline({
    duration: 200,
    easing: "easeInOutExpo",
  });

  timeline
    .add({
      targets: label,
      delay: 100,
      opacity: 0,
    })
    .add({
      targets: label,
      update: function () {
        label.innerHTML = "Login";
      },
    })
    .add({
      targets: label,
      opacity: 1,
    });

  timeline.add(
    {
      targets: slider,
      width: "100%",
    },
    "-=200"
  );

  timeline.add({
    targets: signupform,
    delay: 100,
    update: function () {
      signupform.style.display = "none";
      loginform.style.display = "flex";
    },
  });
  timeline.add({
    targets: loginform,
    display: "flex",
  });
  timeline.add({
    targets: slider,
    width: "40%",
  });
  type = true;
}

// Validation Logic

function validate() {
  var ps = document.getElementById("password").value;
  var cps = document.getElementById("cpassword").value;
  var signup = document.getElementById("signupform");
  if (ps == cps) {
    console.log("true");
    signup.submit();
    return true;
  } else {
    alert("Password doesn't match");
    console.log("false");
    return false;
  }
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
function showpasswordlogin() {
  var ps = document.getElementById("loginpassword");

  if (ps.type === "password") {
    ps.type = "text";
  } else {
    ps.type = "password";
  }
}
