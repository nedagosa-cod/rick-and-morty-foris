import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../services/authService';
import { useAuth } from '../context/AuthContext';

export const useLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ username?: string; password?: string; form?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

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
    setErrors((prev) => ({ ...prev, form: undefined })); // Limpiar error general

    try {
      const response = await loginUser(username, password);
      login(response.token, response.user);
      navigate('/game', { replace: true });
    } catch (error) {
      setErrors((prev) => ({ 
        ...prev, 
        form: error instanceof Error ? error.message : 'Error al iniciar sesión' 
      }));
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
