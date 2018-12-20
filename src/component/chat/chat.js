import React from 'react'
import io from 'socket.io-client'
import { Http2ServerRequest } from 'http2';
import { List, InputItem } from 'antd-mobile';

class Chat extends React.Component{
    constructor(props){
        super(poros)
        this.state={
            text: ''
        }
    }
    componentDidMount(){
        const socket = io('ws://localhost:9093')
    }
    handleSubmit = ()=>{
        console.log(this.state);
    }
    render(){
        console.log(this.poros)
        return(
            <div className="stick-footer">
                <List>
                    <InputItem
                        placeholder="请输入"
                        value={this.state.text}
                        onChange={v=>{
                            this.setState({text:v})
                        }}
                        extra={
                            <span onClick={()=>this.handleSubmit}>发送</span>
                        }
                    >
                    </InputItem>
                </List>
            </div>
        )
    }
}