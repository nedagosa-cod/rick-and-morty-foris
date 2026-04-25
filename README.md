# Rick and Morty Memory Game 🌌

Una aplicación web interactiva desarrollada en **React** que permite a los usuarios autenticarse y poner a prueba su memoria con los personajes del universo de Rick and Morty.

---

## 🎯 Enfoque de Desarrollo

El proyecto fue construido bajo la filosofía de **Clean Architecture** y **Feature-Based Architecture**. El objetivo principal fue lograr un código altamente escalable, mantenible y profesional, evitando el acoplamiento y promoviendo la reutilización.

1. **Separación Estricta de Responsabilidades**: Toda la lógica de negocio, manejo de estados del juego y algoritmos complejos están centralizados en *Custom Hooks* (ej. `useGame.ts`, `useLoginForm.ts`, `useCharacters.ts`), dejando a los componentes de UI (como `Game.tsx` o `Card.tsx`) puramente presentacionales y tontos (*Dumb Components*).
2. **Sistema de Diseño Consistente y Reutilizable**: Se crearon componentes UI base y genéricos (`Button.tsx`, `Input.tsx`, `Modal.tsx`, `Loader.tsx`) tipados de manera estricta heredando de los atributos nativos de HTML, asegurando consistencia visual (animaciones inmersivas y diseño responsivo *Mobile-first*) y facilitando su uso global en toda la aplicación.
3. **Escalabilidad**: Al agrupar archivos por "feature" (ej. `src/features/auth`, `src/features/game`), aseguramos que cada dominio de la aplicación viva de manera independiente, facilitando la adición de nuevas funcionalidades en el futuro sin generar colisiones.

---

## 🧠 Decisiones Técnicas y Razonamiento

1. **GraphQL en lugar de REST API**:
   - Para evitar el *Over-fetching*. Al consumir la [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql), solicitamos de forma granular exclusivamente los campos que el frontend necesita (`id`, `name`, `image`, `status`, `species`), mejorando la carga útil y el rendimiento.

2. **Gestión de Estado Asíncrono con React Query**:
   - En lugar de usar `useEffect` y estados locales como `isLoading` o `isError`, `@tanstack/react-query` maneja de forma declarativa el caché de red y las peticiones, simplificando drásticamente el flujo de red.

3. **Flujo de Juego Ininterrumpido y Rejugable**:
   - Para asegurar que cada partida sea única, el hook `useCharacters.ts` calcula matemáticamente un número al azar (entre las múltiples páginas disponibles de la API) al arrancar. Recientemente, se optimizó el `resetGame` para que, al ganar, el juego automatice la recarga del tablero, mezclando y volviendo a mostrar cartas nuevas con transiciones fluidas sin necesidad de recargar la página web.

4. **Algoritmo Fisher-Yates para el Barajado (Shuffle)**:
   - Se descartó la mala práctica de utilizar `array.sort(() => Math.random() - 0.5)` ya que los motores V8 no garantizan uniformidad matemática. En su lugar, el algoritmo *Fisher-Yates* garantiza una distribución probabilística O(N) genuinamente aleatoria.

5. **Animaciones 3D en CSS Puro (Sin Librerías)**:
   - Para demostrar dominio profundo del DOM, en lugar de usar librerías como *Framer Motion*, se implementaron transformaciones 3D reales utilizando `perspective`, `transform-style: preserve-3d` y `backface-visibility`. Además, se implementó control por React del ciclo de vida de la animación inicial para evitar bugs de cascada visuales tras el barajado.

6. **Estilos sin Frameworks UI**:
   - Para cumplir estrictamente con los requerimientos, no se utilizaron herramientas como Tailwind o Bootstrap. Se empleó **CSS Puro** utilizando la **Metodología BEM (Block__Element--Modifier)** y Variables Nativas (CSS Custom Properties) para garantizar una hoja de estilos mantenible.

7. **Gestión de Estado Global Simplificada con Zustand (Autenticación)**:
   - Para demostrar el dominio de arquitecturas modernas de estado global, se migró el flujo de autenticación de React Context a **Zustand** (`useAuthStore.ts`). Zustand elimina el *boilerplate*, evita re-renderizados innecesarios y no requiere envolver la aplicación en un `<Provider>`. Este sistema gestiona un Token simulado almacenándolo en `localStorage`, replicando el comportamiento estándar de la industria (como JWT) para proteger rutas privadas y manejar persistencia de sesión sin necesidad de un backend real temporalmente.

8. **Experiencia de Usuario (UX) Inmersiva**:
   - Se implementaron animaciones avanzadas y temáticas ("Cyber-grid" y un gran "Portal background") completamente en CSS para sumar valor e inmersión visual. A esto se le suma un nuevo sistema de ayuda en el login a través del nuevo componente `<Modal />`, garantizando que la usabilidad sea de primer nivel.

---

## 🏃‍♂️‍➡️ Instrucciones para correr el proyecto

### Prerrequisitos
Asegúrate de tener instalados **Node.js** y **Bun** (el gestor de paquetes principal del proyecto). Puedes utilizar `npm` si prefieres, pero `bun` es recomendado.

### Pasos

1. **Clonar el repositorio** y acceder a la carpeta del proyecto:
   ```bash
   git clone <url-del-repo-aqui>
   cd rick-and-morty-game
   ```

2. **Instalar dependencias**:
   ```bash
   bun install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   bun dev
   ```

4. Abre tu navegador y visita `http://localhost:5173` (o el puerto que te indique la terminal) para interactuar con la aplicación.

### Pruebas Unitarias
Se ha implementado una suite de pruebas para los componentes base (como `<Button />`) utilizando **Vitest** y **React Testing Library**. Para ejecutar las pruebas, simplemente corre:

```bash
bun test
```
