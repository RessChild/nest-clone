import React from "react";
import axios from "axios";
import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";
import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";

import { RiArrowGoBackFill } from "react-icons/ri";

const LoginPage = ({ history }) => {

    const [ user, setUser ] = useState({ id: '', pw: '' });
    const { id, pw } = user;

    // 입력
    const onChangeUser = ({ currentTarget: { name, value }}) => {
        setUser({ ...user, [name]: value });
    }

    // 로그인 요청
    const onClickLogin = () => {
        history.replace('/login');
    }

    const onClickSignUp = () => {
        // 기능 구현하기
        axios.post('/api/identify/sign-up', user)
            .then( ({ data }) => {
                console.log(data);
                if( data ) { // 성공 시, 로그인 페이지로 이동
                    history.replace("/login");
                }
                else {
                    alert("이미 존재하는 계정 id 입니다");
                }
            })
            .catch( e => alert(e) );
    }

    return (
        <Box width="40rem" margin="auto" marginTop="5rem">
            <GridContainer justify="center">
                <Box fontSize="32px" fontWeight={700} marginBottom="0.5rem">- Sign Up -</Box>
                <GridItem xs={12} style={{ margin: "1rem" }} >
                    <TextField label="ID" name="id" value={id} fullWidth={true} onChange={onChangeUser} />
                </GridItem>
                <GridItem xs={12} style={{ margin: "1rem" }} >
                    <TextField label="PW" name="pw" value={pw} fullWidth={true} onChange={onChangeUser} type="password" />
                </GridItem>
                <Button onClick={onClickSignUp} fullWidth={true} style={{ border: "1px #686868 dashed", marginTop: "0.5rem", padding: "0.7rem" }}>회원가입</Button>
                <Button onClick={onClickLogin} fullWidth={true} style={{ border: "1px #686868 dashed", marginTop: "1rem", padding: "0.7rem" }}>
                    로그인 하러 가기&nbsp;&nbsp;
                    <RiArrowGoBackFill />
                </Button>
            </GridContainer>
        </Box>
    )
}

export default LoginPage;