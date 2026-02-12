# fs-frontend

Este proyecto es una aplicación web moderna y responsive desarrollada con **Angular v20**, diseñada para la gestión de cuentas y clientes. La aplicación destaca por su arquitectura modular, accesibilidad y diseño adaptativo gracias a la integración de **Bootstrap**.

El backend se encuentra en el repositorio [fs-backend](https://github.com/jleon253/fs-backend).

## KeyNotes
* Explicación de proyecto en formato .pdf: [Click aqui para ver](/KeyNote/Kata-Keynote.pdf)
* Respuestas a 4 preguntas sobre desplegar en AWS:
![Respuestas AWS](/KeyNote/Respuestas_AWS.png)

## 🚀 Características Principales

*   **Diseño Responsive**: Interfaz adaptable a diferentes tamaños de pantalla (móvil, tablet, escritorio) utilizando el sistema de grillas de Bootstrap.
*   **Accesibilidad**: Cumplimiento de estándares de accesibilidad web mediante componentes nativos y utilidades de Bootstrap.
*   **Internacionalización (i18n)**: Soporte multi-idioma implementado con `@ngx-translate`.
*   **Arquitectura Modular**: Organización clara del código en módulos Core, Features y Shared para facilitar la escalabilidad y el mantenimiento.
*   **Gestión de Estado y UX**: Feedback al usuario mediante notificaciones (Toasts) y servicios de UI centralizados.

## 🛠 Tech Stack & Dependencias

El proyecto utiliza las siguientes tecnologías y librerías clave:

### Core
*   **Angular**: `^20.3.0` - Framework principal.
*   **RxJS**: `~7.8.0` - Programación reactiva.
*   **TypeScript**: `~5.9.2` - Lenguaje base.

### UI & Estilos
*   **Bootstrap**: `^5.3.6` - Framework CSS para estilos y responsividad.
*   **NG Bootstrap**: `^19.0.1` - Componentes de Bootstrap para Angular.
*   **Ng Icons**: `^33.1.0` - Librería de iconos (`bootstrap-icons`).
*   **Ngx Toastr**: `^19.1.0` - Notificaciones tipo toast.

### Utilidades
*   **Ngx Translate**: `^17.0.0` - Motor de internacionalización.

## 📂 Estructura del Proyecto

El scaffolding del proyecto sigue las mejores prácticas de Angular, separado en capas lógicas:

### Core (`src/app/core`)
Contiene la lógica de negocio singleton y definiciones de datos.
*   **Services**:
    *   `AccountService`: Gestión de datos de cuentas.
    *   `CustomerService`: Gestión de datos de clientes.
    *   `UiService`: Manejo de estado de la interfaz.
*   **Interfaces**: Definiciones como `common.interface.ts`.
*   **Types**: Tipos específicos como `account.type.ts`.

### Features (`src/app/features`)
Módulos funcionales de la aplicación.
*   **Accounts**:
    *   `AccountList`: Listado de cuentas.
    *   `AccountManagement`: Gestión y administración de cuentas.
*   **Customers**:
    *   `CustomerList`: Listado de clientes.
    *   `CustomerForm`: Formulario de creación/edición.
    *   `CustomerManagement`: Vista principal de gestión de clientes.

### Shared (`src/app/shared`)
Componentes reutilizables en toda la aplicación.
*   **Components**:
    *   `Layout`: Estructura base de las páginas.
    *   `Header` & `Sidebar`: Navegación principal.
    *   `AccountRowCard` & `CustomerMiniCard`: Tarjetas de presentación de datos.
    *   `PageSizeSelector`: Control de paginación.

### Internacionalización
* Los archivos de traducción se encuentran en `public/i18n/`, permitiendo la carga dinámica de idiomas para la UI.
* Para los textos de archivos .ts, se creu una utilidad en `src/utils/i18n.ts` que se invoca de la siguiente manera: `t('path.to.text', { variable: 'value' })`.

## ⚡ Instalación y Ejecución

Para correr este proyecto localmente, asegúrate de tener **Node.js** instalado.

1.  **Instalar dependencias**:
    ```bash
    npm install
    ```

2.  **Servidor de Desarrollo**:
    Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias algún archivo fuente.
    ```bash
    npm start
    # o ejecutar directamente
    ng serve
    ```

3.  **Build de Producción**:
    Los artefactos de construcción se almacenarán en el directorio `dist/`.
    ```bash
    npm run build
    ```

4.  **Ejecutar Tests**:
    Ejecuta las pruebas unitarias vía Karma.
    ```bash
    npm test
    ```

## 🤝 Contribución

Si deseas contribuir, asegúrate de seguir los lineamientos de estilo de código definidos en el proyecto y verificar que todos los tests pasen antes de enviar un Pull Request.
