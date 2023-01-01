import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Router } from "./Router";

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
