import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import Routes from './Routes';
import { Suspense } from 'react';
import Loading from 'components/Loading';
import { I18nextProvider } from 'react-i18next';
import i18next from './providers/i18next.js';

function App() {
  const browserHistory = createBrowserHistory();

  return (
    <Suspense fallback={<Loading />}>
      <I18nextProvider i18n={i18next}>
        <Router history={browserHistory}>
          <Routes />
        </Router>
      </I18nextProvider>
    </Suspense>
  );
}

export default App;
