var coll = document.getElementsByClassName("faq-btn");
var i;
for (i = 0; i < coll.length; i++) {
coll[i].addEventListener("click", function() {
var id = this.getAttribute('data-target');
var content = document.getElementById(id);
if (content.style.maxHeight){
 this.style.transform="rotate(0deg)";
content.style.maxHeight = null;
} else {
 this.style.transform="rotate(180deg)";
content.style.maxHeight = content.scrollHeight + "px";
} 
});
}