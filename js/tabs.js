class TabSystem {
  constructor() {
    this.tabButtons = document.querySelectorAll(".tab-btn");
    this.tabContent = document.querySelector(".tab-content");
    this.init();
  }

  async loadTemplate(templateName) {
    try {
      const response = await fetch(`templates/${templateName}.html`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.text();
    } catch (error) {
      console.error("Error loading template:", error);
      return `<p class="text-red-500">Error loading ${templateName} content</p>`;
    }
  }

  async switchTab(tabId) {
    // Remove active class from all buttons
    this.tabButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.classList.remove("bg-yellow-400");
      btn.classList.add("bg-opacity-20");
    });

    // Add active class to clicked button
    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeButton) {
      activeButton.classList.add("active");
      activeButton.classList.add("bg-yellow-400");
      activeButton.classList.add("bg-opacity-20");
    }

    // Load and display content with fade animation
    const content = await this.loadTemplate(tabId);
    this.tabContent.style.opacity = "0";
    setTimeout(() => {
      this.tabContent.innerHTML = content;
      this.tabContent.style.opacity = "1";
    }, 200);
  }

  init() {
    // Show initial tab
    this.switchTab("overview");

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
  new TabSystem();
});
