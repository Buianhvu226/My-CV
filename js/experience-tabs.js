class ExperienceTabs {
  constructor() {
    this.tabButtons = document.querySelectorAll(".exp-tab-btn");
    this.tabContent = document.querySelector(".exp-tab-content");
    this.init();
  }

  async loadTemplate(tabId) {
    try {
      const response = await fetch(`templates/experience-${tabId}.html`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const content = await response.text();
      if (!content) {
        throw new Error("Empty content");
      }
      return content;
    } catch (error) {
      console.error("Error loading template:", error);
      return `<div class="p-4 text-red-500">
                Failed to load ${tabId} content. 
                <br>Error: ${error.message}
                <br>Please check console for details.
              </div>`;
    }
  }

  async switchTab(tabId) {
    try {
      // Update active state and colors
      this.tabButtons.forEach((button) => {
        if (button.getAttribute("data-tab") === tabId) {
          // Active tab styling
          button.classList.add(
            "active",
            "bg-yellow-400",
            "bg-opacity-20",
            "text-yellow-400"
          );
          button.classList.remove("text-gray-300");
        } else {
          // Inactive tab styling
          button.classList.remove(
            "active",
            "bg-yellow-400",
            "bg-opacity-20",
            "text-yellow-400"
          );
          button.classList.add("text-gray-300");
        }
      });

      // Load and display content with fade animation
      const content = await this.loadTemplate(tabId);
      this.tabContent.style.opacity = "0";
      await new Promise((resolve) => setTimeout(resolve, 200));
      this.tabContent.innerHTML = content;
      this.tabContent.style.opacity = "1";
    } catch (error) {
      console.error("Error switching tab:", error);
    }
  }

  init() {
    // Show initial tab
    this.switchTab("sucodev");

    // Add click listeners
    this.tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");
        this.switchTab(tabId);
      });
    });
  }
}

// Initialize when DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  new ExperienceTabs();
});
