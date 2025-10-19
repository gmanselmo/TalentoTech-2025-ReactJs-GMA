import { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

export default function LoginForm({ onSubmit }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit({ username, password });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FloatingLabel controlId="floatingInput" label="Usuario" className="mb-3">
        <Form.Control
          type="text"
          placeholder="talento"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingPassword" label="Contraseña">
        <Form.Control
          type="password"
          placeholder="tech"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FloatingLabel>
      <Button variant="primary" type="submit" className="w-100 mt-4 py-2">
        Ingresar
      </Button>
    </Form>
  );
}
