import { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import CardElement from '../molecules/CardElement';
import { useProductsStore } from '../../stores/useProductsStore';
import { useCartStore } from '../../stores/useCartStore';
import ToastAlert from '../atoms/ToastAlert';

export default function ProductsPage() {
  const { addToCart } = useCartStore();
  const { products, isLoading, error, fetchAllProducts } = useProductsStore();
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleAddToCart = (item) => {
    addToCart(item);
    setShowToast(true);
  };

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center my-5"
        style={{ minHeight: '50vh' }}
      >
        <Spinner animation="border" role="status" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4 text-center">
        <Alert variant="danger">Error al cargar los productos: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <ToastAlert
        show={showToast}
        message="¡Producto agregado al carrito!"
        onClose={() => setShowToast(false)}
      />

      <Row className="g-4">
        {products.map((item) => (
          <Col key={item.id} lg={4} md={6} xs={12}>
            <CardElement item={item} onAddToCart={handleAddToCart} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
