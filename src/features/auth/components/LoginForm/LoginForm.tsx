import { useState } from 'react';
import { Button } from '../../../../components/ui/Button/Button';
import { Input } from '../../../../components/ui/Input/Input';
import { Modal } from '../../../../components/ui/Modal/Modal';
import { useLoginForm } from '../../hooks/useLoginForm';
import './LoginForm.css';
import logo from '../../../../assets/images/Rick_and_Morty.png';

export const LoginForm = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {
    username,
    setUsername,
    password,
    setPassword,
    errors,
    isLoading,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className="login">
      <div className="login__card">
        <figure className="login__logo-container">
          <img
            src={logo}
            alt="Rick and Morty Logo"
            className="login__logo"
            width="260"
            height="130"
          />
        </figure>
        <form className="login__form" onSubmit={handleSubmit} noValidate>
          {errors.form && (
            <div className="login__error-banner" role="alert">
              {errors.form}
            </div>
          )}
          <Input
            label="Usuario"
            id="username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
            fullWidth
            required
            autoComplete="username"
          />
          <Input
            label="Contraseña"
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            fullWidth
            required
            autoComplete="current-password"
          />
          <div className="login__actions">
            <Button
              type="submit"
              variant="primary-dark"
              size="md"
              isLoading={isLoading}
              className="login__button"
            >
              Iniciar Sesión
            </Button>
          </div>
        </form>
        <div className="login__footer">
          <button 
            type="button" 
            className="login__forgot-link"
            onClick={() => setIsModalOpen(true)}
          >
            ¿Olvidaste tu usuario o contraseña?
          </button>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title="Acceso de Prueba"
      >
        <div className="help-content">
          <p>Esta es una aplicación de demostración con <strong>Mock Auth</strong>. Para ingresar, puedes usar cualquier usuario, pero te sugerimos los siguientes:</p>
          <ul>
            <li><strong>Usuario:</strong> rick</li>
            <li><strong>Contraseña:</strong> pickle</li>
          </ul>
          <p>El sistema validará que los campos no estén vacíos y tengan el formato correcto.</p>
          <div className="modal-footer">
            <Button onClick={() => setIsModalOpen(false)} variant="primary">
              ¡Entendido!
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
