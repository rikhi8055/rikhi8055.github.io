document.addEventListener("DOMContentLoaded", function () {
  const animatedElements = document.querySelectorAll(".animated");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  });

  animatedElements.forEach((element) => {
    observer.observe(element);
  });

  (function () {
    "use strict";

    // Fetch all the forms we want to apply custom validation to
    const forms = document.querySelectorAll(".needs-validation");

    // Loop over them and prevent submission if invalid
    Array.from(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          if (!form.checkValidity()) {
            event.preventDefault();
            event.stopPropagation();
          } else {
            event.preventDefault(); // Prevent form from redirecting
            submitForm(); // Call the submit function
          }

          form.classList.add("was-validated");
        },
        false,
      );
    });
  })();

  function submitForm() {
    const formData = new FormData(
      document.getElementById("auditForm-design-audit"),
    );
    fetch("send_email.php", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        const notification = document.getElementById("notification");
        notification.classList.remove("alert-success", "alert-danger");
        if (data.success) {
          notification.textContent = "Your request has been sent successfully!";
          notification.classList.add("alert-success");
        } else {
          notification.textContent =
            "There was an error sending your request. Please try again later.";
          notification.classList.add("alert-danger");
        }
        notification.style.display = "block";
      })
      .catch((error) => {
        const notification = document.getElementById("notification");
        notification.textContent =
          "There was an error sending your request. Please try again later.";
        notification.classList.remove("alert-success");
        notification.classList.add("alert-danger");
        notification.style.display = "block";
      });
  }

  const toggler = document.querySelector(".navbar-toggler");
  const navbarCollapse = document.querySelector("#navbarsExample09");

  // Ensure correct state on load
  if (!navbarCollapse.classList.contains("show")) {
    toggler.classList.add("collapsed");
    toggler.setAttribute("aria-expanded", "false");
  }

  const toolsSection = document.querySelector(".tools-section");
  const toolItems = document.querySelectorAll(".tool-item");

  // Store the hardcoded positions
  const positions = [
    { top: "10%", left: "5%" },
    { top: "20%", left: "30%" },
    { top: "44%", left: "25%" },
    { top: "25%", left: "70%" },
    { top: "24%", left: "85%" },
    { top: "0%", left: "100%" },
    { top: "45%", left: "75%" },
    { top: "63%", left: "85%" },
    { top: "65%", left: "30%" },
    { top: "82%", left: "20%" },
    { top: "80%", left: "100%" },
    { top: "44%", left: "8%" },
    { top: "63%", left: "0%" },
    { top: "63%", left: "70%" },
  ];

  function updatePositions() {
    const rect = toolsSection.getBoundingClientRect();
    const windowHeight =
      window.innerHeight || document.documentElement.clientHeight;
    const scrollProgress = Math.min(
      Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
      1,
    );

    toolItems.forEach((item, index) => {
      const startPosition = { top: 50, left: 50 };
      const endPosition = positions[index];

      const top =
        startPosition.top +
        (parseFloat(endPosition.top) - startPosition.top) * scrollProgress;
      const left =
        startPosition.left +
        (parseFloat(endPosition.left) - startPosition.left) * scrollProgress;

      item.style.transform = `translate(-50%, -50%) translate(${left}%, ${top}%)`;
    });

    if (scrollProgress > 0) {
      toolsSection.classList.add("visible");
    } else {
      toolsSection.classList.remove("visible");
    }
  }

  window.addEventListener("scroll", updatePositions);
  updatePositions(); // Initial call

  const slider = document.querySelector(".slider");
  const sliderContainer = document.querySelector(".slider-container");

  const duplicateSliderContent = () => {
    const sliderWidth = slider.scrollWidth;
    const containerWidth = sliderContainer.offsetWidth;

    // Duplicate images to cover at least double the container's width
    while (slider.scrollWidth < containerWidth * 4) {
      slider.innerHTML += slider.innerHTML;
    }
  };

  duplicateSliderContent(); // Duplicate images for seamless scrolling
});
