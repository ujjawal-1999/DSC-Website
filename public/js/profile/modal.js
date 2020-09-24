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
  addExperienceModal.style.opacity = "1";
  addExperienceModal.style.pointerEvents = "all";
});
backBtn1.addEventListener("click", () => {
  addExperienceModal.style.opacity = "0";
  addExperienceModal.style.pointerEvents = "none";
});
// Skills Modal
var addSkillbtn = document.getElementById("addSkills");
var backBtn2 = document.getElementById("backlogo2");
var addSkillModal = document.getElementById("addSkillsModal");
addSkillbtn.addEventListener("click", () => {
  addSkillModal.style.opacity = "1";
  addSkillModal.style.pointerEvents = "all";
});
backBtn2.addEventListener("click", () => {
  addSkillModal.style.opacity = "0";
  addSkillModal.style.pointerEvents = "none";
});
// Projects Modal
var addProjectbtn = document.getElementById("addProject");
var backBtn3 = document.getElementById("backlogo3");
var addProjectModal = document.getElementById("addProjectsModal");
addProjectbtn.addEventListener("click", () => {
  addProjectModal.style.opacity = "1";
  addProjectModal.style.pointerEvents = "all";
});
backBtn3.addEventListener("click", () => {
  addProjectModal.style.opacity = "0";
  addProjectModal.style.pointerEvents = "none";
});

// Achievement Modal
var addAchievementbtn = document.getElementById("addAchievement");
var backBtn4 = document.getElementById("backlogo4");
var addAchievementModal = document.getElementById("addAchievementModal");
addAchievementbtn.addEventListener("click", () => {
  addAchievementModal.style.opacity = "1";
  addAchievementModal.style.pointerEvents = "all";
});
backBtn4.addEventListener("click", () => {
  addAchievementModal.style.opacity = "0";
  addAchievementModal.style.pointerEvents = "none";
});
