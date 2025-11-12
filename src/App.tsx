import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import GenerateIdea from './pages/GenerateIdea';
import StepGuide from './pages/StepGuide';
import Learn from './pages/Learn';
import Materials from './pages/Materials';
import FindSources from './pages/FindSources';
import NavBar from './components/NavBar';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme/tokens';
import GlobalStyles from './theme/globalStyles';

const App: React.FC = () => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [isDark, setIsDark] = React.useState(prefersDark);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Router>
        <NavBar onToggleTheme={() => setIsDark(!isDark)} />
        <Routes>
          <Route path="/" element={<GenerateIdea />} />
          <Route path="/step-guide" element={<StepGuide />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/materials" element={<Materials />} />
          <Route path="/find-sources" element={<FindSources />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
