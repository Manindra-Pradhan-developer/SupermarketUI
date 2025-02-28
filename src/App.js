import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ThemeToggle from './components/ThemeToggle';
import Login from './components/Auth/Login';
import OtpVerification from './components/Auth/OtpVerification';
import Dashboard from './components/Dashboard/Dashboard';
import PrivateRoute from './utils/PrivateRoute';
import ProductList from './components/Products/ProductList';
import AddProduct from './components/Products/AddProduct';
import InventoryList from './components/Inventory/InventoryList';
import Sales from './components/Sales/Sales';
import SomeComponent from './components/SomeComponent';
import Header from './components/Header';
import {Footer} from './components/Footer';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.color};
  min-height: 100vh;
  position: relative;
  padding-bottom: 60px; /* Height of the footer */
`;

const Content = styled.div`
  flex: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppContainer>
            <Header>
              <ThemeToggle />
            </Header>
            <Content>
              <SomeComponent>
              </SomeComponent>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/otp-verification" element={<OtpVerification />} />
                <Route
                  path="/dashboard/*"
                  element={<PrivateRoute><Dashboard /></PrivateRoute>}
                />
                <Route path="*" element={<Navigate to="/login" />} />
                <Route path="products" element={<ProductList />} />
                <Route path="products/add" element={<AddProduct />} />
                <Route path="inventory" element={<InventoryList />} />
                <Route path="sales" element={<Sales />} />
              </Routes>
            </Content>
            <Footer />
          </AppContainer>
        </AuthProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;