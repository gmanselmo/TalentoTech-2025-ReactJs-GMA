import { useState } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../organisms/LoginForm';
import { useAuthStore } from '../../stores/useAuthStore';
import { useCartStore } from '../../stores/useCartStore';

export default function LoginPage() {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('danger');
  const navigate = useNavigate();

  const { login } = useAuthStore();
  const { clearCart } = useCartStore();

  const handleLogin = (credentials) => {
    if (credentials.username === 'talento' && credentials.password === 'tech') {
      setMessageType('success');
      setMessage('¡Inicio de sesión exitoso! Redirigiendo...');
      login(credentials.username);
      // clearCart();
      setTimeout(() => {
        navigate('/admin');
      }, 1000);
    } else {
      setMessageType('danger');
      setMessage('Usuario o contraseña incorrectos.');
    }
  };

  return (
    <Container className="d-flex align-items-center justify-content-center my-5 py-5">
      <Card style={{ width: '24rem' }} className="my-5">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            <h2 className="fw-bold">Iniciar Sesión</h2>
            <p>(user: 'talento' pass: 'tech')</p>
          </Card.Title>
          {message && <Alert variant={messageType}>{message}</Alert>}
          <LoginForm onSubmit={handleLogin} />
        </Card.Body>
      </Card>
    </Container>
  );
}
