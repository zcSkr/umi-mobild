import React, { Component } from 'react';
import { routerRedux } from 'dva/router';
import { connect } from 'dva';
import { Tabs, WhiteSpace, Badge, Button, Toast } from 'antd-mobile';
import styles from './uploadImg.less';
import { isEmpty, isEqual } from "underscore";
import Cropper from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import app from '@/config/app';
import EXIF from "@/utils/exif";
// console.log(EXIF)
@connect(({ mine }) => ({
  mine
}))

export default class UploadImg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // src: 'http://gg.ccyskj.com/ad/uploadFile/pointimg/9f03c898b9364383926cef060af41bda.jpg'
      // src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png'
      // src: 'http://img1.imgtn.bdimg.com/it/u=135010490,3148314803&fm=27&gp=0.jpg',
      src: '',
    }
  }
  componentWillMount() {
    const { dispatch } = this.props;
    let unionuser = app.getUnionuser();

    dispatch({
      type: 'mine/service',
      payload: {
        service: 'queryUserInfo'
      },
      onSuccess: res => {
        console.log(res)
        if(res.resultState == '1'){
          this.setState({src: app.fileUrl + res.data.headImg })
        }
      }
    })

  }
  _crop = () => {
    // image in dataUrl
    let src = this.refs.cropper.getCroppedCanvas().toDataURL();
    this.setState({ uploadSrc: src })
    console.log(this.refs.cropper.getCroppedCanvas().toDataURL());
  }
  handleFileInput = (e) => {
    const componentThis = this;
    console.log(e.target.files[0])
    let file = e.target.files[0]
    // let EXIF = window.EXIF;
    let Orientation = null;
    let needRotate = false;
    EXIF.getData(file, function () {
      // alert(EXIF.pretty(this)); 
      EXIF.getAllTags(this);
      //  alert(EXIF.getTag(this, 'Orientation'));  
      Orientation = EXIF.getTag(this, 'Orientation');
      //  alert(Orientation)
      if (Orientation && Orientation == '6') {
        needRotate = true;
      } 
      //return; 
    });

    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (ee) {
      // e.target.result就是图片的base64地址信息
      // img.src = e.target.result;
      // console.log(ee.target.result)
      var img = new Image();
      img.src = ee.target.result;
      img.onload = function () {
        var that = this;
        // console.log(123)
        // 默认按比例压缩
        var w = that.width,
          h = that.height,
          scale = w / h;
        var quality = 0.1;  // 默认图片质量为0.7
        //生成canvas
        var canvas = document.createElement('canvas');
        var ctx = canvas.getContext('2d');
        // 创建属性节点
        var anw = document.createAttribute("width");
        anw.nodeValue = w;
        var anh = document.createAttribute("height");
        anh.nodeValue = h;
        canvas.setAttributeNode(anw);
        canvas.setAttributeNode(anh);
        ctx.drawImage(that, 0, 0, w, h);

        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality);
        // console.log(base64)
        
        componentThis.setState({ src: base64 },() => {
          console.log(123)
          componentThis.refs.cropper.rotateTo(needRotate ? 90 : 0)
        })
      };
    }

  }
  handleSubmit = () => {
    const { dispatch } = this.props;
    let src = this.refs.cropper.getCroppedCanvas().toDataURL()
    if (src == '') {
      Toast.info('请选择图片', 1)
      return;
    }
    if (this.state.isFirstSubmit) {
      return;
    }
    let headImgFile = this.convertBase64UrlToBlob(src);
    // let headImgFile = this.convertBase64UrlToBlob(this.state.uploadSrc);
    console.log(headImgFile)
    let unionuser = app.getUnionuser();

    Toast.loading('图片上传中', 0)
    this.setState({ isFirstSubmit: true })
    // 上传文件
    dispatch({
      type: 'mine/service',
      payload: {
        service: 'updateFile',
        data: { file: headImgFile }
      },
      onSuccess: (res) => {
        const { uploadSrc } = this.state;
        console.log(res)
        if (res.resultState == '1') {
          let headImg = res.data
          // 更新头像
          dispatch({
            type: 'mine/service',
            payload: {
              service: 'updateUserInfo',
              data: { headImg: res.data }
            },
            onSuccess: (res) => {
              console.log(res)
              if (res.resultState == '1') {
                // Toast.hide()
                Toast.success('上传成功', 1)
                unionuser.headImg = headImg
                app.setUnionuser(unionuser);
                // app.setToken(res.data.token);
                dispatch(routerRedux.goBack());
              } else {
                Toast.fail(res.msg, 1)
              }
            },
          })
          
        } else {
          Toast.fail(res.msg, 1)
        }
      },
      onComplete: () => {
        Toast.hide()
      }
    })
  }
  convertBase64UrlToBlob = (urlData) => {

    var bytes = window.atob(urlData.split(',')[1]);        //去掉url的头，并转换为byte  

    //处理异常,将ascii码小于0的转换为大于0  
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
      ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
  }
  render() {
    return (
      <div style={{ height: '100vh', width: '100%', position: 'relative' }}>
        {
          this.state.src != '' ?
            <Cropper
              ref='cropper'
              src={this.state.src}
              style={{ height: '100%', width: '100%' }}
              aspectRatio={1}
              guides={true}
              // checkOrientation={true}
              rotatable={true}
              scalable={true}
              // crop={this._crop} 
              >
              <div>123456</div>
            </Cropper> : null
        }


        <div className={styles.buttonGroup}>
          <div className={styles.button} style={{borderRadius: 0,outline: 'none'}}>
            选取图片
              <input type="file" accpet='image/*' className={styles.fileInput} onChange={this.handleFileInput} />
          </div>
          <div onClick={this.handleSubmit} className={styles.button}  style={{borderRadius: 0,outline: 'none'}}>上传头像</div>
        </div>
      </div>
    );
  }
}