import React, { useEffect } from "react";
import { fetchQuiz, selectAnswer, postAnswer } from "../state/action-creators";
import { connect } from "react-redux";
import { object, string } from "yup";
import * as yup from "yup";

export function Quiz(props) {
  // const formSchema = object().shape({
  //   newQuestion: yup.string().min(2).trim().required("Question required"),
  //   newTrueAnswer: yup
  //     .string()
  //     .min(2)
  //     .trim()
  //     .required("True answer is required"),
  //   newFalseAnswer: yup
  //     .string()
  //     .min(2)
  //     .trim()
  //     .required("False answer is requred"),
  // });

  const { quiz, fetchQuiz, answerId, postAnswer, selectAnswer } = props;

  const handleClick = (i) => {
    console.log("select", selectAnswer(quiz.answers[i].answer_id));
    selectAnswer(quiz.answers[i].answer_id);
  };

  const handleSubmit = () => {
    console.log("post:"),
      postAnswer({ quiz_id: quiz.quiz_id, answer_Id: answerId });
    postAnswer({ quiz_id: quiz.quiz_id, answer_Id: answerId });
  };

  useEffect(() => {
    if (!quiz) {
      fetchQuiz();
    }
  }, []);
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
        quiz ? (
          <>
            <h2>{quiz.question}</h2>

            <div id="quizAnswers">
              <div
                className={`answer${
                  answerId === quiz.answers[0].answer_id ? "selected" : ""
                }`}
              >
                {quiz.answers[0].text} {/*"A function"*/}
                <button onClick={handleClick(0)}>
                  {answerId === quiz.answers[0].answer_id
                    ? "SELECTED"
                    : "Select"}
                  {/* SELECTED */}
                </button>
              </div>

              <div
                className={`answer${
                  answerId === quiz.answers[1].answer_id ? "selected" : ""
                }`}
              >
                {/* An elephant */}
                {quiz.answers[1].text}
                <button onClick={handleClick(1)}>
                  {answerId === quiz.answers[1].answer_id
                    ? "SELECTED"
                    : "Select"}
                </button>
              </div>
            </div>

            <button
              id="submitAnswerBtn"
              disabled={answerId ? false : true}
              onClick={handleSubmit}
            >
              Submit answer
            </button>
          </>
        ) : (
          "Loading next quiz..."
        )
      }
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    answerId: state.selectAnswer,
  };
};

export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  postAnswer,
})(Quiz);
