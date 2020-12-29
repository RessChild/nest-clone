import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Button, CircularProgress, IconButton, Input, InputAdornment, TextField } from "@material-ui/core"

import { BsFolderPlus } from "react-icons/bs";
import { CgTrash, CgClose } from "react-icons/cg";
import { AiOutlineEdit } from "react-icons/ai";
import { RiSendPlaneFill } from "react-icons/ri";

import GridContainer from "../components/GridContainer";
import GridItem from "../components/GridItem";

// 할일 목록 출력 페이지
const ListPage = ({ location: { state: { user, access_token }}, history }) => {
    // 비동기처리 취소용 객체
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();

    const [ hover, setHover ] = useState(-1);
    const [ isLoading, setIsLoading ] = useState(false);
    const [ todoList, setTodoList ] = useState([]);
    const [ newTodo, setNewTodo ] = useState('');
    const [ editList, setEditList ] = useState({});

    const axiosHeader = { headers: { Authorization: `Bearer ${access_token}` }, cancelToken: source.token };

    // axios 로 리스트 불러오기 ( 리스트 수정이 일어나면 반복 호출 )
    // 다만, 1인 사용의 경우, 네트워크 통신을 최소화 하기 위해 직접 수정 
    const searchList = () => {
        axios.get('/api/todo-list', axiosHeader)
            .then( ({ data }) => {
                console.log(data);
                setTodoList(data);
                setIsLoading(false);
            })
            .catch( e => { if(!axios.isCancel(e)) alert("error", e) });
    }

    // 초기화
    useEffect(() => {
        setIsLoading(true);
        searchList();
        return () => {
            source.cancel('List page Change')
        }
    }, [])

    // 로그아웃
    const onClickLogOut = () => {
        if(window.confirm("로그인 페이지로 이동합니다.")){
            history.replace('/login');
        }
    }

    // 할일 추가
    const onClickAddTodo = () => {
        if(!newTodo.trim()) return alert("할 일을 작성해주세요.");
        axios.post('/api/todo-list/add', { content: newTodo.trim() }, axiosHeader)
            .then( ans => {
                // setTodoList([ ...todoList, { todos: newTodo }]); // 할일을 리스트에 삽입
                searchList();
                setNewTodo(''); // 비우기
            } )
            .catch( e => { if(!axios.isCancel(e)) alert("error", e) });
    }

    // 할일 삭제
    const onClickDeleteTodo = ({ currentTarget: { id }}) => {
        if( window.confirm("선택한 메모를 삭제합니다.")){
            const [ target, idx ] = id.split('-');
            axios.post(`/api/todo-list/remove`, { id: idx }, axiosHeader )
                .then( ans => setTodoList(todoList.filter( ({ id }) => id !== Number(idx) )) )
                .catch( e => { if(!axios.isCancel(e)) alert("error", e) });
        }
    }

    // 할일 수정
    const onClickEditTodo = ({ currentTarget: { id }}) => {
        const [ target, idx ] = id.split('-');
        setEditList({ ...editList, [idx]: todoList.find(({ id }) => id === parseInt(idx))?.todos });
    }
    const onChangeEdit = ({ currentTarget: { id, value }}) => {
        const [ target, idx ] = id.split('-');
        setEditList({ ...editList, [idx]: value });
    }

    // 수정모드 관련
    const onClickCancel = ({ currentTarget: { id }}) => {
        if( window.confirm("수정을 취소합니다.")) {
            const [ target, idx ] = id.split('-');
            setEditList({ ...editList, [idx]: null });
        }
    }
    const onClickSend = ({ currentTarget: { id }}) => {
        const [ target, idx ] = id.split('-');
        axios.post('/api/todo-list/edit', { id: idx, todos: editList[idx] }, axiosHeader)
            .then( ans => { 
                // searchList();
                setTodoList(todoList.map( todo => todo.id !== parseInt(idx) ? todo : { ...todo, todos: editList[idx] }));
                setEditList({ ...editList, [idx]: null });
            })
            .catch( e => { if(!axios.isCancel(e)) alert("error", e) });
    }

    // 신규 할일
    const onChangeInput = ({ currentTarget: { value }}) => setNewTodo(value);

    // 마우스 호버 
    const onMouseEnterBtn = ({ currentTarget: { id }}) => {
        const [ key, idx ] = id.split('-');
        setHover(parseInt(idx));
    }
    const onMouseLeaveBtn = () => {
        setHover(-1);
    }
    return (
        <Box width="40rem" margin="auto" marginTop="5rem">
        <GridContainer justify="center" >
            <GridItem xs={6}>
                <Box fontSize={32} fontWeight={700} textAlign="center" marginBottom="0.2rem" borderBottom={1}>Todo-List</Box>
            </GridItem>
            <GridItem xs={12}>
                <Box fontSize={16} textAlign="center" marginBottom="1rem" color="#777777">{ `${user}` }&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button size="small" variant="outlined" color="secondary" onClick={onClickLogOut}>Log-out</Button>
                </Box>
            </GridItem>
        </GridContainer>
        <GridContainer justify="center">
            {
                isLoading 
                ? <Box height="60vh" display="flex" alignItems="center"><CircularProgress color="secondary" /></Box>
                : <>
                { // 목록
                    todoList.map( ({ todos, id }, idx) => 
                        <GridItem xs={12} style={{ border: "1px #777777 solid", borderTop: (!idx) ? "1px #777777 solid" : "0px" }} key={id} id={`todo-${id}`} onMouseEnter={onMouseEnterBtn} onMouseLeave={onMouseLeaveBtn}>
                            <GridContainer justify="space-between" alignItems="center" style={{ padding: "10px", fontSize: "20px" }}>
                                {
                                editList[id] !== undefined && editList[id] !== null ? // 편집모드인 경우
                                <>
                                    <GridItem xs={9} style={{ paddingLeft: "0.5rem" }}>
                                    {/* <Box height="3rem" lineHeight="3rem" id={`todoItem-${idx}`}> */}
                                        <Input id={`input-${id}`} value={editList[id]} fullWidth onChange={onChangeEdit} />
                                    {/* </Box> */}
                                    </GridItem>
                                    <GridItem>
                                        <IconButton id={`send-${id}`} onClick={onClickSend} aria-label="send edit" component="span">
                                            <RiSendPlaneFill color="green" />
                                        </IconButton>
                                        <IconButton id={`cancel-${id}`} onClick={onClickCancel} aria-label="cancel edit" component="span">
                                            <CgClose color="red" />
                                        </IconButton>
                                    </GridItem>
                                </>
                                :
                                <>
                                    <GridItem id={`todo-${id}`}>
                                    <Box height="3rem" lineHeight="3rem" id={`todoItem-${id}`}>
                                        { `- ${ todos }`}
                                    </Box>
                                    </GridItem>
                                    <GridItem>
                                    {
                                        hover === id &&
                                        <>
                                        <IconButton id={`edit-${id}`} onClick={onClickEditTodo} aria-label="edit todo" component="span">
                                            <AiOutlineEdit color="orange" />
                                        </IconButton>

                                        <IconButton id={`delete-${id}`} onClick={onClickDeleteTodo} aria-label="delete todo" component="span">
                                            <CgTrash color="red" />
                                        </IconButton>
                                        </>
                                    }
                                    </GridItem>
                                </>
                                }
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
            </>
            }
        </GridContainer>
        </Box>
    );
}

export default ListPage;