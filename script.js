// Load blogs in a field (field.html)
const params = new URLSearchParams(window.location.search);
const field = params.get("name");
if (field) {
  document.getElementById("field-title").textContent = field.toUpperCase() + " Studies";
  const blogContainer = document.getElementById("blogs");

  let index = 1;
  async function loadBlogs() {
    while (true) {
      try {
        const response = await fetch(`${field}/${index}.txt`);
        if (!response.ok) break;
        const text = await response.text();

        const div = document.createElement("div");
        div.className = "blog";
        div.innerHTML = `<h2>Study ${index}</h2><p>${text.replace(/\n/g, "<br>")}</p>`;
        blogContainer.appendChild(div);

        index++;
      } catch {
        break;
      }
    }
  }
  loadBlogs();
}

// Search across all fields (search.html)
const query = params.get("q");
if (query) {
  const resultsDiv = document.getElementById("results");
  const fields = ["physics", "chemistry", "biology"]; // Add more folders here

  async function searchBlogs() {
    for (let field of fields) {
      let index = 1;
      while (true) {
        try {
          const response = await fetch(`${field}/${index}.txt`);
          if (!response.ok) break;
          const text = await response.text();

          if (text.toLowerCase().includes(query.toLowerCase())) {
            const div = document.createElement("div");
            div.className = "blog";
            div.innerHTML = `
              <h2><a href="field.html?name=${field}#study-${index}">${field.toUpperCase()} - Study ${index}</a></h2>
              <p>${text.substring(0, 150).replace(/\n/g, " ")}...</p>`;
            resultsDiv.appendChild(div);
          }

          index++;
        } catch {
          break;
        }
      }
    }

    if (!resultsDiv.hasChildNodes()) {
      resultsDiv.innerHTML = `<p>No results found for "<b>${query}</b>"</p>`;
    }
  }

  searchBlogs();
}
