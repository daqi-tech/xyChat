import React from 'react'
import io from 'socket.io-client'
import { connect } from 'react-redux'
import { List, InputItem, NavNar } from 'antd-mobile'
import { getMsgList, sendMsg, recvMsg } from '../../redux/chat.redux'
import { Item } from 'antd-mobile/lib/tab-bar';
const socket = io('ws://localhost:9093')

@connect(
    state => state,
    { getMsgList, sendMsg },
)
class Chat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: '',
            msg: []
        }
    }
    componentDidMount() {
        
        // socket.on('recvmsg', function (data) {
        //     this.setState({
        //         msg: [...this.state.msg, data.text]
        //     })
        // })
    }
    handleSubmit = () => {
        const from = this.props.user._id;
        const to = this.props.match.param.user;
        const msg = this.state.text
        this.props.sendMsg(from, to, msg)
        this.setState({
            text: ''
        })
    }
    render() {
        console.log(this.poros)
        const user = this.poros.match.param.user

        return (
            <div id='chat-page'>
                <NavNar>
                    {user}
                </NavNar>
                {this.props.chat.chatmsg.map(v => {
                    return v.from === user ? (
                        <List key={v._id}>
                            <Item
                                className='chat-me'
                            >
                                {v.content}
                            </Item>
                        </List>
                        ) : (
                            <List key={v._id}>
                                <Item 
                                    extra={'avater'}
                                    className='chat-me'
                                >{v.content}</Item>
                            </List>
                        )
                })}
                <div className="stick-footer">
                    <List>
                        <InputItem
                            placeholder="请输入"
                            value={this.state.text}
                            onChange={v => {
                                this.setState({ text: v })
                            }}
                            extra={
                                <span onClick={() => this.handleSubmit}>发送</span>
                            }
                        >
                        </InputItem>
                    </List>
                </div>
            </div>
        )
    }
}

export default Chat;