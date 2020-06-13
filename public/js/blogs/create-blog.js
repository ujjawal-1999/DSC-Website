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
  // onsubmit do this first
  var body = document.querySelector("input[name=body]"); // set name input var
  var summary = document.querySelector("input[name=summary]"); // set name input var
  body.value = JSON.stringify(quill.getContents()); // populate name input with quill data
  summary.value = quill.getText().slice(0, 40);
  console.log(summary.value);
  return false; // submit form
};
