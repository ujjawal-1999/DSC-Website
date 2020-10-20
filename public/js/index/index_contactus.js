document.querySelector("#file1").onchange = function () {
    document.querySelector("#file-name").textContent = this.files[0].name;
}