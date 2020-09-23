// Custom Image Modal

const images = document.querySelectorAll(".post-images");
const full = document.querySelector(".fullview");
const ImageModal = document.querySelector(".modal");

images.forEach((image) => {
  image.addEventListener("click", (e) => {
    ImageModal.classList.add("modal_open");
    full.src = e.target["attributes"]["data-original"].value;
  });
});

ImageModal.addEventListener("click", (e) => {
  console.log(e.target.classList.contains(".modal_open"));
  ImageModal.classList.remove("modal_open");
});

// Edit Profile Modal
var editProfilebtn = document.getElementById("editbtn");
var backBtn = document.getElementById("backlogo");
var editProfileModal = document.getElementById("editProfileModal");

editProfilebtn.addEventListener("click", () => {
  // editProfileModal.style.display = "flex";
  editProfileModal.style.opacity = "1";
  editProfileModal.style.pointerEvents = "all";
});
backBtn.addEventListener("click", () => {
  editProfileModal.style.opacity = "0";
  editProfileModal.style.pointerEvents = "none";
});

// Experience Modal
var addExperiencebtn = document.getElementById("addExperience");
var backBtn1 = document.getElementById("backlogo1");
var addExperienceModal = document.getElementById("addExperienceModal");
addExperiencebtn.addEventListener("click", () => {
  // editProfileModal.style.display = "flex";
  addExperienceModal.style.opacity = "1";
  addExperienceModal.style.pointerEvents = "all";
});
backBtn1.addEventListener("click", () => {
  addExperienceModal.style.opacity = "0";
  addExperienceModal.style.pointerEvents = "none";
});






