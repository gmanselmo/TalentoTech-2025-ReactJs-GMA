import { useEffect, useState, useCallback } from 'react';
import { Container, Row, Spinner, Button } from 'react-bootstrap';
import { useProductsStore } from '../../stores/useProductsStore';
import RowElementCard from '../molecules/RowElementCard';
import ToastAlert from '../atoms/ToastAlert';
import ProductForm from '../molecules/ProductForm';

export default function AdminPanelPage() {
  const { 
    products, 
    isLoading, 
    error, 
    fetchAllProducts, 
    deleteProductById,
    createProduct,
    updateProduct
  } = useProductsStore();

  const [toast, setToast] = useState({
    show: false,
    message: '',
    variant: 'success',
  });
  
  const [showModal, setShowModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts]);

  const handleCloseToast = useCallback(() => {
    setToast((prev) => ({ ...prev, show: false }));
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setProductToEdit(null);
  }, []);

  const handleCreate = () => {
    setProductToEdit(null);
    setShowModal(true);
  };

  const handleEdit = (productId) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setProductToEdit(product);
      setShowModal(true);
    } else {
      setToast({ show: true, message: `Error: Producto ID ${productId} no encontrado.`, variant: 'warning' });
    }
  };

  const handleSave = async (formData) => {
    setIsSaving(true);
    handleCloseToast();

    try {
        let resultProduct;
        let successMessage;

        if (formData.id) {
            resultProduct = await updateProduct(formData.id, formData);
            successMessage = `Producto #${resultProduct.id} actualizado con éxito.`;
        } else {
            resultProduct = await createProduct(formData);
            successMessage = `Producto "${resultProduct.productName}" creado con éxito (ID: ${resultProduct.id}).`;
        }
        
        setToast({ show: true, message: successMessage, variant: 'success' });
        handleCloseModal();
        
    } catch (err) {
      setToast({
          show: true,
          message: `Error al guardar. Detalle: ${err.message}`, 
          variant: 'danger',
      });
      console.error('Error durante la operación de guardado:', err); 
  } finally {
        setIsSaving(false);
    }
  };

  const handleDelete = async (productId, productName) => {
    if (!window.confirm(`¿Estás seguro de que quieres eliminar "${productName}" (ID: ${productId})?`)) {
      return;
    }

    try {
      await deleteProductById(productId);
      setToast({ show: true, message: `Producto "${productName}" eliminado con éxito.`, variant: 'success' });
    } catch (err) {
      setToast({
        show: true,
        message: `Error al eliminar el producto (ID: ${productId}). Detalle: ${err.message}`,
        variant: 'danger',
      });
      console.error('Error durante la eliminación:', err);
    }
  };

  if (isLoading && products.length === 0) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: '50vh' }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error && products.length === 0) {
    return (
      <Container className="my-4 text-center">
        <p className="text-danger">Error al cargar los productos: {error}</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Panel de Administración de Productos</h1>
      
      <div className="mb-4 d-flex justify-content-end">
        <Button onClick={handleCreate} variant="success">
          ➕ Crear Nuevo Producto
        </Button>
      </div>

      <Row className="g-3">
        {products.map((product) => (
          <RowElementCard
            key={product.id}
            product={product}
            onEdit={() => handleEdit(product.id)}
            onDelete={() => handleDelete(product.id, product.productName)}
          />
        ))}
      </Row>
      
      <ProductForm
        show={showModal}
        onClose={handleCloseModal}
        onSave={handleSave}
        initialData={productToEdit}
        isLoading={isSaving}
      />

      <ToastAlert
        show={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={handleCloseToast}
      />
    </Container>
  );
}