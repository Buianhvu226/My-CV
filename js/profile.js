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
    element.innerHTML = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    element.innerHTML = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }

  let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

  if (!isDeleting && charIndex === currentPhrase.length) {
    typeSpeed = pauseDuration;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }

  setTimeout(typeEffect, typeSpeed);
}

window.onload = typeEffect;
