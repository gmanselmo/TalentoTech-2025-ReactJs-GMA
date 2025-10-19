import { useNavigate } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Container
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: '80vh', textAlign: 'center' }}
    >
      <h1 className="display-1 text-danger">404</h1>
      <h2 className="mb-3">Página no encontrada</h2>
      <p className="mb-4 text-muted">Lo sentimos, la página que buscas no existe o se ha movido.</p>
      <Button variant="primary" onClick={() => navigate('/')}>
        Ir al inicio
      </Button>
    </Container>
  );
}
