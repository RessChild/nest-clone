import React from 'react';
import { BrowserRouter } from "react-router-dom";
import App from "./App";

// 브라우저 라우터 적용
const Root = () => (
    <BrowserRouter>
        <App />
    </BrowserRouter>
)

export default Root;