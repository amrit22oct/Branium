import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRouter from './router/AppRouter';
import AuthContext from './context/AuthContext';
import ThemeContext from './context/ThemeContext';
import UIContext from './context/UIContext';
import ErrorBoundary from './components/feedback/ErrorBoundary';

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
