window.addEventListener("load", () => {
  const menuButton = document.getElementById("menu");
  const navList = document.querySelector("nav ul");

  menuButton.addEventListener("click", () => {
    navList.classList.toggle("hide");
  });

  function handleResize() {
    if (window.innerWidth > 1000) {
      navList.classList.remove("hide");
    } else {
      navList.classList.add("hide");
    }
  }

  function viewerTemplate(pic, alt) {
    return `
      <div class="viewer">
        <button class="close-viewer">X</button>
        <img src="${pic}" alt="${alt}">
      </div>`;
  }

  function viewHandler(event) {
    const clicked = event.target;
    if (clicked.tagName === "IMG") {
      const src = clicked.getAttribute("src");
      const base = src.split("-")[0];
      const fullPath = base + "-full.jpeg";
      const alt = clicked.alt;

      const html = viewerTemplate(fullPath, alt);
      document.body.insertAdjacentHTML("afterbegin", html);

      document.querySelector(".close-viewer").addEventListener("click", closeViewer);
    }
  }

  function closeViewer() {
    const viewer = document.querySelector(".viewer");
    if (viewer) viewer.remove();
  }

  document.querySelector(".gallery").addEventListener("click", viewHandler);

  handleResize();
  window.addEventListener("resize", handleResize);

  // Manual attach close button for static modal test
  const closeBtn = document.querySelector(".close-viewer");
  if (closeBtn) {
    closeBtn.addEventListener("click", closeViewer);
  }
});
