import { useState } from 'react';
import { Container, Row, Col, Card, Button, ListGroup, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../../stores/useCartStore';
import PurchaseComplete from '../molecules/PurchaseComplete';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useCartStore();
  const [isPurchaseComplete, setIsPurchaseComplete] = useState(false);

  const handlePurchase = () => {
    clearCart();
    setIsPurchaseComplete(true);
  };

  if (isPurchaseComplete) {
    return <PurchaseComplete />;
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <h1 className="mb-4 text-center">Finalizar Compra</h1>
          {cart.length > 0 ? (
            <Card className="shadow-sm">
              <Card.Header as="h5">Resumen de tu Pedido</Card.Header>
              <Card.Body>
                <ListGroup variant="flush">
                  {cart.map((item) => (
                    <ListGroup.Item
                      key={item.id}
                      className="d-flex justify-content-between align-items-center"
                    >
                      <div>
                        {item.productName}
                        <br />
                        <small className="text-muted">Cantidad: {item.quantity}</small>
                      </div>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </ListGroup.Item>
                  ))}
                  <ListGroup.Item className="d-flex justify-content-between align-items-center fw-bold h5">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
              <Card.Footer className="text-end">
                <Button variant="primary" size="lg" onClick={handlePurchase}>
                  Confirmar Compra
                </Button>
              </Card.Footer>
            </Card>
          ) : (
            <Alert variant="info" className="text-center">
              <Alert.Heading>Tu carrito está vacío.</Alert.Heading>
              <p>No tienes productos en tu carrito para comprar.</p>
              <Button variant="outline-info" onClick={() => navigate('/')}>
                Ver Productos
              </Button>
            </Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
}
