import logo from './logo.svg';
import './App.css';
import { Redirect, Route } from "react-router-dom";
import ListPage from './ListPage/ListPage';
import SignUpPage from "./SignUpPage/SignUpPage";
import LoginPage from './LoginPage/LoginPage';

function App() {

  // 각 주소와 컴포넌트 연결
  return (
    <>
      <Route path="/login" component={LoginPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route path="/list" component={ListPage} />
      <Redirect path="/" to="/login" />
    </>
  );
}

export default App;
