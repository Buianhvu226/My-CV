const phrases = [
  "Hi, I'm Bui Anh Vu",
  "I'm an IT Student majoring in Software Engineering",
  "Currently working as an Intern at DAC - Data Technology Vietnam",
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  const element = document.getElementById("typing-text");

  if (isDeleting) {
    // Xóa ký tự
    element.innerHTML = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    // Thêm ký tự
    element.innerHTML = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  // Xác định tốc độ typing
  let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

  // Kiểm tra trạng thái typing
  if (!isDeleting && charIndex === currentPhrase.length) {
    // Hoàn thành typing, bắt đầu xóa sau khoảng thời gian pause
    typeSpeed = pauseDuration;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    // Hoàn thành xóa, chuyển sang phrase tiếp theo
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeEffect, typeSpeed);
}

// Bắt đầu hiệu ứng khi trang load
window.onload = typeEffect;
