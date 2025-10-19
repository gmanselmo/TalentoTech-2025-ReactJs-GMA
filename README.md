# TalentoTech-2025-ReactJs-GMA
# SportStore - Tienda Online de Artículos Deportivos

## 📖 Descripción del Proyecto

**SportStore** es una plataforma de e-commerce completamente funcional, desarrollada como parte de la iniciativa de Talento Tech. El proyecto simula una tienda online de artículos deportivos, permitiendo a los usuarios explorar un catálogo de productos, ver detalles, gestionar un carrito de compras y realizar un checkout simulado.

Además, cuenta con un panel de administración protegido para la gestión de productos, accesible solo para usuarios autenticados. La aplicación está construida con **React** y sigue una arquitectura de componentes moderna y escalable.

---

## 🚀 Endpoints de Despliegue

El proyecto se encuentra completamente desplegado y funcional en los siguientes enlaces:

-   **Sitio Web (Frontend):** [`https://talentotech2025.gmatdev.com`](https://talentotech2025.gmatdev.com)
-   **API (Backend):** [`https://talentotech2025-backend.gmatdev.com`](https://talentotech2025-backend.gmatdev.com)

---

## ✨ Características Principales

-   **Catálogo de Productos**: Vista de grilla con todos los productos disponibles, incluyendo precios y descuentos.
-   **Página de Detalles**: Vista detallada para cada producto con descripción, galería de imágenes (simulada) y opciones de compra.
-   **Carrito de Compras Interactivo**: Dropdown en el header que permite añadir, incrementar, decrementar y eliminar productos. El total se actualiza en tiempo real.
-   **Checkout Simulado**: Flujo de compra que vacía el carrito y muestra un mensaje de éxito.
-   **Autenticación de Usuarios**: Sistema de login que protege rutas y muestra contenido condicional (por ejemplo, el panel de administrador).
-   **Panel de Administración Protegido**: Ruta privada (`/admin`) donde un usuario autenticado puede ver todos los productos en un formato de lista para una futura gestión.
-   **Diseño Responsivo**: La interfaz está optimizada para una correcta visualización tanto en dispositivos de escritorio como móviles.
-   **Componentes Reutilizables**: Notificaciones (`ToastAlert`), tarjetas de producto y otros elementos de la UI están construidos como componentes atómicos para máxima reutilización.

---

## 🛠️ Tecnologías Utilizadas

-   **Frontend:**
    -   **React.js**: Biblioteca principal para la construcción de la interfaz de usuario.
    -   **React Router Dom**: Para la gestión de rutas y navegación en la aplicación.
    -   **React Bootstrap**: Framework de UI para un diseño rápido y responsivo.
    -   **Bootstrap Icons**: Para la iconografía de la aplicación.
    -   **Hooks de React (Custom)**: Para la gestión de estado global simulando una store (ej. `useCartStore`, `useAuthStore`).
    -   **Axios**: Para realizar las peticiones HTTP al backend.
-   **Backend:**
    -   realizado en FastApi y deployado en mismo ambiente que el Frontend.
-   **Despliegue:**
    -   Nginx como proxy inverso y Gunicorn como servidor de aplicación WSGI.
---

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura de carpetas basada en **Atomic Design** para organizar los componentes de manera jerárquica y reutilizable:

```
src/
├── assets/         # Imágenes y logos
├── components/
│   ├── atoms/      # Componentes básicos (ToastAlert)
│   ├── molecules/  # Combinación de átomos (CardElement, CartDropdown)
│   ├── organisms/  # Secciones más complejas (NavigationBar, Footer)
│   ├── pages/      # Vistas completas de la aplicación (ProductsPage, CheckoutPage)
│   ├── layouts/    # Estructuras principales de la página (SportStoreLayout)
│   └── hoc/        # Componentes de Orden Superior (ProtectedRoute)
├── stores/         # Hooks personalizados para la gestión de estado global
├── main.jsx        # Componente raíz
└── index.js        # Punto de entrada de la aplicación
```

---

## 💻 Instalación y Uso Local

Para ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clona el repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    ```

2.  **Navega al directorio del proyecto:**
    ```bash
    cd <NOMBRE_DEL_DIRECTORIO>
    ```

3.  **Instala las dependencias:**
    ```bash
    yarn install
    ```

4.  **Ejecuta la aplicación en modo de desarrollo:**
    ```bash
    yarn run dev
    ```
    La aplicación se abrirá automáticamente en [`http://localhost:5173`](http://localhost:5173).

---

## 📜 Scripts Disponibles

-   `yarn run dev`: Inicia la aplicación en modo de desarrollo.
-   `yarn run build`: Compila la aplicación para producción.
-   `yarn run preview`: Sirve la build de producción localmente para previsualización.