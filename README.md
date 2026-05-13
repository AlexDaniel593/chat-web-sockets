# Chat Web Sockets
Desarrollado por Daniel Guaman para la materia de `30732-APLICACIONES DISTRIBUIDAS` de la UFA-ESPE

Aplicación de chat en tiempo real construida con Node.js y WebSockets.

## Características

- Comunicación en tiempo real mediante WebSockets.
- Registro e inicio de sesión de usuarios.
- Interfaz web responsiva y amigable (HTML, CSS, JS).

## Requisitos previos

- [Node.js](https://nodejs.org/) instalado en tu sistema.

## Instalación y ejecución

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Inicia el servidor:
   ```bash
   npm start
   ```
   
3. Abre tu navegador y accede a `http://localhost:3000`

## Estructura del proyecto

- `src/` - Contiene el código fuente de la aplicación.
  - `public/` - Archivos estáticos como estilos (CSS), imágenes y scripts del cliente (JS).
  - `views/` - Páginas HTML (`index.html`, `register.html`).
  - `routes/` - Rutas de la API/Servidor.
  - `middleware/` - Middlewares (ej. verificación de sesión).
  - `realTimeServer.js` - Lógica de configuración y eventos de los WebSockets.
  - `index.js` - Punto de entrada principal del servidor.


## Video demostracion
   

https://github.com/user-attachments/assets/c242942c-541d-4d86-9228-774bfff3d975


