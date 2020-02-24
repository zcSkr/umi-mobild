import React, { PureComponent, Fragment, Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Icon, Button, Flex, Modal, Tabs, Badge, TextareaItem, Toast, Picker, DatePicker } from 'antd-mobile';
import moment from 'moment';
import numeral from 'numeral';
import styles from './Wallet.less';
import { isEmpty } from 'underscore';
import app from '@/config/app';
import { inWeixinBroswer, pay, config, ready } from '@/utils/weixin';
const alert = Modal.alert;

@connect(({ mine, sys, login }) => ({
  mine,
  sys,
  login
}))
export default class Wallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      packageBuy: [], //套餐价格
      selectPrice: {}, //选择的价格
      selectPayWay: ''
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
        // console.log(res)
        if (res.resultState == '1') {
          let balance = res.data.balance
          let unionuser = app.getUnionuser()
          unionuser.balance = balance
          app.setUnionuser(unionuser)
          this.setState({ userInfo: res.data, entity: { ...res.data } })
        }
      }
    })
  }
  componentDidMount() {
    const { dispatch, location: { query } } = this.props
    this.queryUesrInfo()
    // 查询充值的价格
    dispatch({
      type: 'sys/service',
      payload: {
        service: 'queryBusinessParams',
        data: {
          type: 'packageBuy'
        }
      },
      onSuccess: res => {
        console.log(res)
        if (res.resultState == '1') {
          this.setState({ packageBuy: res.data })
          // dispatch({type: 'sys/save',payload: { contactPhone: res.data[0] }})
        }
      }
    });
  }

  handleSelectPrice = record => {
    // console.log(record)
    this.setState({ selectPrice: record })
  }
  handleSelectPayWay = selectPayWay => {
    this.setState({ selectPayWay })
  }
  handleRecharge = () => {
    const { dispatch } = this.props;
    const { selectPrice, selectPayWay } = this.state;
    if (isEmpty(selectPrice)) {
      Toast.info('请选择套餐')
      return;
    } else if (isEmpty(selectPayWay)) {
      Toast.info('请选择支付方式')
      return;
    }
    console.log(window.location)
    let returnUrl = window.location.origin + '/' + window.location.hash
    // 非微信浏览器的支付方式
    // console.log(returnUrl)
    // return
    let postData = {
      objId: selectPrice.id,
      payWay: selectPayWay,
      returnUrl: returnUrl
    }
    if (selectPayWay == 'alipay') {
      postData.alipayPayType = 'wap'
    } else if (selectPayWay == 'wechat') {
      postData.wechatPayType = inWeixinBroswer() ? 'JSAPI' : 'MWEB'
    }
    if (inWeixinBroswer()) {
      postData.opendId = localStorage.openId
    }
    dispatch({
      type: 'sys/service',
      payload: {
        service: 'recharge',
        data: { ...postData }
      },
      onSuccess: res => {
        console.log(res)
        if (res.resultState == '1') {
          // 走真支付成功然后更新用户信息
          this.queryUesrInfo()
          if (selectPayWay == 'alipay') {
            let alipayConfig = res.data.payParams
            window.location.href = `https://openapi.alipay.com/gateway.do?${alipayConfig}&return_url=${returnUrl}`
          } else if (selectPayWay == 'wechat') {
            let wechatConfig = res.data.payParams
            localStorage.wallet = 'true'
            if (inWeixinBroswer()) {
              pay(wechatConfig, () => {
                // dispatch(routerRedux.push('/' + window.location.hash))
                window.location.href = returnUrl
              })
              return;
            }
            // 非微信浏览器支付方式
            window.location.href = wechatConfig.mweb_url + `&redirect_url=${returnUrl}`
          }
        } else {
          Toast.fail(res.msg)
        }
      }
    });
  }
  render() {
    const { userInfo, packageBuy, selectPrice, selectPayWay } = this.state;
    return (
      <Fragment>
        <div className={styles.walletWrap}>
          <div className={styles.wallet}>
            <div>账户总余额(元)</div>
            <div><span style={{ fontSize: '0.6rem' }}>¥</span>{numeral(userInfo.balance ? userInfo.balance : 0).format('0.00')}</div>
          </div>
        </div>
        <div className={styles.title}>充值</div>
        <div className={styles.chargeWrap}>
          {
            packageBuy.length > 0 && packageBuy.map((item, i) => (
              <div className={selectPrice.id == item.id ? styles.selected : ''} key={i} onClick={() => this.handleSelectPrice(item)}><div>{item.code}元</div><div>售价{numeral(item.value).format('0.00')}元</div></div>
            ))
          }
        </div>
        <div className={styles.title}>支付方式</div>
        <div className={styles.listItem} onClick={() => this.handleSelectPayWay('alipay')}>
          <div>
            <img src={require('../../assets/支付宝@2x.png')} alt="" />
            <div>支付宝支付</div>
          </div>
          {selectPayWay == 'alipay' ? <Icon type='check' color="#00A3FE" size='small' /> : null}
        </div>
        <div className={styles.listItem} onClick={() => this.handleSelectPayWay('wechat')}>
          <div><img src={require('../../assets/微信@2x.png')} alt="" />
            <div>微信支付</div>
          </div>
          {selectPayWay == 'wechat' ? <Icon type='check' color="#00A3FE" size='small' /> : null}
        </div>
        <div style={{ textAlign: 'center', padding: '0 1rem', margin: '1.63rem 0 1rem' }}>
          <Button onClick={this.handleRecharge} type="primary" size="large" style={{ color: '#fff', textDecoration: 'none' }}>充值</Button>
        </div>
      </Fragment>
    );
  }
}
