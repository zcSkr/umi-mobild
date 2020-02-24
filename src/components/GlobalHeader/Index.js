import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon } from 'antd';
import { Modal } from 'antd-mobile';
import Link from 'umi/link';
import styles from './Index.less';
import app from '@/config/app';

export default class GlobalHeader extends PureComponent {
  handleMine = () => {
    console.log(window.g_app._store)
    if (!app.getToken()) {
      Modal.alert('登录', '请先登录用户', [
        { text: '取消', onPress: () => console.log('cancel'), style: 'default' },
        { text: '确定', onPress: () => window.g_app._store.dispatch(routerRedux.push('/user/login')) },
      ])
      // Modal.confirm({
      //   title: '登录',
      //   content: '请先登录用户',
      //   icon: 'info-circle',
      //   cancelText: '取消',
      //   okText: '确定',
      //   onOk: () => {
      //     window.g_app._store.dispatch(routerRedux.push('/user/login'));
      //   }
      // });
    } else {
      window.g_app._store.dispatch(routerRedux.push('/mine'));
    }
  }

  render() {
    return (
      <div className={styles.headerWrap}>
        <div className={styles.imgWrap} style={{left: 0,right: 'auto'}}><Link to="/"><Icon type="home" style={{color:'#fff',fontSize: '0.6rem'}} /></Link></div>
        <div>序列号查询</div>
        <div onClick={this.handleMine} className={styles.imgWrap}><img src={require('../../assets/用户@2x.png')} alt=""/></div>
      </div>
    );
  }
}

