document.addEventListener("scroll", () => {
  const reveals = document.querySelectorAll(".reveal");
  const windowHeight = window.innerHeight;
  
  reveals.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < windowHeight * 0.85) {
      el.classList.add("visible");
    }
  });
});
