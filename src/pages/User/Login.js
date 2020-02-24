import React, { PureComponent, Fragment, Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Icon, Button, Flex, Carousel, Tabs, Badge, TextareaItem, Toast } from 'antd-mobile';
import moment from 'moment';
import styles from './Login.less';
import { isEmpty, isEqual } from 'underscore';
import app from '@/config/app';
import md5 from 'md5';

@connect(({ login }) => ({
  login
}))
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countDown: 60,
      entity: {
        account: '',
        captcha: ''
      },
      msgcode: ''
    }
  }

  handleChangeValue = (action, e) => {
    let { entity } = this.state;
    // console.log(action,e.target.value)
    entity[action] = e.target.value
    this.setState({ entity })
  }

  handleSubmit = () => {
    const { dispatch } = this.props;
    const { entity, msgcode } = this.state;
    if (isEmpty(entity.captcha)) {
      Toast.info('请输入验证码')
      return;
    } else if (!isEqual(msgcode, entity.captcha)) {
      Toast.info('验证码错误')
      return;
    }
    dispatch({
      type: 'login/login',
      payload: {
        account: entity.account,
        msgCode: entity.captcha
      }
    })

  };

  handleCaptcha = () => {
    const { dispatch } = this.props;
    let { entity } = this.state;
    if (isEmpty(entity.account)) {
      Toast.info('请输入手机号')
      return;
    } else if (!/^1[3456789]\d{9}$/.test(entity.account)) {
      Toast.info('请输入合法的手机号')
      return;
    }

    let { countDown } = this.state;
    if (this.timer) return;
    this.timer = setInterval(() => {
      this.setState({ countDown: --countDown }, () => {
        if (this.state.countDown <= 0) {
          clearInterval(this.timer)
          this.timer = null
          this.setState({ countDown: 60 })
        }
      })
    }, 1000)

    //获取系统时间戳
    dispatch({
      type: 'login/service',
      payload: {
        service: 'getSysTimestamp',
        params: {
          phone: entity.account
        }
      },
      onSuccess: res => {
        console.log(res)
        if (res.resultState == '1') {
          const timestamp = res.data
          const secret = md5(entity.account + timestamp + app.projectName) //时间戳
          // 获取验证码
          dispatch({
            type: 'login/service',
            payload: {
              service: 'getMsgCode',
              params: {
                account: entity.account,
                secret: secret
              }
            },
            onSuccess: res => {
              console.log(res)
              if (res.resultState == '1') {
                const msgcode = res.data.code; //验证码
                // entity.captcha = res.data.code
                this.setState({ msgcode, entity })
              }
            }
          })
        }
      }
    })
  }

  render() {
    const { countDown, entity } = this.state;
    return (
      <Fragment>
        <div className={styles.loginWrap}>
          <div className={styles.inputWrap}>
            <input onBlur={e => document.getElementById('content').scrollIntoView()} value={entity.account} onChange={this.handleChangeValue.bind(this, 'account')} maxLength="11" type="number" placeholder="请输入您的手机号" />
          </div>
          <div className={styles.inputWrap}>
            <input onBlur={e => document.getElementById('content').scrollIntoView()} value={entity.captcha} onChange={this.handleChangeValue.bind(this, 'captcha')} maxLength="6" type="number" placeholder="请输入验证码" />
            <div><Button type="primary" size="small" style={{ padding: 0, borderRadius: '2rem', background: '#00A3FE', minWidth: '2.13rem', width: '2.13rem', height: '0.53rem', lineHeight: '0.53rem', fontSize: '0.27rem', color: '#fff', textDecoration: 'none' }} onClick={this.handleCaptcha}>{countDown == 60 ? '获取验证码' : `${countDown}s`}</Button></div>
          </div>
          <div className={styles.btnWrap}>
            <Button type="primary" onClick={this.handleSubmit} size="large" style={{ borderRadius: '2rem', background: '#00A3FE', fontSize: '0.48rem', color: '#fff', textDecoration: 'none' }}>登录</Button>
          </div>
        </div>
      </Fragment>
    );
  }
}
export default Login