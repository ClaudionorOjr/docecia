import { BrowserRouter as Router } from 'react-router-dom';
import { AppRoutes } from './routes';

import './styles/global.scss'

export function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
