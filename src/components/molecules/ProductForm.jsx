import { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

export default function ProductForm({
  show,
  onClose,
  onSave,
  initialData,
  isLoading,
}) {
  const [formData, setFormData] = useState({
    id: 0,
    productName: '',
    productDetail: '',
    price: 0,
    img: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        id: initialData.id,
        productName: initialData.productName || '',
        productDetail: initialData.productDetail || '',
        price: initialData.price || 0,
        img: initialData.img || '',
      });
    } else {
      setFormData({
        id: 0,
        productName: '',
        productDetail: '',
        price: 0,
        img: '',
      });
    }
  }, [initialData, show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const productToSave = initialData ? { ...formData, id: initialData.id } : formData;
    onSave(productToSave);
  };

  const modalTitle = initialData ? `Editar Producto #${initialData.id}` : 'Crear Nuevo Producto';

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modalTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formProductName" className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formProductDetail" className="mb-3">
            <Form.Label>Detalle</Form.Label>
            <Form.Control
              as="textarea"
              name="productDetail"
              value={formData.productDetail}
              onChange={handleChange}
              rows={3}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPrice" className="mb-3">
            <Form.Label>Precio ($)</Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              required
            />
          </Form.Group>

          <Form.Group controlId="formImg" className="mb-3">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control
              type="url"
              name="img"
              value={formData.img}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button variant="secondary" onClick={onClose} disabled={isLoading}>
              Cancelar
            </Button>
            <Button variant="primary" type="submit" disabled={isLoading}>
              {isLoading ? 'Guardando...' : initialData ? 'Guardar Cambios' : 'Crear Producto'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
}