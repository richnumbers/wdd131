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

  window.addEventListener("resize", handleResize);
  handleResize();

  const gallery = document.querySelector(".gallery");

  gallery.addEventListener("click", (event) => {
    const clickedImage = event.target.closest("img");
    if (!clickedImage) return;

    const src = clickedImage.getAttribute("src");
    const alt = clickedImage.getAttribute("alt");
    const baseName = src.split("-")[0];
    const fullSrc = baseName + "-full.jpeg";
    console.log("Full image path:", fullSrc); // for debugging

    const modal = document.createElement("dialog");
    modal.innerHTML = `
      <div class="viewer">
        <button class="close-viewer">X</button>
        <img src="${fullSrc}" alt="${alt}">
      </div>
    `;
    document.body.appendChild(modal);
    modal.showModal();

    const closeBtn = modal.querySelector(".close-viewer");
    closeBtn.addEventListener("click", () => {
      modal.close();
      modal.remove();
    });

    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.close();
        modal.remove();
      }
    });
  });
});
