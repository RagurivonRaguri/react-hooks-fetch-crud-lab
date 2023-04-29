import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((data) => setQuestions(data))
      .catch((error) => console.log(error));
  }, []);

  function addQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`,
     { method: "DELETE"} )
      .then(() => setQuestions(questions.filter((question) => question.id !== id)))
      .catch((error) => console.log(error));
  }

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion} />
      ) : (
        <QuestionList questions={questions} deleteQuestion={deleteQuestion} />
      )}
    </main>
  );
}

export default App;