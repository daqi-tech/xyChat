import React from 'react'
import { connect } from 'react-redux'
import { List } from 'antd-mobile'
const Item = List.Item
const Brief = Item.Brief

@connect(
    state => state
)
class Msg extends React.Component {
    getLast(arr) {
        return arr[arr.length - 1]
    }
    handleClick= targetId => {
		this.props.history.push(`/chat/${targetId}`)
	}
    render() {
        if (!this.props.chat.chatmsg.length) {
            return null
        }
        const userid = this.props.user._id
        const userinfo = this.props.chat.users
        const msgGroup = {}
        this.props.chat.chatmsg.forEach(v => {
            msgGroup[v.chatid] = msgGroup[v.chatid] || []
            msgGroup[v.chatid].push(v)
        });
        const chatList = Object.values(msgGroup)
        return (
            <div>
                <List>
                    {chatList.map(v => {
                        const lastItem = this.getLast(v)
                        const targetId = lastItem.from === userid ? lastItem.to : lastItem.from
                        const name = userinfo[targetId]?userinfo[targetId].name:''
                        return (
                            <Item
                                key={lastItem._id}
                                onClick={() => this.handleClick(targetId)}
                            >
                                {lastItem.content}
                                <Brief>{name}</Brief>
                            </Item>
                        )
                    })}
                </List>
            </div>
        )
    }
}

export default Msg
