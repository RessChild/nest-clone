import React, { useEffect } from "react";
import axios from "axios";
import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";
import { Box, Button, TextField } from "@material-ui/core";
import { useState } from "react";

import { RiArrowRightLine } from "react-icons/ri";
import { useCookies } from "react-cookie";

const LoginPage = ({ history }) => {

    const source = axios.CancelToken.source();

    const [ cookie, setCookie, removeCookie ] = useCookies(['access_token', 'refresh_token']);
    const [ user, setUser ] = useState({ id: '', pw: '' });
    const { id, pw } = user;

    // 입력
    const onChangeUser = ({ currentTarget: { name, value }}) => {
        setUser({ ...user, [name]: value });
    }

    useEffect(() => {
        // 이미 로그인 정보가 있으면, 이동
        if( cookie["access_token"] && cookie["refresh_token"] ) {
            console.log("cookie info::", cookie);
            history.replace("/list");
        }
        return () => {
            source.cancel();
        }
    }, []);

    // 로그인 요청
    const onClickLogin = () => {
        axios.post('/api/identify/login', user, { cancelToken: source.token })
        // axios.post('/api/identify/req', user)
            .then( ({ data }) => {
                // console.log(data);
                if( data ) { // 성공
                    // console.log(data);
                    setCookie('access_token', data["access_token"], { path: '/' })
                    setCookie('refresh_token', data["refresh_token"], { path: '/' });
                    history.replace("/list");
                }
                else {
                    alert("실패");
                }
            })
            .catch( e => alert(e) );
    }

    const onClickSignUp = () => {
        history.replace('/sign-up');
    }

    return (
        <Box width="40rem" margin="auto" marginTop="5rem">
            <GridContainer justify="center">
                <Box fontSize="32px" fontWeight={700} marginBottom="0.5rem">- Login -</Box>
                <GridItem xs={12} style={{ margin: "1rem" }} >
                    <TextField label="ID" name="id" value={id} fullWidth={true} onChange={onChangeUser} />
                </GridItem>
                <GridItem xs={12} style={{ margin: "1rem" }} >
                    <TextField label="PW" name="pw" value={pw} fullWidth={true} onChange={onChangeUser} type="password" />
                </GridItem>
                <Button onClick={onClickLogin} fullWidth={true} style={{ border: "1px #686868 dashed", marginTop: "0.5rem", padding: "0.7rem" }}>로그인</Button>
                <Button onClick={onClickSignUp} fullWidth={true} style={{ border: "1px #686868 dashed", marginTop: "1rem", padding: "0.7rem" }}>
                    회원가입 하러 가기&nbsp;&nbsp;
                    <RiArrowRightLine />
                </Button>
            </GridContainer>
        </Box>
    )
}

export default LoginPage;