import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function Header() {
  const { logout } = useContext(AuthContext);

  return (
    <header>
      <h1>Supermarket Dashboard</h1>
      <button onClick={logout}>Logout</button>
    </header>
  );
}

export default Header;
