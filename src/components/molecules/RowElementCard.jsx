import { Card, Col, Row, Button } from 'react-bootstrap';

export default function RowElementCard({ product, onEdit, onDelete }) {
  if (!product) {
    return null;
  }

  return (
    <Col xs={12}>
      <Card>
        <Row className="g-0">
          <Col md={3} className="d-flex align-items-center justify-content-center p-2">
            <Card.Img
              src={product.img}
              style={{ maxHeight: '150px', width: 'auto', maxWidth: '100%' }}
            />
          </Col>
          <Col md={9}>
            <Card.Body className="d-flex justify-content-between align-items-center h-100">
              <div>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text className="text-muted mb-1">{product.productDetail}</Card.Text>
                <h5 className="fw-bold text-success">${product.price.toFixed(2)}</h5>
              </div>
              <div className="d-flex flex-column gap-2">
                <Button variant="outline-primary" size="sm" onClick={onEdit}>
                  <i className="bi bi-pencil-square me-1"></i> Editar
                </Button>
                <Button variant="outline-danger" size="sm" onClick={onDelete}>
                  <i className="bi bi-trash me-1"></i> Eliminar
                </Button>
              </div>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </Col>
  );
}
