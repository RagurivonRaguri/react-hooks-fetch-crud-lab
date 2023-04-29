import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, deleteQuestion }) {
  const handleDeleteQuestion = (id) => {
    deleteQuestion(id);
  };

  const questionItems = questions.map((question) => (
    <QuestionItem
      key={question.id}
      question={question}
      deleteQuestion={handleDeleteQuestion}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;