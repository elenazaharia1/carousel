const track = document.querySelector(".carousel-track");
const slides = Array.from(track.children);

const nextBtn = document.querySelector(".btn--right");
const prevBtn = document.querySelector(".btn--left");

const dotsNav = document.querySelector(".carousel-nav");
const dots = Array.from(dotsNav.children);
console.log(track, slides);

const slideSize = slides[0].getBoundingClientRect();
console.log(slideSize);
const slideWidth = slideSize.width;
console.log(slideWidth);
//getBoundingClientRect() gets the length and height of a slide, in my case

//arrange the slides next to one another

// slides[0].style.left = 0;
// slides[1].style.left = slideWidth + "px";
// slides[2].style.left = slideWidth * 2 + "px";

const setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};

// slides.forEach((slide, index) => {
//   slide.style.left = slideWidth * index + "px";
// });

slides.forEach(setSlidePosition);

//when I click on the right btn, move slides to the right

nextBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const amountToMove = nextSlide.style.left;
  // //move to the next slide
  // console.log(amountToMove);
  // track.style.transform = "translateX(-" + amountToMove + ")";
  // currentSlide.classList.remove("current-slide");
  // nextSlide.classList.add("current-slide");

  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
});

prevBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  // const amountToMove = prevSlide.style.left;
  // // move to the next slide
  // console.log(amountToMove);
  // track.style.transform = "translateX(-" + amountToMove + ")";

  // currentSlide.classList.remove("current-slide");
  // prevSlide.classList.add("current-slide");
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  updateDots(currentDot, prevDot);
  moveToSlide(track, currentSlide, prevSlide);
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
});

const moveToSlide = (track, currentSlide, targetSlide) => {
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};

dotsNav.addEventListener("click", (e) => {
  // what indicator was clicked on
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  console.log(targetIndex);
  const targetSlide = slides[targetIndex]; //asa se leaga numarul slideului cu numarul dot

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  // currentDot.classList.remove("current-slide");
  // targetDot.classList.add("current-slide");
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
});

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if (targetIndex === 0) {
    prevBtn.classList.add("is-hidden");
    nextBtn.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevBtn.classList.remove("is-hidden");
    nextBtn.classList.add("is-hidden");
  } else {
    prevBtn.classList.remove("is-hidden");
    nextBtn.classList.remove("is-hidden");
  }
};
