import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

// import Auth provider
import { AuthProvider } from './providers/AuthProvider/AuthProvider.js';

// pages
import LandingPage from './pages/LandingPage/LandingPage';
import FourZeroFour from './pages/404Page/FourZeroFour';
import SignUp from './pages/SignUpPage/SignUp';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} exact/>
          <Route path="/signup" component={SignUp} exact/>
          <Route path="*" component={FourZeroFour} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
