import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, IconButton, InputAdornment, TextField } from "@material-ui/core"

import { BsFolderPlus } from "react-icons/bs";
import { CgTrash } from "react-icons/cg";


import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";

const ListPage = () => {
    // 비동기처리 취소용 객체
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const [ todoList, setTodoList ] = useState([]);
    const [ newTodo, setNewTodo ] = useState('');

    // axios 로 리스트 불러오기 ( 리스트 수정이 일어나면 반복 호출 )
    // 다만, 1인 사용의 경우, 네트워크 통신을 최소화 하기 위해 직접 수정 
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

    // 할일 추가
    const onClickAddTodo = () => {
        if(!newTodo.trim()) return alert("할 일을 작성해주세요.");
        axios.post('/api/todo-list/add', { content: newTodo.trim() }, { cancelToken: source.token })
            .then( ans => {
                setTodoList([ ...todoList, { content: newTodo }]); // 할일을 리스트에 삽입
                setNewTodo(''); // 비우기
            } )
            .catch( e => { if(!axios.isCancel(e)) alert("error", e) });
    }

    // 할일 삭제
    const onClickDeleteTodo = ({ currentTarget: { id }}) => {
        if( window.confirm("선택한 메모를 삭제합니다.")){
            const [ target, idx ] = id.split('-');
            axios.delete(`/api/todo-list/remove/${idx}`)
                .then( ans => setTodoList(todoList.filter( (todo, t_idx) => t_idx !== Number(idx) )) )
                .catch( e => { if(!axios.isCancel(e)) alert("error", e) });
        }
    }

    // 신규 할일
    const onChangeInput = ({ currentTarget: { value }}) => setNewTodo(value);

    return (
        <Box width="50rem" margin="auto" marginTop="5rem">
        <GridContainer justify="center" >
            <GridItem xs={6}>
                <Box fontSize={32} fontWeight={700} textAlign="center" marginBottom="1rem" borderBottom={1}>Todo-List</Box>
            </GridItem>
        </GridContainer>
        <GridContainer justify="center">
            { // 목록
                todoList.map( (todo, idx) => 
                    <GridItem xs={12} style={{ border: "1px #777777 solid", borderTop: (!idx) ? "1px #777777 solid" : "0px" }} key={idx}>
                        <GridContainer justify="space-between" alignItems="center" style={{ padding: "10px", fontSize: "20px" }}>
                            <GridItem>
                            <Box id={`todoItem-${idx}`}>
                                { `- ${ todo.content }`}
                            </Box>
                            </GridItem>
                            <GridItem>
                            {
                                <IconButton id={`delete-${idx}`} onClick={onClickDeleteTodo} aria-label="delete todo" component="span">
                                    <CgTrash color="red" />
                                </IconButton>
                            }
                            </GridItem>
                        </GridContainer>
                    </GridItem>
                )
            }

            <GridItem xs={12}>
                <GridContainer justify="space-between" alignItems="center" style={{ padding: "10px", fontSize: "20px" }}>
                    <GridItem xs={11} style={{ dislay: "flex" }}>
                    <TextField fullWidth={true} value={newTodo} onChange={onChangeInput} />
                    </GridItem>
                    <GridItem>
                    <IconButton id={`delete-`} onClick={onClickAddTodo} aria-label="delete todo" component="span">
                        <BsFolderPlus color="green" />
                    </IconButton>
                    </GridItem>
                </GridContainer>
            </GridItem>
        </GridContainer>
        </Box>
    );
}

export default ListPage;