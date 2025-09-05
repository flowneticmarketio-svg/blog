const params = new URLSearchParams(window.location.search);
const field = params.get("name");
const topic = params.get("topic");

// Topics per subject
const topicMap = {
  physics: ["quantum", "relativity", "thermodynamics"],
  chemistry: ["organic", "inorganic", "physical"],
  biology: ["genetics", "evolution", "ecology"],
  maths: ["quadratic", "functions", "matrices"]
};

// FIELD PAGE → show topics
if (field && !topic) {
  document.getElementById("field-title").textContent = field.toUpperCase();
  const list = document.getElementById("topics");
  topicMap[field].forEach(t => {
    const li = document.createElement("li");
    li.innerHTML = `<a href="topic.html?name=${field}&topic=${t}">${t}</a>`;
    list.appendChild(li);
  });
}

// TOPIC PAGE → show studies
if (field && topic) {
  document.getElementById("topic-title").textContent = field.toUpperCase() + " - " + topic;
  const blogContainer = document.getElementById("blogs");

  let index = 1;
  async function loadBlogs() {
    while (true) {
      try {
        const response = await fetch(`${field}/${topic}/${index}.txt`);
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
