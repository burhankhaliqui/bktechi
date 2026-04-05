const menuToggle = document.getElementById("menuToggle");
const navRight = document.getElementById("navRight");
const navLinks = document.querySelectorAll("#navMenu a");

if (menuToggle && navRight) {
  menuToggle.addEventListener("click", function () {
    const isOpen = navRight.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (window.innerWidth <= 1024) {
        navRight.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  document.addEventListener("click", function (event) {
    const clickedInsideMenu = navRight.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);

    if (!clickedInsideMenu && !clickedToggle && window.innerWidth <= 1024) {
      navRight.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 1024) {
      navRight.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    }
  });
}
