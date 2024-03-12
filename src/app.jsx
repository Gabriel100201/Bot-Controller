/* eslint-disable perfectionist/sort-imports */
import 'src/global.css';
import './index.css';
import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import Router from 'src/routes/sections';
import ThemeProvider from 'src/theme';
import { LoginProvider } from './context/LoginContext';

// ----------------------------------------------------------------------

export default function App() {
  useScrollToTop();

  return (
    <LoginProvider>
      <ThemeProvider>
        <Router />
      </ThemeProvider>
    </LoginProvider>
  );
}
