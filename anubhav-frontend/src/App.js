import './App.css';
import { Route, Switch, HashRouter } from 'react-router-dom';
import Home from './Components/Home';
import SignInSide from './Components/LoginPage/SignInSide';
import SignUpSide from './Components/LoginPage/SignUpSide';
import Yoga from './Components/Yoga';
import Yoga_Learn from './Components/Yoga_Learn';
import Yoga_Test from './Components/Yoga_test';
import DIY from './Components/DIY';
import MentalWellness_Home from './Components/MentalWellness/MentalWellness_Home';
import Admin from './Components/Admin/Admin';
import ImageUpload from './Components/ImageUpload/ImageUpload';
import GreenEarth_Home from './Components/GreenEarth/GreenEarth_Home';
import CommunityCollaboration_Home from './Components/CommunityCollaboration/CommunityCollaboration_Home';
import Chart from './Components/Chart';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
        <HashRouter>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={SignInSide}/>
            <Route exact path="/signup" component={SignUpSide}/>
            <Route exact path="/yoga" component={Yoga}/>
            <Route exact path="/yoga_learn" component={Yoga_Learn}/>
            <Route exact path="/yoga_test" component={Yoga_Test}/>
            <Route exact path="/diy" component={DIY} />
            <Route exact path="/mentalwellness" component={MentalWellness_Home} />
            <Route exact path="/greenearth" component={GreenEarth_Home} />
            <Route exact path="/communitycollaboration" component={CommunityCollaboration_Home} />
            <Route exact path="/admin" component={Admin} />
            <Route exact path="/chart" component={Chart}/>
            <Route exact path="/fire" component={ImageUpload} />

          </Switch>

        </HashRouter>
        
      {/* </header> */}
    </div>
  );
}

export default App;
