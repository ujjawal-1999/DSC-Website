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
  var name = document.querySelector("input[name=body]"); // set name input var
  name.value = JSON.stringify(quill.getContents()); // populate name input with quill data
  console.log(name.value);
  return false; // submit form
};
