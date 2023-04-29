import React, { useState, useEffect } from "react";

function QuestionList() {
  const [questions, setQuestions] = useState([]);
  const [deletedQuestions, setDeletedQuestions] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((res) => res.json())
      .then((data) => setQuestions(data));
  }, []);

  function handleDelete(questionId) {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const updatedQuestions = questions.filter(
            (question) => question.id !== questionId
          );
          setQuestions(updatedQuestions);

          const deletedQuestion = questions.find(
            (question) => question.id === questionId
          );
          setDeletedQuestions([...deletedQuestions, deletedQuestion]);
        } else {
          throw new Error("Failed to delete question");
        }
      })
      .catch((error) => console.error(error));
  }
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <div key={question.id}>
            <li>{question.prompt}</li>
            <button onClick={() => handleDelete(question.id)}>Delete</button>
          </div>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
