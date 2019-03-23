import React from 'react'
import { connect } from 'react-redux'
import { NavBar } from 'antd-mobile'
import { Switch, Route } from 'react-router-dom'
import NavLinkBar from '../navlink/navlink'
import XX from '../../component/xx/xx'
import YY from '../../component/yy/yy'
import User from '../../component/user/user'
import Msg from '../../component/msg/msg'
import { getMsgList, recvMsg } from '../../redux/chat.redux'

@connect(
  state => state,
  { getMsgList, recvMsg }
)
class Dashboard extends React.Component {
  componentDidMount() {
    this.props.getMsgList()
    this.props.recvMsg()
  }
  render() {
    const { pathname } = this.props.location
    const user = this.props.user
    const navList = [
      {
        path: '/xx',
        text: 'YY',
        icon: 'boss',
        title: 'YY列表',
        component: XX,
        hide: user.type === 'yy'
      },
      {
        path: '/yy',
        text: 'XX',
        icon: 'job',
        title: 'XX列表',
        component: YY,
        hide: user.type ==='xx'
      },
      {
        path: '/msg',
        text: '消息',
        icon: 'msg',
        title: '消息列表',
        component: Msg
      },
      {
        path: '/me',
        text: '我',
        icon: 'user',
        title: '个人中心',
        component: User
      }
    ]
    return (
      <div>
        <NavBar className='fixd-header'
          mode='dard'>{navList.find(v => v.path === pathname) && navList.find(v => v.path === pathname).title}</NavBar>
        <div style={{ marginTop: 45 }}>
          <Switch>
            {navList.map(v => (
              <Route key={v.path} path={v.path} component={v.component}></Route>
            ))}
          </Switch>
        </div>
        <NavLinkBar data={navList}></NavLinkBar>
      </div>
    )
  }
}

export default Dashboard