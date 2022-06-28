import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
//Components
import Transaction from "./containers/transaction";
import TransactionDetails from "./containers/transactionDetails";
import "./assets/scss/main.scss";

function App() {
  return (
    <div className="App">
      <Container>
        <Router>
          <Routes>
            <Route path="/" element={<Navigate replace to="/transactions" />} />
            <Route path="/transactions" element={<Transaction />}>
              <Route
                path=":id"
                element={<TransactionDetails/>}
              />
            </Route>
          </Routes>
        </Router>
      </Container>
    </div>
  );
}

export default App;
