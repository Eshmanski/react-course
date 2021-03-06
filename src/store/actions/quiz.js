import axios from '../../axios/axios-quiz';
import { 
  FETCH_QUIZES_ERROR, 
  FETCH_QUIZES_START, 
  FETCH_QUIZES_SUCCES, 
  FETCH_QUIZ_SUCCES, 
  FINISH_QUIZ, 
  QUIZ_NEXT_QUESTION, 
  QUIZ_SET_STATE,
  RETRY_QUIZ
} from './actionTypes';

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const res = await axios.get('/quizes.json');

      const quizes = [];
      Object.keys(res.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index+1}`
        });
      });

      dispatch(fetchQuizesSucces(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart);

    try {
      const {data: quiz} = await axios.get(`/quizes/${quizId}.json`);

      dispatch(fetchQuizSucces(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizSucces(quiz) {
  return {
    type: FETCH_QUIZ_SUCCES,
    quiz
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  };
}

export function fetchQuizesSucces(quizes) {
  return {
    type: FETCH_QUIZES_SUCCES,
    quizes
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  }
}


export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;

    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];

      if (state.answerState[key] === 'success') {
        return 0;
      }
    }

    const question = state.quiz[state.activeQuestion];
    const results = state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      dispatch(quizSetState({[answerId]: 'succes'}, results));

      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          dispatch(finishQuiz());
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
        }
        window.clearTimeout(timeout);
      }, 1000);

    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({[answerId]: 'error'}, results));
    }
  }
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState, results
  };
}

export function finishQuiz() {
  return {
    type: FINISH_QUIZ
  };
}

export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUESTION,
    number
  };
}

export function retryQuiz() {
  return {
    type: RETRY_QUIZ
  };
}




function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
