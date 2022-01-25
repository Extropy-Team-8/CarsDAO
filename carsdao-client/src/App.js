import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import NotFound from "./Pages/NotFound";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Landing} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
