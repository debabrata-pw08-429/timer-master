import React, { useState } from "react";
import { TimerProvider } from "./contexts/TimerContext";
import Home from "./pages/Home";
import History from "./pages/History";
import AppLayout from "./layout/AppLayout";
import "./index.css";

function App() {
  const [currentPage, setCurrentPage] = useState<"home" | "history">("home");

  return (
    <TimerProvider>
      <AppLayout currentPage={currentPage} onChangePage={setCurrentPage}>
        {currentPage === "home" ? <Home /> : <History />}
      </AppLayout>
    </TimerProvider>
  );
}

export default App;
