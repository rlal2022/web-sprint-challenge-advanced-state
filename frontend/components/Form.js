import React from "react";
import { connect } from "react-redux";
import { inputChange, resetForm, postQuiz } from "../state/action-creators";
// import * as actionCreators from "../state/action-creators";

export function Form(props) {
  const { inputChange, postQuiz, form } = props;

  const onChange = (evt) => {
    inputChange({ [evt.target.id]: evt.target.value });
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    postQuiz(form);
    resetForm();
  };

  const formDisabled =
    form.newQuestion.trim().length > 0 &&
    form.newTrueAnswer.trim().length > 0 &&
    form.newFalseAnswer.trim().length > 0;

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input
        maxLength={50}
        onChange={onChange}
        id="newQuestion"
        value={form.newQuestion}
        placeholder="Enter question"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newTrueAnswer"
        value={form.newTrueAnswer}
        placeholder="Enter true answer"
      />
      <input
        maxLength={50}
        onChange={onChange}
        id="newFalseAnswer"
        value={form.newFalseAnswer}
        placeholder="Enter false answer"
      />
      <button id="submitNewQuizBtn" disabled={!formDisabled}>
        Submit new quiz
      </button>
    </form>
  );
}
const mapStateToProps = (state) => {
  console.log(mapStateToProps);
  return {
    form: state.form,
  };
};

export default connect(mapStateToProps, { inputChange, postQuiz, resetForm })(
  Form
);
