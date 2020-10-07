var toolbarOptions = [
  [{ header: [2, 3, 4, 5, 6, false] }],

  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image"],

  [{ list: "ordered" }, { list: "bullet" }],
  [{ script: "sub" }, { script: "super" }], // superscript/subscript

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ align: [] }],
];
var form = document.getElementById("create-form");
var quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: toolbarOptions,
  },
  readOnly: false,
  placeholder: "Body...",
});
form.onsubmit = function (e) {
  e.preventDefault();
  // onsubmit do this first
  var body = document.querySelector("input[name=body]"); // set name input var
  var summary = document.querySelector("input[name=summary]"); // set name input var
  body.value = quill.root.innerHTML; // populate name input with quill data
  summary.value = quill.getText().slice(0, 200);
  console.log(summary.value);
  document.querySelector("#create-form").submit();
  // return false; // submit form
};

document.getElementById("file").onchange = (e) => {
  var filename = e.target.files[0].name;
  document.getElementById("file-label").innerHTML = `${filename} selected`;
};
