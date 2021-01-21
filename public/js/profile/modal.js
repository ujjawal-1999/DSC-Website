var expression = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;
var regex = new RegExp(expression);
var fbexp = /^(https?:\/\/){0,1}(www\.){0,1}facebook\.com/;
var expression2 = new RegExp(fbexp);
var linkexp = /(https?)?:?(\/\/)?(([w]{3}||\w\w)\.)?linkedin.com(\w+:{0,1}\w*@)?(\S+)(:([0-9])+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
var expression3 = new RegExp(linkexp);
var twitexp = /(?:http:\/\/)?(?:www\.)?twitter\.com\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-]*)/;
var expression4 = new RegExp(twitexp);
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
// ###################################################################################
// Edit Profile Modal
var editProfilebtn = document.getElementById("editbtn");
var backBtn = document.getElementById("backlogo");
var editProfileModal = document.getElementById("editProfileModal");

editProfilebtn.addEventListener("click", () => {
  editProfileModal.style.opacity = "1";
  editProfileModal.style.pointerEvents = "all";
    document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
backBtn.addEventListener("click", () => {
  editProfileModal.style.opacity = "0";
  editProfileModal.style.pointerEvents = "none";
});

function editProfileModalvalidate() {
  var name = document.forms["editprofileform"]["name"].value;
  var bio = document.forms["editprofileform"]["bio"].value;
  var facebook = document.forms["editprofileform"]["facebook"].value;
  var linkedin = document.forms["editprofileform"]["linkedin"].value;
  var github = document.forms["editprofileform"]["github"].value;

  console.log(facebook.length);
  console.log(linkedin.length);
  console.log(twitter.length);
  if (name.length == 0) {
    alert("Full Name is too short !");
    return false;
  }

  if (bio.length < 5) {
    alert("Bio must be more than 10 words !");
    return false;
  }

  if (facebook.length != 0) {
    if (!facebook.match(expression2)) {
      alert("Invalid Facebook Link Format");
      return false;
    }
  }

  if (linkedin.length != 0) {
    if (!linkedin.match(expression3)) {
      alert("Invalid Linkedin Link Format");
      return false;
    }
  }

  // !facebook.match(expression)
  // !linkedin.match(expression)
  // !twitter.match(expression)
  return true;
}

var uploadImageBtn = document.getElementById("uploadphoto")
if(uploadImageBtn.style["opacity"] == 0){
  uploadImageBtn.style["cursor"] = "default"
}
function didyouupload() {
  var uploadphotobtn = document.getElementById("uploadphoto");
  uploadphotobtn.style.opacity = "1";
  uploadImageBtn.style["cursor"] = "pointer"
  document.getElementById("#file-name").textContent = this.files[0].name;
}

function filename(){
  document.querySelector("#file-name").textContent = this.files[0].name;
}
// ###################################################################################

editProfilebtn.addEventListener("click", () => {
  editProfileModal.style.opacity = "1";
  editProfileModal.style.pointerEvents = "all";
    document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
backBtn.addEventListener("click", () => {
  editProfileModal.style.opacity = "0";
  editProfileModal.style.pointerEvents = "none";
});


// ###################################################################################
// Experience Modal
var addExperiencebtn = document.getElementById("addExperience");
var backBtn1 = document.getElementById("backlogo1");
var addExperienceModal = document.getElementById("addExperienceModal");
addExperiencebtn.addEventListener("click", () => {
  addExperienceModal.style.opacity = "1";
  addExperienceModal.style.pointerEvents = "all";
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
backBtn1.addEventListener("click", () => {
  addExperienceModal.style.opacity = "0";
  addExperienceModal.style.pointerEvents = "none";
});
function addExperienceModalvalidate() {
  var exp_name = document.forms["addExperienceform"]["exp_name"].value;
  var exp_role = document.forms["addExperienceform"]["exp_role"].value;
  var exp_startdate =
    document.forms["addExperienceform"]["exp_startdate"].value;
  var endDateElement = document.getElementById("exp_enddate").disabled;
  var exp_enddate = document.forms["addExperienceform"]["exp_enddate"].value;
  var exp_status = document.forms["addExperienceform"]["exp_status"].value;
  var exp_description =
    document.forms["addExperienceform"]["exp_description"].value;

  if (exp_name.length == 0) {
    alert("Company Name is too short !");
    return false;
  }
  if (exp_role.length == 0) {
    alert("Job Role is too short !");
    return false;
  }
  if (exp_startdate > exp_enddate) {
    alert("Start Date cannot be ahead of End Date !");
    return false;
  }
  if (exp_description.length < 4) {
    alert("Description is too short !");
    return false;
  }

  return true;
}
function statusListener() {
  var exp_status = document.forms["addExperienceform"]["exp_status"].value;
  if (exp_status === "Ongoing") {
    document.getElementById("exp_enddate").disabled = true;
    document.getElementById("exp_enddate").type = "text";
    document.forms["addExperienceform"]["exp_enddate"].value = "Till Now";
  } else {
    document.getElementById("exp_enddate").disabled = false;
    document.getElementById("exp_enddate").type = "date";
  }
}
// ###################################################################################
// Skills Modal
var addSkillbtn = document.getElementById("addSkills");
var backBtn2 = document.getElementById("backlogo2");
var addSkillModal = document.getElementById("addSkillsModal");
addSkillbtn.addEventListener("click", () => {
  addSkillModal.style.opacity = "1";
  addSkillModal.style.pointerEvents = "all";
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
backBtn2.addEventListener("click", () => {
  addSkillModal.style.opacity = "0";
  addSkillModal.style.pointerEvents = "none";
});
function addSkillsModalvalidate() {
  var skillname = document.forms["addSkillsForm"]["skillname"].value;
  var skilllevel = document.forms["addSkillsForm"]["skilllevel"].value;
  var skillduration = document.forms["addSkillsForm"]["skillduration"].value;
  var skilldescription =
    document.forms["addSkillsForm"]["skilldescription"].value;

  if (skillname.length == 0) {
    alert("Company Name is too short !");
    return false;
  }
  if (skilllevel.length < 2) {
    alert("Job Role is too short !");
    return false;
  }
  if (skilldescription.length < 4) {
    alert("Description is too short !");
    return false;
  }

  return true;
}
// ###################################################################################
// Projects Modal
var addProjectbtn = document.getElementById("addProject");
var backBtn3 = document.getElementById("backlogo3");
var addProjectModal = document.getElementById("addProjectsModal");
addProjectbtn.addEventListener("click", () => {
  addProjectModal.style.opacity = "1";
  addProjectModal.style.pointerEvents = "all";
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});
backBtn3.addEventListener("click", () => {
  addProjectModal.style.opacity = "0";
  addProjectModal.style.pointerEvents = "none";
});
function statusListenerProject() {
  var prj_status = document.forms["addProjectForm"]["status"].value;
  console.log(prj_status);
  if (prj_status === "Ongoing") {
    document.getElementById("enddate").disabled = true;
    document.getElementById("enddate").type = "text";
    document.forms["addProjectForm"]["enddate"].value = "Present";
  } else {
    document.getElementById("enddate").disabled = false;
    document.getElementById("enddate").type = "date";
  }
}
function addProjectModalvalidate() {
  var title = document.forms["addProjectForm"]["title"].value;
  var role = document.forms["addProjectForm"]["role"].value;
  var startdate = document.forms["addProjectForm"]["startdate"].value;
  var enddate =
    document.forms["addProjectForm"]["enddate"].value == "Till Now"
      ? "PRESENT"
      : document.forms["addProjectForm"]["enddate"].value;
  var githuburl = document.forms["addProjectForm"]["githuburl"].value;
  var hosturl = document.forms["addProjectForm"]["hosturl"].value;
  var description = document.forms["addProjectForm"]["description"].value;

  if (title.length == 0) {
    alert("Project Name is too short !");
    return false;
  }
  if (role.length == 0) {
    alert("Project Role is too short !");
    return false;
  }
  if (skilldescription.length < 4) {
    alert("Description is too short !");
    return false;
  }
  if (enddate !== "PRESENT") {
    if (startdate > enddate) {
      alert("Start Date cannot be ahead of End Date !");
      return false;
    }
  }

  if (!githuburl.match(expression)) {
    alert("Not a valid Git Repository URL !");
    return false;
  }
  if (hosturl.length() != 0) {
    if (!hosturl.match(expression)) {
      alert("Not a valid Host URL !");
      return false;
    }
  }
  return true;
}
// ###################################################################################
// Achievement Modal
var addAchievementbtn = document.getElementById("addAchievement");
var backBtn4 = document.getElementById("backlogo4");
var addAchievementModal = document.getElementById("addAchievementModal");
addAchievementbtn.addEventListener("click", () => {
  addAchievementModal.style.opacity = "1";
  addAchievementModal.style.pointerEvents = "all";
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;

});
backBtn4.addEventListener("click", () => {
  addAchievementModal.style.opacity = "0";
  addAchievementModal.style.pointerEvents = "none";
});
function addAchievementModalvalidate() {
  var achievementname =
    document.forms["addAchievementForm"]["achievementname"].value;
  var achievementnameplatform =
    document.forms["addAchievementForm"]["achievementnameplatform"].value;
  var achievementnameserial =
    document.forms["addAchievementForm"]["achievementnameserial"].value;
  var projectdescription =
    document.forms["addAchievementForm"]["projectdescription"].value;

  if (achievementname.length == 0) {
    alert("Achievement Name is too short !");
    return false;
  }
  if (achievementnameplatform.length == 0) {
    alert("Achievement Platform is too short !");
    return false;
  }

  // if (projectdescription.length < 4) {
  //   alert("Achievement description is too short !");
  //   return false;
  // }
  return true;
}
// ###################################################################################
window.addEventListener("keyup", (e) => {
  if (e.key == "Escape") {
    if (document.getElementById("addExperienceModal").style.opacity != "0") {
      document.getElementById("addExperienceModal").style.opacity = "0";
      document.getElementById("addExperienceModal").style.pointerEvents =
        "none";
    }

    if (document.getElementById("editProfileModal").style.opacity != "0") {
      document.getElementById("editProfileModal").style.opacity = "0";
      document.getElementById("editProfileModal").style.pointerEvents = "none";
    }

    if (document.getElementById("addSkillsModal").style.opacity != "0") {
      document.getElementById("addSkillsModal").style.opacity = "0";
      document.getElementById("addSkillsModal").style.pointerEvents = "none";
    }

    if (document.getElementById("addProjectsModal").style.opacity != "0") {
      document.getElementById("addProjectsModal").style.opacity = "0";
      document.getElementById("addProjectsModal").style.pointerEvents = "none";
    }

    if (document.getElementById("addAchievementModal").style.opacity != "0") {
      document.getElementById("addAchievementModal").style.opacity = "0";
      document.getElementById("addAchievementModal").style.pointerEvents =
        "none";
    }
  }
});

function isDescendant(parent, child) {
     var node = child.parentNode;
     while (node != null) {
         if (node == parent) {
             return true;
         }
         node = node.parentNode;
     }
     return false;
}

// Close experience modal if clicked outside it if (element2.hasParent(element1)) 
window.addEventListener("click", (e) => {
  var isChild = isDescendant(document.getElementById("addExperienceModal"),e.target)

  if (!isChild && (e.target != document.getElementById("addExperienceModal")) ) {
    document.getElementById("addExperienceModal").style.display = "none";
  }
  if (
    e.target == document.getElementById("addExperience")
  ) {
    document.getElementById("addExperienceModal").style.display = "flex";
  }
});

// Close Skill modal if clicked outside it
window.addEventListener("click", (e) => {
  var isChild = isDescendant(document.getElementById("addSkillsModal"),e.target)

  if (!isChild && (e.target != document.getElementById("addSkillsModal")) ) {
    document.getElementById("addSkillsModal").style.display = "none";
  }
  if (
    e.target == document.getElementById("addSkills")
  ) {
    document.getElementById("addSkillsModal").style.display = "flex";
  }
});

// Close Projects modal if clicked outside it
window.addEventListener("click", (e) => {
  var isChild = isDescendant(document.getElementById("addProjectsModal"),e.target)

  if (!isChild && (e.target != document.getElementById("addProjectsModal")) ) {
    document.getElementById("addProjectsModal").style.display = "none";
  }
  if (
    e.target == document.getElementById("addProject")
  ) {
    document.getElementById("addProjectsModal").style.display = "flex";
  }
});

// Close Achievement modal if clicked outside it
window.addEventListener("click", (e) => {
  var isChild = isDescendant(document.getElementById("addAchievementModal"),e.target)

  if (!isChild && (e.target != document.getElementById("addAchievementModal")) ) {
    document.getElementById("addAchievementModal").style.display = "none";
  }
  if (
    e.target == document.getElementById("addAchievement")
  ) {
    document.getElementById("addAchievementModal").style.display = "flex";
  }
});

// edit profile modal
window.addEventListener("click", (e) => {
  var isChild = isDescendant(document.getElementById("editProfileModal"),e.target)

  if (!isChild && (e.target != document.getElementById("editProfileModal")) ) {
    document.getElementById("editProfileModal").style.display = "none";
  }
  if (
    e.target == document.getElementById("editbtn")
  ) {
    document.getElementById("editProfileModal").style.display = "flex";
  }
});

