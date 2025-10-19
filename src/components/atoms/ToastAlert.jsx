import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';

export default function ToastAlert({
  show,
  message,
  variant = 'success',
  onClose,
  duration = 2000,
}) {
  useEffect(() => {
    if (!show) {
      return;
    }
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [show, duration, onClose]);

  if (!show) {
    return null;
  }
  return (
    <Alert
      variant={variant}
      onClose={onClose}
      dismissible
      className="position-fixed top-0 start-50 translate-middle-x mt-3"
      style={{ zIndex: 1050 }}
    >
      {message}
    </Alert>
  );
}
