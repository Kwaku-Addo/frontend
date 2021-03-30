

import { Route, BrowserRouter as Router, Link } from "react-router-dom";

import Signup from './components/signup.component';
import Signin from './components/signin.component'
import AllQuestions from './components/allquestions.component';
import AddQuestions from "./components/add-questions.component";


function App() {


  return (
    <Router>
        <div className="container">
          <div>
            <li>
                <Link to={"/signup"} className="nav-link">
                    Signup
                </Link>
            </li>
            <li>
                <Link to={"/signin"} className="nav-link">
                    Login
                </Link>
            </li>
            <li>
                <Link to={"/findAll"} className="nav-link">
                    All Quizzes
                </Link>
            </li>
            <li>
                <Link to={"/addQuiz"} className="nav-link">
                    Add Quiz
                </Link>
            </li>
          </div>

          <div>
            <Route exact path={["/", "/signup"]} component={Signup} />
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/findAll" component={AllQuestions} />
            <Route exact path="/addQuiz" component={AddQuestions} />

          </div>
    </div>
    </Router>

  );
}

export default App;
