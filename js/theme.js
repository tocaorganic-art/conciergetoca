// Theme Manager - Dark/Light Mode
class ThemeManager {
  constructor() {
    this.theme = 'light';
    this.init();
  }

  init() {
    // Carregar tema salvo ou usar preferência do sistema
    const saved = localStorage.getItem('theme');
    const preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    this.theme = saved || preferred;
    this.applyTheme();
    this.setupToggleButton();
  }

  applyTheme() {
    document.documentElement.setAttribute('data-theme', this.theme);
    localStorage.setItem('theme', this.theme);
  }

  toggle() {
    this.theme = this.theme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    this.updateToggleButton();
  }

  setupToggleButton() {
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.addEventListener('click', () => this.toggle());
      this.updateToggleButton();
    }
  }

  updateToggleButton() {
    const button = document.getElementById('theme-toggle');
    if (button) {
      button.textContent = this.theme === 'light' ? '🌙' : '☀️';
      button.title = `Mudar para tema ${this.theme === 'light' ? 'escuro' : 'claro'}`;
    }
  }
}

// Inicializar ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
  new ThemeManager();
});
