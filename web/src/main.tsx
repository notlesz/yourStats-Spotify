import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import App from "./App";
import "./index.css";
import { queryClient } from "./services/queryClient";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
);
