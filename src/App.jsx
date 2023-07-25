import {createBrowserHistory} from "history";
import {Router} from "react-router";
import Routes from "./Routes";
function App() {
  const browserHistory = createBrowserHistory();

  return (
      <Router history={browserHistory}>
        <Routes />
      </Router>
  )
}

export default App
