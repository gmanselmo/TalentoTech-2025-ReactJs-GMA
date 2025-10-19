import { Dropdown, Badge, Button, Image, ButtonGroup } from 'react-bootstrap';
import { useCartStore } from '../../stores/useCartStore';

export default function CartDropdown({ onCheckout }) {
  const { cart, totalItems, cartTotal, removeFromCart, addToCart, decrementItem } = useCartStore();

  const handleRemove = (id) => {
    removeFromCart(id);
  };

  const handleIncrement = (item) => {
    addToCart(item);
  };

  const handleDecrement = (id) => {
    decrementItem(id);
  };

  return (
    <Dropdown align="end" autoClose="outside">
      <Dropdown.Toggle variant="light" id="cart-dropdown" className="position-relative border-0">
        <i className="bi bi-cart fs-4 text-dark"></i>
        {totalItems > 0 && (
          <Badge pill bg="primary" className="position-absolute top-0 start-100 translate-middle-x">
            {totalItems}
          </Badge>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu style={{ minWidth: '320px' }}>
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <Dropdown.Item
                as="div"
                key={item.id}
                className="d-flex align-items-center gap-3 px-3"
              >
                <Image src={item.img} width="50" height="50" rounded />
                <div className="flex-grow-1">
                  <div style={{ fontSize: '0.9rem' }}>{item.productName}</div>
                  <small className="text-muted">${item.price.toFixed(2)}</small>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <ButtonGroup size="sm">
                    <Button variant="outline-secondary" onClick={() => handleDecrement(item.id)}>
                      -
                    </Button>
                    <Button variant="light" disabled style={{ minWidth: '30px' }}>
                      {item.quantity}
                    </Button>
                    <Button variant="outline-secondary" onClick={() => handleIncrement(item)}>
                      +
                    </Button>
                  </ButtonGroup>
                  <Button
                    variant="link"
                    onClick={() => handleRemove(item.id)}
                    className="p-0 text-danger"
                  >
                    <i className="bi bi-trash"></i>
                  </Button>
                </div>
              </Dropdown.Item>
            ))}
            <Dropdown.Divider />

            <div className="d-flex justify-content-between align-items-center px-3 py-2">
              <span className="fw-bold">Total:</span>
              <span className="fw-bold">${cartTotal.toFixed(2)}</span>
            </div>

            <div className="p-2 text-center">
              <Button variant="primary" className="w-100" onClick={onCheckout}>
                Ir a Pagar
              </Button>
            </div>
          </>
        ) : (
          <Dropdown.ItemText className="text-center text-muted p-3">
            El carrito está vacío
          </Dropdown.ItemText>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
