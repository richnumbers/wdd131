const outputElement = document.querySelector("#articles");

articles.forEach(article => {
  const articleElement = document.createElement("article");
  articleElement.classList.add("blog-article");

  const articleHTML = `
    <div class="meta">
      <p>${article.date}</p>
      <p>${article.ages}</p>
      <p>${article.genre}</p>
      <p>${article.stars}</p>
    </div>
    <div class="content">
      <h2>${article.title}</h2>
      <img src="${article.imgSrc}" alt="${article.imgAlt}">
      <p>${article.description}</p>
    </div>
  `;

  articleElement.innerHTML = articleHTML;
  outputElement.appendChild(articleElement);
});
