import React, {
  lazy,
  Suspense,
  useState,
} from "react";

import ReactDOM from "react-dom/client";


import "./App.css";
import "./style.css";
import LoginGate from "./components/LoginGate.jsx";

/*
  App.jsx chưa được import ngay.
  Nó chỉ được tải và render sau khi isLoggedIn === true.
*/
const App = lazy(() => import("./App.jsx"));

function Root() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return sessionStorage.getItem("payroll_logged_in") === "true";
  });

  if (!isLoggedIn) {
    return (
      <LoginGate
        onLogin={() => {
          setIsLoggedIn(true);
        }}
      />
    );
  }

  return (
    <Suspense
      fallback={
        <main className="loading-page">
          Đang mở ứng dụng...
        </main>
      }
    >
  <App
    onLogout={() => {
      sessionStorage.removeItem("payroll_logged_in");
      setIsLoggedIn(false);
    }}
  />    
</Suspense>
  );
}

ReactDOM.createRoot(
  document.getElementById("root"),
).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
);  