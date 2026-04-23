# Rick and Morty Memory Game 🌌

Una aplicación interactiva en **React** que permite a los usuarios autenticarse y poner a prueba su memoria con los personajes del universo de Rick and Morty.

## 🚀 Características Principales

- **Autenticación de Usuario**: Sistema de login para registrar las puntuaciones o el progreso del jugador.
- **Juego de Memoria (Match Pairs)**: Un clásico juego de encontrar las parejas utilizando las imágenes de los personajes de Rick and Morty.
- **Consumo de API**: (Próximamente) Integración con la [Rick and Morty API](https://rickandmortyapi.com/) para obtener cartas dinámicas y variadas.
- **Animaciones e Interfaz Moderna**: Construido pensando en una gran experiencia de usuario, interacciones fluidas y responsive design.

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React + TypeScript
- **Bundler**: Vite
- **Package Manager**: Bun
- **Estilos**: CSS ya que no estoy seguro de si usar TailwindCSS por la recomendacion de la prueba tecnica por lo tanto para evitar usaré CSS.

## 🏗️ Arquitectura y Metodologías

El proyecto sigue estándares estrictos para asegurar mantenibilidad y escalabilidad:

- **Feature-Based Architecture**: Organización por módulos/funcionalidades (ej. `src/features/auth`).
- **Separación de Responsabilidades**: Lógica de negocio separada en Custom Hooks (`useLoginForm.ts`) pura y asilada de los componentes de UI.
- **Componentes UI Reutilizables**: Componentes base compartidos (Botones, Inputs) centralizados en `src/components/ui`.
- **CSS Puro y Metodología BEM**: Estilos escalables usando convención `Block__Element--Modifier` y un estricto sistema de Variables CSS (Custom Properties) sin "magic numbers".

## 📝 Progreso Actual

- [x] **Setup Inicial**: Configuración del proyecto, tipado y variables globales de CSS.
- [x] **UI Components**: Creación de componentes reutilizables base (`Button`, `Input` con toggle de password).
- [x] **Feature - Login**: Implementación de la vista de autenticación (Frontend) basada en el diseño de Figma, validación de formularios y mock-auth.
- [ ] **Feature - Registro**: Próxima implementación de la vista de creación de cuenta.
- [ ] **Feature - Juego**: Tablero de memoria, control de turnos y puntuación.
- [ ] **Integración de API**: Consumo de la API de Rick and Morty para cartas.

## 🏃‍♂️‍➡️ Cómo correr el proyecto localmente

1. **Clonar el repositorio** y acceder a la carpeta del proyecto:
   ```bash
   git clone <url-del-repo>
   cd rick-and-morty-game
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```
   *(Nota: También puedes usar `bun install` o `pnpm install` según tu entorno)*

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

4. Abre tu navegador y visita `http://localhost:5173` (o el puerto que te indique la terminal) para ver la aplicación corriendo.
