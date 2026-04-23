import { useState, type FormEvent } from 'react';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const validate = () => {
    const newErrors: { username?: string; password?: string } = {};
    if (!username) {
      newErrors.username = 'El usuario es requerido';
    }
    if (!password) {
      newErrors.password = 'La contraseña es requerida';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    // Mock authentication
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      // TODO: Handle successful login (e.g., save token, redirect)
      console.log('Login successful', { username });
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    isLoading,
    handleSubmit,
  };
};
