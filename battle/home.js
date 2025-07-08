document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("search-form");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");

  let monsters = [];
  let shopItems = [];

  // Load JSON data
  Promise.all([
    fetch("monsters.json").then(res => res.json()),
    fetch("shop.json").then(res => res.json())
  ]).then(([monstersData, shopData]) => {
    monsters = monstersData;
    shopItems = shopData;
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = input.value.toLowerCase();
    results.innerHTML = "";

    if (!keyword.trim()) {
      results.textContent = "Please enter a search term.";
      return;
    }

    const matchedMonsters = monsters.filter(mon =>
      mon.name.toLowerCase().includes(keyword) || 
      (mon.description && mon.description.toLowerCase().includes(keyword))
    );

    const matchedItems = shopItems.filter(item =>
      item.name.toLowerCase().includes(keyword) || 
      item.description.toLowerCase().includes(keyword)
    );

    if (matchedMonsters.length === 0 && matchedItems.length === 0) {
      results.textContent = "No results found.";
      return;
    }

    if (matchedMonsters.length > 0) {
      results.innerHTML += `<h3>Monsters</h3>`;
      matchedMonsters.forEach(mon => {
        results.innerHTML += `<p><strong>${mon.name}</strong>: ${mon.hp} HP, ${mon.attack || '???'} ATK, ${mon.defense} DEF</p>`;
      });
    }

    if (matchedItems.length > 0) {
      results.innerHTML += `<h3>Shop Items</h3>`;
      matchedItems.forEach(item => {
        results.innerHTML += `<p><strong>${item.name}</strong>: ${item.description} (Cost: ${item.cost}g)</p>`;
      });
    }
  });
});
