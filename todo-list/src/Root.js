import React from 'react';
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { CookiesProvider } from "react-cookie";

// 브라우저 라우터 적용 + 쿠키 사용
const Root = () => (
    <CookiesProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </CookiesProvider>
)

export default Root;