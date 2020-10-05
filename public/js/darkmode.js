const dmode = document.getElementById("dmodeGLOBAL");
const toogler = document.getElementById("toogle");
// Initial Settings
var themestart = localStorage.getItem("theme");
if (themestart == "Light") {
  toogler.checked = false;
  setTheme("Dark");
} else {
  toogler.checked = true;
  setTheme("Light");
}

toogler.addEventListener("click", () => {
  var theme = localStorage.getItem("theme");
  // console.log(toogler.checked);
  setTheme(theme);
});

function setTheme(theme) {
  if (theme == null) {
    localStorage.setItem("theme", "Light");
  }
  if (theme == "Light") {
    localStorage.setItem("theme", "Dark");
    document.documentElement.style.setProperty("--color-primary", "#ff184a");
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty("--navButtons", "#123d82");
    document.documentElement.style.setProperty("--greany", "#1ebea5");
    document.documentElement.style.setProperty("--primary-light", "#1f1f1f");
    document.documentElement.style.setProperty("--primary-dark", "#141414");
    document.documentElement.style.setProperty("--Grey-light-1", "#303030");
    document.documentElement.style.setProperty(
      "--Grey-light-2",
      "rgb(117, 117, 117)"
    );
    document.documentElement.style.setProperty("--Grey-light-3", "#b6b6b6");
    document.documentElement.style.setProperty("--Grey-light-4", "#ccc");
    document.documentElement.style.setProperty(
      "--Grey-dark-1",
      "rgb(238, 238, 238)"
    );
    document.documentElement.style.setProperty(
      "--Grey-dark-2",
      "rgb(218, 218, 218)"
    );
    document.documentElement.style.setProperty("--Grey-dark-3", "#999");
    document.documentElement.style.setProperty(
      "--Grey-dark-4",
      "rgb(252, 252, 252)"
    );
    document.documentElement.style.setProperty(
      "--Grey-dark-5",
      "rgb(240, 240, 240)"
    );
    document.documentElement.style.setProperty("--loginButton", "#2b65ec");
  }
  if (theme == "Dark") {
    localStorage.setItem("theme", "Light");
    document.documentElement.style.setProperty("--color-primary", "#ff184a");
    document.documentElement.style.setProperty("--white", "#ffffff");
    document.documentElement.style.setProperty("--navButtons", "#123d82");
    document.documentElement.style.setProperty("--greany", "#1ebea5");
    document.documentElement.style.setProperty("--primary-light", "#ffffff");
    document.documentElement.style.setProperty("--primary-dark", "#f5f5f5");
    document.documentElement.style.setProperty("--Grey-light-1", "#faf9f9");
    document.documentElement.style.setProperty("--Grey-light-2", "#f4f2f2");
    document.documentElement.style.setProperty("--Grey-light-3", "#f0eeee");
    document.documentElement.style.setProperty("--Grey-light-4", "#ccc");
    document.documentElement.style.setProperty("--Grey-dark-1", "#333");
    document.documentElement.style.setProperty("--Grey-dark-2", " #777");
    document.documentElement.style.setProperty("--Grey-dark-3", "#999");
    document.documentElement.style.setProperty(
      "--Grey-dark-4",
      "rgb(27, 27, 27)"
    );
    document.documentElement.style.setProperty(
      "--Grey-dark-5",
      "rgb(61, 61, 61)"
    );
    document.documentElement.style.setProperty("--loginButton", "#2b65ec");
  }
}
