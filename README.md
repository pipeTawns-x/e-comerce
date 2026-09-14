# FrayLE Shop: e-commerce de streetwear

![FrayLE Shop](https://img.shields.io/badge/FrayLE-Shop-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![SASS](https://img.shields.io/badge/SASS-CC6699?logo=sass&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?logo=bootstrap&logoColor=white)
![Responsive](https://img.shields.io/badge/Responsive-Design-green)

FrayLE Shop es una práctica que hice en EBAC y mi primer e-commerce completo: una tienda de streetwear con menú por categorías y un carrito que aplica descuento según cuántos artículos llevas.

Me sirvió de base para crear después [Carni-mvp](https://github.com/pipeTawns-x/Landingpages-Carni.pwa), la tienda en línea con la que llevé un negocio real al mundo digital.

## Características

- Diseño responsivo, pensado primero para celular.
- Menú hamburguesa con categorías y subcategorías.
- Carrito de compras con descuento del 10 % desde tres artículos y del 12 % desde cuatro.
- El carrito se abre en una ventana modal y muestra avisos en pantalla al usarlo.
- Imágenes con carga diferida (`loading="lazy"`).

## Capturas de pantalla

![Home de FrayLE Shop](docs/screenshots/home.jpg)

Home de FrayLE Shop con el catálogo y el carrito.

## Tecnologías

- HTML5 con estructura semántica.
- Sass (SCSS) organizado con la metodología BEM.
- JavaScript (ES6+) para el carrito, el menú y los efectos de scroll.
- Bootstrap 5.3 para la rejilla y los componentes.
- Feather Icons para los íconos.
- GitHub Pages para el despliegue.

## Estructura del proyecto

```
e-comerce/
├── css/
│   ├── base/          (_reset.scss, _variables.scss)
│   ├── components/    (_cards.scss, _hamburger-menu.scss, _modal.scss)
│   ├── layout/        (_grid.scss, _header.scss)
│   ├── styles.scss
│   └── styles.css
├── docs/screenshots/  (home.jpg)
├── img/               (logo, imágenes y video del logo)
├── js/
│   ├── main.js
│   └── modules /      (cartManager.js, header-effects.js, menuManager.js, scrollManager.js)
├── index.html
└── README.md
```

## Instalación y uso

1. Clona el repositorio:

   ```bash
   git clone https://github.com/pipeTawns-x/e-comerce.git
   ```

2. Entra a la carpeta:

   ```bash
   cd e-comerce
   ```

3. Ábrelo en el navegador:

   - Abre `index.html` directamente, o
   - levanta un servidor local:

   ```bash
   # Con Python
   python -m http.server 8000

   # Con Node.js
   npx serve
   ```

## Ejemplo de uso

1. Abre la [demo](https://pipetawns-x.github.io/e-comerce/) o tu copia local.
2. Agrega tres artículos al carrito: el resumen aplica un 10 % de descuento.
3. Agrega un cuarto artículo: el descuento sube al 12 % y el total se recalcula solo.

## Despliegue

El sitio está publicado en GitHub Pages: [pipetawns-x.github.io/e-comerce](https://pipetawns-x.github.io/e-comerce/)

## Funcionalidades en JavaScript

1. Carrito (`cartManager.js`):
   - Agregar y quitar productos.
   - Cálculo automático del total y contador de artículos.
   - Descuento escalonado: 10 % desde tres artículos y 12 % desde cuatro.
   - Avisos en pantalla con las acciones del carrito.
2. Menú (`menuManager.js`): abre y cierra el menú hamburguesa con sus categorías.
3. Scroll (`scrollManager.js`): cambia el estilo de la página al pasar cierta altura de scroll.

## Metodología

- BEM para nombrar las clases de CSS.
- Mobile-first: primero el celular, después pantallas grandes.
- SCSS dividido en base, componentes y layout.
- HTML semántico.

## Compatibilidad

Pensado para las versiones recientes de Chrome, Firefox, Safari y Edge, y para celulares con iOS y Android.

## Contribuciones

Es un proyecto personal de práctica. Si ves algo que se pueda mejorar, abre un issue o un pull request.

## Licencia

Por ahora el proyecto no tiene una licencia definida.

## Autor

Felipe Torres ([@pipeTawns-x](https://github.com/pipeTawns-x))

## Próximas mejoras

Cosas que me gustaría sumar más adelante: pasarela de pagos, cuentas de usuario, panel de administración, modo oscuro, búsqueda con filtros y reseñas de productos.
