import {Route, Switch, HashRouter} from 'react-router-dom'
import Dashboard from './Components/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import ProtectedRouteConfing from './ProtectedRouteConfig';
import Profile from './Components/Profile/Profile';
import Login from './Components/login/Login';
import NotFound from './Components/NotFound';
import IndexProfile from './Components/DashboardProfile/Index'
import Post from './Components/Posts/Post';

//config user
import ChangePassword from './Components/users/config/password/ChangePassword'
import RecoveredPassword from './Components/users/config/password/RecoverdPassword'

function App() {
  return (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Dashboard}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/recovered_password" component={RecoveredPassword}/>
            <Route exact path="/change_password/:token" component={ChangePassword}/>
            <ProtectedRoute exact path="/dashboard" component={Dashboard}/>
            <ProtectedRoute exact path="/post" component={Post}/>
            <ProtectedRouteConfing exact path="/profile/:username" component={IndexProfile}/>
            <ProtectedRouteConfing exact path="/profile/first_custome/:username" component={Profile}/>
            <Route exact path="/NotFound" component={NotFound}/>
            <Route path="*" component={NotFound}/>
        </Switch>
    </HashRouter>
  );
}

export default App;
