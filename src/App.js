import { Route, Switch } from 'react-router-dom';
import Layout from './hoc/Layout/Layout';
import Quiz from './containers/Quiz/Quiz';
import QuizList from './containers/QuizList/QuizList';
import QuizCreater from './containers/QuizCreater/QuizCreater';
import Auth from './containers/Auth/Auth';

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz-creator" component={QuizCreater} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />
      </Switch>
    </Layout>
  );
}

export default App;
