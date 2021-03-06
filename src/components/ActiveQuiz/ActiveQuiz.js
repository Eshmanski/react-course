import React from 'react';
import AnswersList from './AnswersList/AnswersList';
import classes from './ActiveQuiz.module.css';

const ActiveQuize = (props) => {
  return (
    <div className={classes.ActiveQuize}>
      <p className={classes.Question}>
        <span>
          <strong>{ props.answerNumber }. </strong>
          { props.question }
        </span>

        <small>{ props.answerNumber } из { props.quizLength }</small>
      </p>
      
      <AnswersList
        state={props.state}
        answers={props.answers}
        onAnswerClick={props.onAnswerClick}
      />
      
    </div>
  );
}

export default ActiveQuize;
