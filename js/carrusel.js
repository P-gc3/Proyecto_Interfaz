// ==== CARRUSEL MUNDIAL ====

const slides = document.querySelectorAll('.slide');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');

let currentIndex = 0;
let autoPlay = true; // cambiar a false si no quieres auto-rotación
const intervalTime = 5000; // 5 segundos
let slideInterval;

function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

function nextSlide() {
  currentIndex++;
  if (currentIndex > slides.length - 1) currentIndex = 0;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex--;
  if (currentIndex < 0) currentIndex = slides.length - 1;
  showSlide(currentIndex);
}

// Eventos de botones
nextBtn.addEventListener('click', () => {
  nextSlide();
  if (autoPlay) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

prevBtn.addEventListener('click', () => {
  prevSlide();
  if (autoPlay) {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, intervalTime);
  }
});

// Auto carrusel
if (autoPlay) {
  slideInterval = setInterval(nextSlide, intervalTime);
}
