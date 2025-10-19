import { Outlet } from 'react-router-dom';
import NavigationBar from '../organisms/Navbar';
import Footer from '../organisms/Footer';

export default function SportStoreLayout() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <NavigationBar />

      <main style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
