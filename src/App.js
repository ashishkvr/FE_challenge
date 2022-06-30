import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Components
import Transaction from "./containers/transaction";
import TransactionDetails from "./containers/transactionDetails";
import Loader from './components/shared/loader';

//scss
import "./assets/scss/main.scss";

function App() {
  const isSpinner = useSelector((state) =>
    state.transaction.isSpinner
  );
  return (
    <Container>
      {isSpinner && <Loader show={true} />}
      <Router>
        <Routes>
          <Route path="/" element={<Navigate replace to="/transactions" />} />
          <Route path="/transactions" element={<Transaction />}>
            <Route path=":id" element={<TransactionDetails />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer icon={false} />
    </Container>
  );
}

export default App;
