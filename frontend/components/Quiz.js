import React, { useEffect } from "react";
import { fetchQuiz, selectAnswer, setQuiz } from "../state/action-creators";
import { connect } from "react-redux";

export function Quiz(props) {
  const { quiz, answer, postAnswer, selectAnswer, fetchQuiz } = props;

  useEffect(() => {
    if (!quiz) {
      fetchQuiz();
    }
  }, []);

  const handleClick = (i) => {
    selectAnswer(quiz.answers[i].answer_id);
  };

  const handleSubmit = () => {
    postAnswer({ quiz_id: quiz.quiz_id, answer_Id: answer });
  };

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
                  answer === quiz.answers[0].answer_id ? " selected" : ""
                }`}
              >
                {quiz.answers[0].text}
                <button onClick={() => handleClick(0)}>
                  {answer === quiz.answers[0].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>

              <div
                className={`answer${
                  answer === quiz.answers[1].answer_id ? " selected" : ""
                }`}
              >
                {quiz.answers[1].text}
                <button
                  //button 1
                  onClick={() => handleClick(1)}
                >
                  {answer === quiz.answers[1].answer_id ? "SELECTED" : "Select"}
                </button>
              </div>
            </div>

            <button
              //button 2
              disabled={!answer}
              id="submitAnswerBtn"
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
    ...state,
    quiz: state.quiz,
    answer: state.selectedAnswer,
  };
};

export default connect(mapStateToProps, {
  fetchQuiz,
  selectAnswer,
  setQuiz,
})(Quiz);
