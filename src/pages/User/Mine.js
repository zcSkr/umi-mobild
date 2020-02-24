import React, { PureComponent, Fragment, Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Icon, Button, Flex, Modal, Tabs, Badge, TextareaItem, Toast } from 'antd-mobile';
import moment from 'moment';
import styles from './Mine.less';
import { isEmpty } from 'underscore';
const alert = Modal.alert;
import app from '@/config/app';

@connect(({ mine, sys, login }) => ({
  mine,
  sys,
  login
}))

export default class Mine extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      entity: {
        headImg: '',
        nickname: '',
        sex: '',
        birthday: ''
      }, 
      packageBuy: [], //套餐价格
      selectPrice: {}, //选择的价格
      feedbackValue: "" //反馈的内容
    }
  }
  queryUesrInfo = () => {
    const { dispatch } = this.props
    dispatch({
      type: 'mine/service',
      payload: {
        service: 'queryUserInfo'
      },
      onSuccess: res => {
        console.log(res)
        if (res.resultState == '1') {
          let headImg = res.data.headImg
          let unionuser = app.getUnionuser()
          unionuser.headImg = headImg
          app.setUnionuser(unionuser)
          this.setState({ userInfo: res.data, entity: { ...res.data } })
        }
      }
    })
  }
  componentDidMount() {
    const { dispatch, location: { query } } = this.props
    this.queryUesrInfo()
  }
  handleItemClick = action => {
    const { dispatch } = this.props;
    switch (action) {
      case 'person':
        dispatch(routerRedux.push('/person'))
        break;
      case 'wallet':
        dispatch(routerRedux.push('/wallet'))
        break;
      case 'feedback':
        dispatch(routerRedux.push('/feedback'))
        break;
      case 'logout':
        alert('退出', '确定退出当前用户?', [
          { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
          { text: '确定', onPress: () => dispatch({ type: 'login/logout' }) },
        ])
        break;
      default: break;
    }
  }
  render() {
    const { userInfo } = this.state;
    const unionuser = app.getUnionuser();
    return (
      <Fragment>
        <div className={styles.headWrap}>
          <img onClick={() => this.handleItemClick('person')} src={app.fileUrl + unionuser.headImg} alt="" />
          <div className={styles.name}>{unionuser.nickname}</div>
        </div>
        <div className={styles.listWrap}>
          <div className={styles.listItem} onClick={() => this.handleItemClick('wallet')}>
            <div>我的钱包</div>
            <Icon type="right" style={{ fontSize: 14, color: '#999999' }} />
          </div>
          <div className={styles.listItem} onClick={() => this.handleItemClick('feedback')}>
            <div>意见反馈</div>
            <Icon type="right" style={{ fontSize: 14, color: '#999999' }} />
          </div>
          <div className={styles.listItem} onClick={() => this.handleItemClick('logout')}>
            <div>退出登录</div>
            <Icon type="right" style={{ fontSize: 14, color: '#999999' }} />
          </div>
        </div>
      </Fragment>
    );
  }
}
