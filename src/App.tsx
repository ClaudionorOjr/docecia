import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';

import './styles/global.scss'

export function App() {
  // const sizes = [10, 12, 14, 16, 18]
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
