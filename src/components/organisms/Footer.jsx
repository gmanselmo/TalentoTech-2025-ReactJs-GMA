import { Container, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

export default function Footer() {
  const quickLinks = [
    { label: 'Productos', path: '/' },
    { label: 'Mi Cuenta', path: '/login' },
    { label: 'Carrito', path: '/checkout' },
    // { label: 'Contacto', path: '/contacto' },
  ];

  const socialLinks = [
    { icon: 'bi bi-facebook', url: 'https://linkedin.com/in/german-anselmo' },
    { icon: 'bi bi-instagram', url: 'https://linkedin.com/in/german-anselmo' },
    { icon: 'bi bi-twitter-x', url: 'https://linkedin.com/in/german-anselmo' },
    { icon: 'bi bi-linkedin', url: 'https://linkedin.com/in/german-anselmo' },
  ];

  return (
    <footer className="bg-dark text-light mt-auto py-5 border-top border-secondary">
      <Container>
        <Row className="gy-4">
          <Col lg={5} md={12} className="text-center text-lg-start">
            <div className="d-flex align-items-center justify-content-center justify-content-lg-start mb-3">
              <Image src={logo} width="60" height="60" alt="SportStore logo" />
              <h5 className="ms-3 mb-0">SportStore</h5>
            </div>
            <p className="text-white-50">
              Tu tienda online de artículos deportivos que potencia tu bienestar. Calidad, confianza
              y rendimiento para todos.
            </p>
          </Col>

          <Col lg={{ span: 3, offset: 1 }} md={6} xs={12} className="text-center text-lg-start">
            <h6 className="text-uppercase fw-bold mb-4">Enlaces Rápidos</h6>
            <ul className="list-unstyled mb-0">
              {quickLinks.map(({ label, path }) => (
                <li key={label} className="mb-2">
                  <Link to={path} className="text-white-50 text-decoration-none footer-link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col lg={3} md={6} xs={12} className="text-center text-lg-start">
            <h6 className="text-uppercase fw-bold mb-4">Síguenos</h6>
            <div className="d-flex justify-content-center justify-content-lg-start gap-3">
              {socialLinks.map(({ icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white-50 fs-4 footer-link"
                >
                  <i className={icon}></i>
                </a>
              ))}
            </div>
          </Col>
        </Row>

        <Row>
          <Col className="text-center text-white-50 mt-5">
            <small>
              &copy; {new Date().getFullYear()} SportStore. Todos los derechos reservados.
            </small>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
