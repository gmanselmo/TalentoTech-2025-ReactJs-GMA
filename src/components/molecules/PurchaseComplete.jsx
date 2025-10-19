import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function PurchaseComplete() {
  const navigate = useNavigate();

  return (
    <Container
      className="my-5 d-flex justify-content-center align-items-center"
      style={{ minHeight: '60vh' }}
    >
      <Card className="text-center p-4 shadow-sm" style={{ maxWidth: '400px' }}>
        <Card.Body>
          <i className="bi bi-check-circle-fill text-success" style={{ fontSize: '4rem' }}></i>
          <Card.Title className="h2 my-3">¡Compra Exitosa!</Card.Title>
          <Card.Text className="text-muted">
            Gracias por tu pedido. Hemos recibido tu pago y estamos preparando tu envío.
          </Card.Text>
          <Button variant="primary" onClick={() => navigate('/')} className="mt-3">
            Volver al Inicio
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}
