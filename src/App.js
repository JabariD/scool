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
import Home from './pages/Home/Home';
import Trending from './pages/Trending/Trending';
import Notifications from './pages/Notifications/Notifications';
import Messaging from './pages/Messaging/Messaging';

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Switch>
          <Route path="/" component={LandingPage} exact/>
          <Route path="/signup" component={SignUp} exact/>
          <Route path="/home" component={Home} exact/>
          <Route path="/trending" component={Trending} exact/>
          <Route path="/notifications" component={Notifications} exact/>
          <Route path="/messaging" component={Messaging} exact/>
          <Route path="*" component={FourZeroFour} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
