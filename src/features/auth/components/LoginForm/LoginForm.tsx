import { Button } from '../../../../components/ui/Button/Button';
import { Input } from '../../../../components/ui/Input/Input';
import { useLoginForm } from '../../hooks/useLoginForm';
import './LoginForm.css';
import logo from '../../../../assets/images/Rick_and_Morty.png';

export const LoginForm = () => {
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
          <button type="button" className="login__forgot-link">
            ¿Olvidaste tu usuario o contraseña?
          </button>
        </div>
      </div>
    </div>
  );
};
