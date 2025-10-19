import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function CardElement({ item, onAddToCart }) {
  const navigate = useNavigate();

  const originalPrice = item.price ? item.price / 0.85 : 0;

  const handleAddToCartClick = (e) => {
    e.stopPropagation();
    onAddToCart(item);
  };

  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img
        variant="top"
        src={item.img}
        alt={item.productName}
        style={{ objectFit: 'cover', height: '200px' }}
      />
      <Card.Body className="d-flex flex-column p-3">
        <Card.Title className="h6 mb-3 flex-grow-1">{item.productName}</Card.Title>

        {item.price && (
          <div className="mt-auto">
            <div className="mb-2">
              <span
                className="text-muted text-decoration-line-through me-2"
                style={{ fontSize: '0.9rem' }}
              >
                ${originalPrice.toFixed(2)}
              </span>
              <span className="h5 mb-0 me-2">${item.price.toFixed(2)}</span>
              <Badge bg="success">15% OFF</Badge>
            </div>

            <p className="mb-3" style={{ fontSize: '0.9rem' }}>
              <i className="bi bi-truck text-success me-1"></i>
              Llega gratis mañana
            </p>
            <div className="d-flex gap-2">
              <Button
                variant="primary"
                className="w-100"
                onClick={() => navigate(`/producto/${item.id}`)}
              >
                Detalles
              </Button>
              <Button variant="outline-primary" className="w-100" onClick={handleAddToCartClick}>
                Agregar al carrito
              </Button>
            </div>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}
