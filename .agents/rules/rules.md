---
trigger: always_on
---

# Contexto del Proyecto
Actúa como un Senior Frontend Engineer. Estamos construyendo una aplicación en React con TypeScript. Es un juego de memoria consumiendo la API de Rick and Morty, con un sistema de autenticación simulado (Mock Auth).

# Reglas de Arquitectura
- Utiliza una arquitectura basada en "Features" (Ej: `src/features/auth`, `src/features/game`).
- Mantén una estricta separación de responsabilidades: la lógica de negocio debe ir en Custom Hooks separados de los componentes UI.
- Los componentes compartidos deben ir en `src/components/ui`.

# Reglas de Estilos (CRÍTICO)
- ESTÁ ESTRICTAMENTE PROHIBIDO usar librerías de UI (Bootstrap, Material UI, Tailwind, etc.).
- Utiliza únicamente CSS puro.
- Sigue de manera estricta la metodología BEM (Block__Element--Modifier).
- Todos los colores, espaciados y tipografías deben consumirse usando variables CSS (Custom Properties) que ya están definidas en `src/assets/styles/variables.css` (ej: `var(--color-primary)`). No uses valores estáticos ("magic numbers").

# Reglas de Componentes y TypeScript
- Define siempre las `interfaces` para las props.
- Cuando crees componentes UI base (como botones o inputs), extiende las interfaces nativas de HTML (ej: `extends ButtonHTMLAttributes<HTMLButtonElement>`) para heredar atributos y eventos estándar.
- Escribe código limpio, auto-documentado y evita comentarios obvios.

# Calidad y Accesibilidad (a11y)
- Asegúrate de que todos los componentes interactivos manejen correctamente los atributos ARIA (`aria-disabled`, `aria-busy`, `aria-hidden`) y sean navegables por teclado (`tabIndex`, manejo del evento Enter/Space).