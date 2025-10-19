import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { useNavigate, NavLink } from 'react-router-dom';
import CartDropdown from './CartDropdown';
import logo from '../../assets/logo.png';
import { useAuthStore } from '../../stores/useAuthStore';

export default function NavigationBar() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <Navbar bg="light" variant="light" expand="lg" sticky="top" className="py-3 shadow-sm">
      <Container>
        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <Image src={logo} width="40" height="40" alt="SportStore logo" className="me-2" />
          <span className="fw-bold">SportStore</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto d-flex align-items-center gap-3">
            <Nav.Link as={NavLink} to="/">
              Productos
            </Nav.Link>

            {isAuthenticated ? (
              <>
                <Nav.Link as={NavLink} to="/admin">
                  Admin
                </Nav.Link>
                <Nav.Link onClick={handleLogout} title="Cerrar sesión">
                  <i className="bi bi-box-arrow-right fs-4 text-danger"></i>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link as={NavLink} to="/login" title="Iniciar sesión">
                <i className="bi bi-person-circle fs-4 text-primary"></i>
              </Nav.Link>
            )}

            <CartDropdown onCheckout={() => navigate('/checkout')} />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
