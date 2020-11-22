import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button } from "@material-ui/core"

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
      <>
        <Box fontSize={32} fontWeight={700}>Todo-List</Box>
        <Box>
            {
                todoList.map( (todo, idx) => 
                    <>
                        <Box border={1} key={idx}>
                            { `- ${idx+1} : ${ todo.title } (${ todo.content })`}
                            <Button style={{ color: "red" }} name={idx} onClick={onClickDeleteTodo}>메모 삭제</Button>
                        </Box>
                    </>
                )
            }
        </Box>
        <Button onClick={onClickAddTodo}>메모 추가</Button>
      </>
    );
}

export default ListPage;