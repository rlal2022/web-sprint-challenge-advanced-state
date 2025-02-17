// ❗ You don't need to add extra action creators to achieve MVP
import axios from "axios";
import {
  MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
  SET_QUIZ_INTO_STATE,
  SET_SELECTED_ANSWER,
  SET_INFO_MESSAGE,
  INPUT_CHANGE,
  RESET_FORM,
} from "./action-types";

export function moveClockwise() {
  return { type: MOVE_CLOCKWISE };
}

export function moveCounterClockwise() {
  return { type: MOVE_COUNTERCLOCKWISE };
}

export function selectAnswer(payload) {
  return { type: SET_SELECTED_ANSWER, payload: payload };
}

export function setMessage(message) {
  return { type: SET_INFO_MESSAGE, payload: message };
}

export function setQuiz(quiz) {
  return { type: SET_QUIZ_INTO_STATE, payload: quiz };
}

export function inputChange(evt) {
  console.log(evt);
  return { type: INPUT_CHANGE, payload: evt };
}

export function resetForm() {
  return { type: RESET_FORM };
}

// // ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    axios
      .get("http://localhost:9000/api/quiz/next")
      .then((res) => {
        dispatch(setQuiz(null));
        dispatch(setQuiz(res.data));
      })
      .catch((err) => {
        console.log(err);
      }, []);

    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
  };
}
export function postAnswer(payload) {
  return function (dispatch) {
    axios
      .post(`http://localhost:9000/api/quiz/answer`, payload)
      .then((res) => {
        dispatch(fetchQuiz());
        dispatch(selectAnswer(null));
        dispatch(setMessage(res.data.message));
      })
      .catch((err) => console.log(err));

    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  };
}
export function postQuiz(addQuestion) {
  console.log(addQuestion.newQuestion);
  return function (dispatch) {
    axios
      .post(`http://localhost:9000/api/quiz/new`, {
        question_text: addQuestion.newQuestion,
        true_answer_text: addQuestion.newTrueAnswer,
        false_answer_text: addQuestion.newFalseAnswer,
      })
      .then((res) => {
        dispatch(
          setMessage(`Congrats: "${res.data.question}" is a great question!`)
        );
        dispatch(resetForm());
      })
      .catch((err) => console.log(err));
  };
}

// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
