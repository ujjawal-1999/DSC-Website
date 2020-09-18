// Custom Image Modal

const images = document.querySelectorAll(".post-images");
const full = document.querySelector(".fullview");
const modal = document.querySelector(".modal");

images.forEach((image) => {
  image.addEventListener("click", (e) => {
    modal.classList.add("modal_open");
    full.src = e.target["attributes"]["data-original"].value;
  });
});

modal.addEventListener("click", (e) => {
  console.log(e.target.classList.contains(".modal_open"));
  modal.classList.remove("modal_open");
});

// // Get DOM Elements
// const modal = document.querySelector('#my-modal');
// const modalBtn = document.querySelector('#modal-btn');
// const closeBtn = document.querySelector('.close');

// // Events
// modalBtn.addEventListener('click', openModal);
// closeBtn.addEventListener('click', closeModal);
// window.addEventListener('click', outsideClick);

// // Open
// function openModal() {
//   modal.style.display = 'block';
// }

// // Close
// function closeModal() {
//   modal.style.display = 'none';
// }

// // Close If Outside Click
// function outsideClick(e) {
//   if (e.target == modal) {
//     modal.style.display = 'none';
//   }
// }

// // Get DOM Elements
// const modal2 = document.querySelector('#my-modal2');
// const modalBtn2 = document.querySelector('#modal-btn2');
// const closeBtn2 = document.querySelector('.close2');

// // Events
// modalBtn2.addEventListener('click', openModal2);
// closeBtn2.addEventListener('click', closeModal2);
// window.addEventListener('click', outsideClick2);

// // Open
// function openModal2() {
//   modal2.style.display = 'block';
// }

// // Close
// function closeModal2() {
//   modal2.style.display = 'none';
// }

// // Close If Outside Click
// function outsideClick2(e) {
//   if (e.target == modal) {
//     modal2.style.display = 'none';
//   }
// }
