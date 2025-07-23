export class TabSystem {
  constructor(
    buttonSelector,
    contentSelector,
    initialTab,
    templatePrefix = ""
  ) {
    this.tabButtons = document.querySelectorAll(buttonSelector);
    this.tabContent = document.querySelector(contentSelector);
    this.initialTab = initialTab;
    this.templatePrefix = templatePrefix;
    this.init();
  }

  async loadTemplate(templateName) {
    try {
      const response = await fetch(
        `templates/${this.templatePrefix}${templateName}.html`
      );
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      return await response.text();
    } catch (error) {
      console.error("Error loading template:", error);
      return `<p class="text-red-500">Error loading ${templateName} content</p>`;
    }
  }

  async switchTab(tabId) {
    this.tabButtons.forEach((btn) => {
      btn.classList.remove("active");
      btn.classList.remove("bg-yellow-400");
      btn.classList.add("bg-opacity-20");
    });

    const activeButton = document.querySelector(`[data-tab="${tabId}"]`);
    if (activeButton) {
      activeButton.classList.add("active");
      activeButton.classList.add("bg-yellow-400");
      activeButton.classList.add("bg-opacity-20");
    }

    const content = await this.loadTemplate(tabId);
    this.tabContent.style.opacity = "0";
    setTimeout(() => {
      this.tabContent.innerHTML = content;
      this.tabContent.style.opacity = "1";
    }, 200);
  }

  init() {
    if (this.tabButtons.length === 0 || !this.tabContent) {
      return;
    }
    this.switchTab(this.initialTab);
    this.tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab");
        this.switchTab(tabId);
      });
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new TabSystem(".tab-btn", ".tab-content", "overview");
  new TabSystem(
    ".exp-tab-btn",
    ".exp-tab-content",
    "dac",
    "experience-"
  );
});
