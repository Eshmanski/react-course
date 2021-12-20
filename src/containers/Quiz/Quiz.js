import React, { Component } from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import axios from '../../axios/axios-quiz';
import Loader from '../../components/UI/Loader/Loader';
import classes from './Quiz.module.css';

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: {},
      isFinished: false,
      activeQuestion: 0,
      answerState: null,
      loading: true,
      quiz: []
    };
  }

  async componentDidMount() {
    try {
      const {data: quiz} = await axios.get(`/quizes/${this.props.match.params.id}.json`);
      console.log(quiz)
      this.setState({
        quiz,
        loading: false
      })
    } catch (e) {
      console.log(e);
    }
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];

      if (this.state.answerState[key] === 'success') {
        return 0;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      });

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
           answerState: null 
          });
        }
        window.clearTimeout(timeout);
      }, 1000);

    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: {[answerId]: 'error'},
        results
      });
    }
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  }

  render() {
    return (
      <div className={classes.Quiz}>       
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {
            this.state.loading
             ? <Loader />
             : this.state.isFinished
                ? <FinishedQuiz 
                    results={this.state.results}
                    quiz={this.state.quiz}
                    onRetry={this.retryHandler}
                  />
                : <ActiveQuiz 
                    answers={this.state.quiz[this.state.activeQuestion].answers}
                    question={this.state.quiz[this.state.activeQuestion].question}
                    onAnswerClick={this.onAnswerClickHandler}
                    quizLength={this.state.quiz.length}
                    answerNumber={this.state.activeQuestion + 1}
                    state={this.state.answerState}
                  />
          }
          
        
        </div>
      </div>
    )
  }
}

export default Quiz;
