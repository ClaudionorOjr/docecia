import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';

import './styles/global.scss'
import { AuthContextProvider } from './contexts/AuthContext';


export function App() {

  return (
    <Router>
      <AuthContextProvider>
        <AppRoutes />
      </AuthContextProvider>
    </Router>
  );
}
