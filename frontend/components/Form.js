import React from "react";
import { connect } from "react-redux";
import { inputChange, postQuiz, resetForm } from "../state/action-creators";
// import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const { inputChange, postQuiz, newQuestion, newTrueAnswer, newFalseAnswer } =
    props;

  const onChange = (evt) => {
    inputChange({ [evt.target.id]: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    postQuiz({
      questions_text: newQuestion,
      true_answer_text: newTrueAnswer,
      false_answer_text: newFalseAnswer,
    });
    resetForm();
  };

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        value={newQuestion}
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        value={newTrueAnswer}
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        value={newFalseAnswer}
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" onClick={onSubmit}>
        Submit new quiz
      </button>
    </form>
  );
}
const mapStateToProps = (state) => {
  return {
    state: state,
    newQuestion: state.form.newQuestion,
    newTrueAnswer: state.form.newTrueAnswer,
    newFalseAnswer: state.form.newFalseAnswer,
  };
};

export default connect(mapStateToProps, { inputChange, postQuiz, resetForm })(
  Form
);
