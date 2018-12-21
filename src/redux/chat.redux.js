import axios from "axios";
import io from 'socket.io-client'
const socket = io('ws://localhost:9093')
// 获取聊天列表
const MSG_LIST = 'MSG_LIST'
// 读取信息
const MSG_RECV = 'MSG_RECV'
// 标示已读
const MSG_READ = 'MSG_READ'

const initState = {
    chatmsg: [],
    unread: 0
}

export function chat(state = initState, action) {
    switch (action.type) {
        case MSG_LIST:
            return { ...state, chatmsg: action.payload, unread: action.payload }

        case MSG_RECV:
            return { ...state, chatmsg: [...state.chatmsg, action.payloadß] }
        default:
            return state
    }
}

function msgList(msgs) {
    return {
        type: MSG_LIST,
        payload: msgs,
    }
}

function msgRecv(msgs) {
    return {
        type: MSG_RECV,
        payload: msgs,
    }
}

export function recvMsg() {
    return dispatch => {
        socket.on('recvmsg', function (data) {
            dispatch(msgRecv(data))
        })
    }
}

export function sendMsg({ from, to, msg }) {
    socket.emit('sendmsg', { from, to, msg })
}

export function getMsgList() {
    return dispatch => {
        axios.get('/user/getmsglist').then(
            res => {
                if (res.state === 200 && res.data.code === 0) {
                    dispatch(msgList(res.data.msgs))
                }
            }
        )
    }
}