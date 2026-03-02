import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
// import NewPromptPage from "./pages/NewPromptPage";
import PromptPage from "./pages/PromptPage";
// import QuizPage from "./pages/QuizPage";
import Container from "@mui/material/Container";

function App() {
  return (
    <Container>
      <div className="container">
        <Navbar/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/prompts/:id" element={<PromptPage />} />
          <Route path="/newPrompt" element={<NewPromptPage />} />
          <Route path="/quiz" element={<QuizPage/>} /> */}
        </Routes>
      </div>
    </Container>
  )
}

export default App
