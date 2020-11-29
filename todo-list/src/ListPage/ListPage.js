import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, IconButton } from "@material-ui/core"
import { CgTrash } from "react-icons/cg";

import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";

const ListPage = () => {
    // 비동기처리 취소용 객체
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const [ todoList, setTodoList ] = useState([]);

    // axios 로 리스트 불러오기
    const searchList = () => {
        axios.get('/api/todo-list', { cancelToken: source.token })
            .then( ({ data }) => {
                console.log(data);
                setTodoList(data);
            })
            .catch( e => { if(!axios.isCancel(e)) alert("error", e) });
    }

    // 초기화
    useEffect(() => {
        searchList();
        return () => {
            source.cancel('List page Change')
        }
    }, [])

    const onClickAddTodo = () => {
        const title = window.prompt("제목:");
        if(!title) return;
        const content = window.prompt("내용:");
        if(!content) return;
        axios.post('/api/todo-list/add', { title: title, content: content }, { cancelToken: source.token })
            .then( ans => searchList() )
            .catch( e => { if(!axios.isCancel(e)) alert("error", e) });
    }

    const onClickDeleteTodo = ({ currentTarget: { name }}) => {
        axios.delete(`/api/todo-list/remove/${name}`)
            .then( ans => searchList() )
            .catch( e => { if(!axios.isCancel(e)) alert("error", e) });
    }

    return (
        <Box margin="5rem">
        <GridContainer justify="center" >
            <GridItem xs={6}>
                <Box fontSize={32} fontWeight={700} textAlign="center" marginBottom="1rem" borderBottom={1}>Todo-List</Box>
            </GridItem>
        </GridContainer>
        <GridContainer justify="center">
            {
                todoList.map( (todo, idx) => 
                    <GridItem xs={12} style={{ border: "1px #777777 solid", borderTop: (!idx) ? "1px #777777 solid" : "0px" }} key={idx}>
                        <GridContainer justify="space-between" alignItems="center" style={{ padding: "10px" }}>
                            <GridItem>
                            <Box id={`todoItem-${idx}`}>
                                { `- ${ todo.title } (${ todo.content })`}
                            </Box>
                            </GridItem>
                            <GridItem>
                            {
                                <IconButton  aria-label="delete todo" component="span">
                                    <CgTrash color="red" />
                                </IconButton>
                            }
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                )
            }
            <Button onClick={onClickAddTodo}>메모 추가</Button>

        </GridContainer>
        </Box>
    );
}

export default ListPage;