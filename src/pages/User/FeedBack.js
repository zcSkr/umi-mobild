import React, { PureComponent, Fragment, Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Icon, Button, Flex, Modal, Tabs, Badge, TextareaItem, Toast, Picker, DatePicker } from 'antd-mobile';
import moment from 'moment';
import numeral from 'numeral';
import styles from './FeedBack.less';
import { isEmpty } from 'underscore';
const alert = Modal.alert;

@connect(({ mine, sys, login }) => ({
  mine,
  sys,
  login
}))
export default class FeedBack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbackValue: "" //反馈的内容
    }
  }
  handleFeedBackChange = val => {
    // console.log(e)
    this.setState({feedbackValue: val})
  }
  handleSubmitFeedBack = () => {
    const { dispatch } = this.props;
    const { feedbackValue } = this.state;
    if(isEmpty(feedbackValue)) {
      Toast.fail('请填写意见反馈')
      return;
    }
    dispatch({
      type: 'mine/service',
      payload: {
        service: 'feedBack',
        data: {
          content: feedbackValue
        }
      },
      onSuccess: res => {
        console.log(res)
        if(res.resultState == '1'){
          this.setState({feedbackValue: ''})
          Toast.success('反馈成功')
        } else {
          Toast.fail(res.msg)
        }
      }
    })
  }
  render() {

    return (
      <Fragment>
        <div className={styles.title}><img src={require('../../assets/圆角矩形3@2x.png')} alt="" />意见反馈</div>
        <div className={styles.textWrap}>
          <TextareaItem
            placeholder="请填写您的意见反馈"
            value={this.state.feedbackValue}
            onChange={this.handleFeedBackChange}
            style={{ paddingRight: '0.4rem',fontSize: '0.4rem' }}
            autoHeight
            rows={6}
          />
        </div>
        <div style={{textAlign: 'center',padding: '0 1rem',marginTop: '7.65rem'}}>
          <Button onClick={this.handleSubmitFeedBack} type="primary" size="large" style={{color: '#fff',textDecoration: 'none'}}>提交</Button>
        </div>
      </Fragment>
    );
  }
}
