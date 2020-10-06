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
});
backBtn.addEventListener("click", () => {
  editProfileModal.style.opacity = "0";
  editProfileModal.style.pointerEvents = "none";
});

function editProfileModalvalidate() {
  var name = document.forms["editprofileform"]["name"].value;
  var hname = document.forms["editprofileform"]["hname"].value;
  var bio = document.forms["editprofileform"]["bio"].value;
  var hname = document.forms["editprofileform"]["hname"].value;
  if (name.length < 4) {
    alert("Full Name is too short !");
    return false;
  }

  if (hname.length < 4) {
    alert("DSC Handle Name is too short !");
    return false;
  }
  if (bio.length < 10) {
    alert("Bio must be more than 10 words !");
    return false;
  }

  return true;
}

// ###################################################################################
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

  if (exp_name.length < 4) {
    alert("Company Name is too short !");
    return false;
  }
  if (exp_role.length < 4) {
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
  if (exp_status == "Ongoing") {
    document.getElementById("exp_enddate").disabled = true;
    document.getElementById("exp_enddate").type = "text";
    document.forms["addExperienceform"]["exp_enddate"].value = "Till Now";
  } else if (exp_status == "Scheduled") {
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

  if (skillname.length < 4) {
    alert("Company Name is too short !");
    return false;
  }
  if (skilllevel.length < 4) {
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
});
backBtn3.addEventListener("click", () => {
  addProjectModal.style.opacity = "0";
  addProjectModal.style.pointerEvents = "none";
});
function statusListenerProject() {
  var prj_status = document.forms["addProjectForm"]["prj_status"].value;
  if (prj_status == "Ongoing") {
    document.getElementById("enddate").disabled = true;
    document.getElementById("enddate").type = "text";
    document.forms["addProjectForm"]["enddate"].value = "Till Now";
  } else if (prj_status == "Scheduled") {
    document.getElementById("enddate").disabled = true;
    document.getElementById("enddate").type = "text";
    document.forms["addProjectForm"]["enddate"].value = "Till Now";
  } else {
    document.getElementById("enddate").disabled = false;
    document.getElementById("enddate").type = "date";
  }
}
function addProjectModalvalidate() {
  var title = document.forms["addProjectForm"]["title"].value;
  var role = document.forms["addProjectForm"]["role"].value;
  var startdate = document.forms["addProjectForm"]["startdate"].value;
  var enddate = document.forms["addProjectForm"]["enddate"].value;
  var githuburl = document.forms["addProjectForm"]["githuburl"].value;
  var description = document.forms["addProjectForm"]["description"].value;

  if (title.length < 4) {
    alert("Project Name is too short !");
    return false;
  }
  if (role.length < 4) {
    alert("Project Role is too short !");
    return false;
  }
  if (skilldescription.length < 4) {
    alert("Description is too short !");
    return false;
  }
  if (startdate > enddate) {
    alert("Start Date cannot be ahead of End Date !");
    return false;
  }
  if (
    !githuburl.match(
      "http(s)?://.)?(www.)?[-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&=]*"
    )
  ) {
    alert("Not a valid Git Repository URL !");
    return false;
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

  if (achievementname.length < 4) {
    alert("Achievement Name is too short !");
    return false;
  }
  if (achievementnameplatform.length < 4) {
    alert("Achievement Platform is too short !");
    return false;
  }
  if (achievementnameserial.length < 4) {
    alert("Achievement ID is too short !");
    return false;
  }
  if (projectdescription.length < 4) {
    alert("Achievement description is too short !");
    return false;
  }
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
