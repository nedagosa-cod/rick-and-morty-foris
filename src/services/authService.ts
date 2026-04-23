export interface User {
  username: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * Simula una llamada a un backend para autenticar a un usuario.
 */
export const loginUser = async (username: string, password: string): Promise<AuthResponse> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Simular validación básica
      if (username && password) {
        resolve({
          token: `mock_token_${btoa(username + Date.now()).substring(0, 20)}`,
          user: { username },
        });
      } else {
        reject(new Error('Credenciales inválidas'));
      }
    }, 1500); // Simulamos un delay de red de 1.5s
  });
};
