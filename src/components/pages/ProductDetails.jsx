import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert, Card, Badge } from 'react-bootstrap';
import { useProductsStore } from '../../stores/useProductsStore';
import { useCartStore } from '../../stores/useCartStore';
import ToastAlert from '../atoms/ToastAlert';

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  const { product, fetchProductById, isLoading, error, clearProduct } = useProductsStore();
  const { addToCart } = useCartStore();

  useEffect(() => {
    if (id) {
      fetchProductById(id);
    }
    return () => {
      clearProduct();
    };
  }, [id, fetchProductById, clearProduct]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowSuccessAlert(true);
    }
  };

  if (isLoading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error || !product) {
    return (
      <Container className="my-5">
        <Alert variant="danger">{error || 'Producto no encontrado.'}</Alert>
        <Button onClick={() => navigate('/')}>Volver a Productos</Button>
      </Container>
    );
  }

  const originalPrice = product.price / 0.85;

  return (
    <Container className="my-5">
      <ToastAlert
        show={showSuccessAlert}
        message="¡Producto agregado al carrito!"
        onClose={() => setShowSuccessAlert(false)}
      />
      <Row className="justify-content-center">
        <Col lg={11} xl={10}>
          <Row>
            <Col lg={7} md={6}>
              <Image src={product.img} alt={product.productName} fluid rounded />
            </Col>
            <Col lg={5} md={6} className="mt-4 mt-md-0">
              <Card className="p-3 border">
                <Card.Body>
                  <small className="text-muted">Nuevo | +500 vendidos</small>
                  <h1 className="mt-2 h2">{product.productName}</h1>
                  <div className="my-3">
                    <span className="text-muted text-decoration-line-through me-2">
                      ${originalPrice.toFixed(2)}
                    </span>
                    <span className="h3">${product.price.toFixed(2)}</span>
                    <Badge bg="success" className="ms-2">
                      15% OFF
                    </Badge>
                  </div>
                  <p>
                    <i className="bi bi-truck text-success me-2"></i>Llega gratis mañana
                  </p>
                  <div className="mt-3">
                    <p className="fw-bold mb-1">Stock disponible</p>
                    <p className="text-muted">¡Apurate, quedan pocas unidades!</p>
                  </div>
                  <div className="d-grid gap-2 mt-4">
                    <Button variant="primary" size="lg">
                      Comprar ahora
                    </Button>
                    <Button variant="outline-primary" size="lg" onClick={handleAddToCart}>
                      Agregar al carrito
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col>
              <Card className="p-4">
                <h2>Descripción</h2>
                <p className="lead text-muted">{product.productDetail}</p>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}
