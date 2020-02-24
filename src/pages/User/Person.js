import React, { PureComponent, Fragment, Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Icon, Button, Flex, Modal, Tabs, Badge, TextareaItem, Toast, Picker, DatePicker } from 'antd-mobile';
import moment from 'moment';
import styles from './Person.less';
import { isEmpty, isNumber, isBoolean } from 'underscore';
import app from '@/config/app';
const alert = Modal.alert;

@connect(({ mine, sys, login }) => ({
  mine,
  sys,
  login
}))
export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorValue: ['#00FF00'],
      sexArray: [
        {
          label: '女',
          value: '0',
        },
        {
          label: '男',
          value: '1',
        }
      ],
      entity: {
        headImg: '',
        nickName: '',
        sex: '',
        birthday: ''
      },
      userInfo: {},
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
    dispatch(routerRedux.push('/person/upload'))
  }

  handleChangeValue = (action, value) => {
    console.log(action, value)
    let { entity } = this.state;
    switch (action) {
      case 'sex':
        entity.sex = Number(value[0])
        break;
      case 'nickname':
        entity.nickname = value.target.value
        break;
      case 'birthday':
        entity.birthday = moment(value).format('YYYY-MM-DD')
        // console.log(moment(value).format('YYYY-MM-DD'))
        break;
      default: break;
    }

    this.setState({ entity })
  };

  handleSave = () => {
    const { dispatch } = this.props
    const { entity } = this.state
    console.log(entity)
    if (isEmpty(entity.nickname)) {
      Toast.info('昵称不能为空')
      return
    } else if (isBoolean(entity.sex)) {
      Toast.info('请选择性别')
      return
    } else if (isEmpty(entity.birthday)) {
      Toast.info('请选择生日')
      return
    }
    dispatch({
      type: 'mine/service',
      payload: {
        service: 'updateUserInfo',
        data: {
          nickname: entity.nickname,
          sex: entity.sex,
          birthday: entity.birthday
        }
      },
      onSuccess: res => {
        console.log(res)
        if (res.resultState == '1') {
          Toast.success('保存成功')
          // this.setState({userInfo: res.data, entity: res.data })
        } else {
          Toast.fail(res.msg)
        }
      }
    })
  }

  render() {
    const { sexArray, entity, userInfo } = this.state;
    const unionuser = app.getUnionuser();
    return (
      <Fragment>
        <div className={styles.listWrap}>
          <div className={styles.listItem} style={{ marginBottom: '0.25rem', borderBottom: 0 }}>
            <div>账号</div>
            <div>{userInfo.account}</div>
          </div>
          <div className={styles.listItem} onClick={() => this.handleItemClick('head')}>
            <div>头像</div>
            <div>
              <img className={styles.avatar} src={app.fileUrl + entity.headImg} alt="" />
              <Icon type="right" style={{ fontSize: 14, color: '#999999' }} />
            </div>
          </div>
          <div className={styles.listItem}>
            <div>昵称</div>
            <div>
              <input onBlur={e => document.getElementById('content').scrollIntoView()} className={styles.nickName} value={entity.nickname} onChange={this.handleChangeValue.bind(this, 'nickname')} maxLength="11" type="text" placeholder="请输入昵称" />
              <Icon type="right" style={{ fontSize: 14, color: '#999999' }} />
            </div>
          </div>
          <Picker
            data={sexArray}
            value={[entity.sex]}
            cols={1}
            onChange={this.handleChangeValue.bind(this, 'sex')}
          >
            <div className={styles.listItem}>
              <div>性别</div>
              <div>
                <div>{isNumber(entity.sex) ? sexArray[entity.sex].label : <span style={{ color: '#777' }}>请选择</span>}</div>
                <Icon type="right" style={{ fontSize: 14, color: '#999999' }} />
              </div>
            </div>
          </Picker>
          <DatePicker
            mode="date"
            title="选择生日"
            format='YYYY-MM-DD'
            minDate={new Date('1900-01-01')}
            maxDate={new Date()}
            value={new Date(entity.birthday)}
            onChange={this.handleChangeValue.bind(this, 'birthday')}
          >
            <div className={styles.listItem} style={{ borderBottom: 0 }}>
              <div>生日</div>
              <div>
                <div>{entity.birthday ? entity.birthday : <span style={{ color: '#777' }}>请选择</span>}</div>
                <Icon type="right" style={{ fontSize: 14, color: '#999999' }} />
              </div>
            </div>
          </DatePicker>

          <Button onClick={this.handleSave} type="primary" style={{marginTop: 50, color: '#fff'}}>保存</Button>
        </div>
      </Fragment>
    );
  }
}
