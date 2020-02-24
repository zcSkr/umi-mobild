import React, { PureComponent, Fragment } from 'react';
import styles from './Index.less';
import { connect } from 'dva';
import { Icon, Button, Flex, Carousel, PullToRefresh, Toast, Modal, List } from 'antd-mobile';
import app from '@/config/app';

@connect(({ home, loading }) => ({
  home,
  loading: loading.effects['home/query'],
}))

export default class Index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    
  }


  render() {
    let {
      loading
    } = this.props;
    return (
      <Fragment>
        
        123
      </Fragment>
    );
  }
}
