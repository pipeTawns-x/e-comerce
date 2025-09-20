// Gestión del menú hamburguesa
class MenuManager {
  constructor() {
    this.menuButton = document.getElementById('hamburgerMenuButton');
    this.closeButton = document.getElementById('closeHamburgerMenu');
    this.menu = document.getElementById('hamburgerMenu');
    this.overlay = document.getElementById('hamburgerMenuOverlay');
    this.categoryButtons = document.querySelectorAll('.hamburger-menu__category');
    this.menuSections = document.querySelectorAll('.hamburger-menu__section');
    
    this.init();
  }
  
  init() {
    // Event listeners
    this.menuButton.addEventListener('click', () => this.openMenu());
    this.closeButton.addEventListener('click', () => this.closeMenu());
    this.overlay.addEventListener('click', () => this.closeMenu());
    
    // Cambiar categorías
    this.categoryButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.changeCategory(category);
      });
    });
    
    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.menu.classList.contains('active')) {
        this.closeMenu();
      }
    });
  }
  
  openMenu() {
    this.menu.classList.add('active');
    this.overlay.classList.add('active');
    document.body.classList.add('menu-open');
  }
  
  closeMenu() {
    this.menu.classList.remove('active');
    this.overlay.classList.remove('active');
    document.body.classList.remove('menu-open');
  }
  
  changeCategory(category) {
    // Actualizar botones activos
    this.categoryButtons.forEach(button => {
      if (button.dataset.category === category) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });
    
    // Mostrar sección correspondiente
    this.menuSections.forEach(section => {
      if (section.dataset.category === category) {
        section.classList.add('active');
      } else {
        section.classList.remove('active');
      }
    });
  }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  new MenuManager();
});