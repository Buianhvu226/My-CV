async function loadTemplate(url, containerId) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const content = await response.text();
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = content;
    } else {
      console.error(`Container with id "${containerId}" not found.`);
    }
  } catch (error) {
    console.error("Error loading template:", error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<p class="text-red-500">Error loading content.</p>`;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadTemplate("templates/projects.html", "projects-container");
  loadTemplate("templates/achievements.html", "achievements-container");
});
