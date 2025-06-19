// Open modal with overlay effect and ensure it appears on top
function openModal(modalId) {
  document.getElementById(modalId).style.display = "block";
  document.getElementById("modalOverlay").style.display = "block";
}

// Close modal and remove overlay
function closeModal(modalId) {
  document.getElementById(modalId).style.display = "none";
  document.getElementById("modalOverlay").style.display = "none";
}

// Close modal when clicking outside
window.onclick = function(event) {
  let modals = document.querySelectorAll(".custom-modal");
  modals.forEach(modal => {
    if (event.target == document.getElementById("modalOverlay")) {
      modal.style.display = "none";
      document.getElementById("modalOverlay").style.display = "none";
    }
  });
};

// Slider Functionality (Now moves one image at a time, centered)
function moveSlide(sliderId, step) {
  let slider = document.getElementById(sliderId);
  let images = slider.querySelectorAll("img");
  let totalImages = images.length;
  let currentIndex = parseInt(slider.getAttribute("data-index")) || 0;

  currentIndex += step;
  if (currentIndex < 0) {
    currentIndex = totalImages - 1;
  } else if (currentIndex >= totalImages) {
    currentIndex = 0;
  }

  let newTranslateX = -currentIndex * 100; // Move exactly one image at a time
  slider.style.transform = `translateX(${newTranslateX}%)`;
  slider.setAttribute("data-index", currentIndex);
}
