import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter.jsx';
import AuthContext from './context/AuthContext.jsx';
import ThemeContext from './context/ThemeContext.jsx';
import UIContext from './context/UIContext.jsx';
import ErrorBoundary from './components/feedback/ErrorBoundary.jsx';

const App = () => {
  return (
    <ErrorBoundary>
      <AuthContext>
        <ThemeContext>
          <UIContext>
            <Router>
              <AppRouter />
            </Router>
          </UIContext>
        </ThemeContext>
      </AuthContext>
    </ErrorBoundary>
  );
};

export default App;
