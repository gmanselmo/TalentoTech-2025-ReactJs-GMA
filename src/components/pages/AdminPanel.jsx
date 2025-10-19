import { useEffect } from 'react';
import { Container, Row, Spinner } from 'react-bootstrap';
import { useProductsStore } from '../../stores/useProductsStore';
import RowElementCard from '../molecules/RowElementCard';

export default function AdminPanelPage() {
  const { products, isLoading, error, fetchAllProducts } = useProductsStore();

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleEdit = (productId) => {
    console.log('Editar producto con ID:', productId);
  };

  const handleDelete = (productId) => {
    console.log('Eliminar producto con ID:', productId);
  };

  if (isLoading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '50vh' }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="my-4 text-center">
        <p className="text-danger">Error al cargar los productos: {error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Panel de Administración de Productos</h1>
      <Row className="g-3">
        {products.map((product) => (
          <RowElementCard
            key={product.id}
            product={product}
            onEdit={() => handleEdit(product.id)}
            onDelete={() => handleDelete(product.id)}
          />
        ))}
      </Row>
    </Container>
  );
}
