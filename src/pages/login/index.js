import React, { Component } from 'react';
import { connect } from 'dva';
import './index.less';
import classNames from 'classnames';
import { Toast, Modal, Button, List } from 'antd-mobile';
import { CSSTransition } from 'react-transition-group';
import router from 'umi/router';
import { baseUrl } from '@/utils/baseServer';

// @connect(({ login }) => ({ login }))
class LoginNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phone: '', // 电话
      phoneIsFocus: false, // 是否获取焦点
      phoneError: false, // 电话是否格式错误
      imgCode: '', // 图形验证码
      imgCodeIsFocus: false, // 是否获取焦点
      imgCodeError: false, // 图形验证码是否图形错误
      phoneCode: '', // 短信验证码
      phoneCodeIsFocus: false, // 是否获取焦点
      codeText: '获取验证码',
      isWait: false, // 是否在倒计时
      codeImageUrl: '', // 验证码图片
      visible: false
    };
    this.getCode = this.getCode.bind(this)
    this.submit = this.submit.bind(this)
  }

  componentWillMount() {
    // 获取图形验证码
    this.refreshCodeImage();

  }

  // 协议弹窗
  showProtocol() {
    this.setState({
      visible: true
    });
  }
  close(v) {
    this.setState({
      visible: false
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }

  /**
   * 刷新图形验证码
   */
  refreshCodeImage() {
    console.log('刷新图形验证码！！')
  }

  /**
   * 倒计时
   */
  setTime() {
    this.setState({ isWait: true });
    let countdown = 60
    this.setState({ codeText: countdown + 's' });
    this.timer = setInterval(() => {
      if (countdown === 0) {
        this.setState({
           codeText: '重新获取',
           isWait: false
        });
        this.refreshCodeImage();
        clearInterval(this.timer);
      } else {
        countdown--
        this.setState({ codeText: countdown + 's' });
      }
    }, 1000)
  }

  /**
   * 获取短信验证码
   *  @return {Boolean} 当信息不完整时退出
   */
  getCode() {
    const { phone, phoneCode, imgCode } = this.state;
    const { dispatch } = this.props;
    if (this.state.isWait) {
      return false
    }
    if (!this.checkData()) return

    Toast.success('验证码发送成功', 2);
    // 接口成功发送验证码并倒计时
    this.setTime()
  }

  /**
   * 登录
   * @return {Boolean} 当信息不完整时退出
   */
  submit() {
    router.push('/home')
  }

  /**
   * 校验表单
   * @return {Boolean} 当信息不完整时退出
   */
  checkData() {
    if (!this.state.phone) {
      Toast.fail('请输入手机号码', 2);
      return false
    }
    if (!/^1[3456789]\d{9}$/.test(this.state.phone)) {
      Toast.fail('请输入正确的手机号', 2);
      this.setState({ phoneError: true });
      return false
    }
    if (!this.state.imgCode) {
      Toast.fail('请输入图形验证码', 2);
      return false
    }
    if (!/^[a-zA-Z0-9]{4,5}$/.test(this.state.imgCode)) {
      Toast.fail('图形验证码不正确', 2);
      this.setState({ imgCodeError: true });
      return false
    }
    return true
  }

  componentDidUpdate(prevProps, prevState) {
    // watch监听实时校验表单
    if (prevState.phone !== this.state.phone) {
      if (/^1[3456789]\d{9}$/.test(this.state.phone)) {
        this.setState({ phoneError: false });
      }
    }
    if (prevState.imgCode !== this.state.imgCode) {
      if (/^[0-9]{4}$/.test(this.state.imgCode)) {
        this.setState({ imgCodeError: false });
      }
    }
  }

  render() {
    const {phone, phoneIsFocus, phoneError, imgCode, codeImageUrl, imgCodeIsFocus, imgCodeError, phoneCode, phoneCodeIsFocus, codeText, isWait} = this.state;
    return (
      <div className="login-bg">
        <div className="logo-wrap">
          <div className="logo"></div>
          <div className="welcome-wrap">
            <div className="hello">您好!</div>
            <div className="welcome">欢迎来到<span>UMI项目</span></div>
          </div>
        </div>
        <div className="form-wraper">
          <div className={classNames('input-wrap')}>
            <CSSTransition
              in={phone.length > 0}
              timeout={400}
              classNames="fade"
              unmountOnExit
            >
              <span>手机号</span>
            </CSSTransition>
            <CSSTransition
              in={phone.length > 0}
              timeout={400}
              classNames="input"
            >
            <input
              className={ phoneError ? 'error' : ''}
              value={phone}
              onChange={e => {
                if(e.target.value.length <= 11) {
                  this.setState({ phone: e.target.value })
                }
              }}
              onFocus={() => {
                this.setState({ phoneIsFocus: true });
              }}
              onBlur={() => {
                this.setState({ phoneIsFocus: false });
              }}
              type="text"
              placeholder="请输入手机号"/>
            </CSSTransition>
          </div>
          <Line show={phoneIsFocus}/>
          <div className={classNames('input-wrap-flex', 'margin-top-20')}>
            <div className="left">
              <CSSTransition
                in={imgCode.length > 0}
                timeout={400}
                classNames="fade"
                unmountOnExit
              >
                <span>图形验证码</span>
              </CSSTransition>
              <CSSTransition
                in={imgCode.length > 0}
                timeout={400}
                classNames="input"
              >
              <input
                className={ imgCodeError ? 'error' : ''}
                value={imgCode}
                onChange={e => {
                  this.setState({ imgCode: e.target.value });
                }}
                onFocus={() => {
                  this.setState({ imgCodeIsFocus: true });
                }}
                onBlur={() => {
                  this.setState({ imgCodeIsFocus: false });
                }}
                type="text"
                placeholder="请输入图像验证码"/>
              </CSSTransition>
            </div>
            <div className="right">
              <img className="img-code" src={require('../../assets/verify-code.jpg')} />
              <span className="refresh" onClick={() => {this.refreshCodeImage()}}></span>
            </div>
          </div>
          <Line show={imgCodeIsFocus}/>
          <div className={classNames('input-wrap-flex', 'margin-top-20')}>
            <div className="left">
              <CSSTransition
                in={phoneCode.length > 0}
                timeout={400}
                classNames="fade"
                unmountOnExit
              >
                <span>短信验证码</span>
              </CSSTransition>
              <CSSTransition
                in={phoneCode.length > 0}
                timeout={400}
                classNames="input"
              >
              <input
                value={phoneCode}
                onChange={e => {
                  this.setState({ phoneCode: e.target.value });
                }}
                onFocus={() => {
                  this.setState({ phoneCodeIsFocus: true });
                }}
                onBlur={() => {
                  this.setState({ phoneCodeIsFocus: false });
                }}
                type="text"
                placeholder="请输入短信验证码"/>
              </CSSTransition>
            </div>
            <div className="right">
              <span className={classNames('code-info', {'gray-info': isWait, 'active-info': codeText === '重新获取'})}
                    onClick={this.getCode}>{codeText}</span>
            </div>
          </div>
          <Line show={phoneCodeIsFocus}/>
        </div>
        <div className="login-wrap">
          <div className="login" onClick={this.submit}>登录/注册</div>
        </div>
        <p className="agree-wrap" onClick={(e) => {
          this.showProtocol();
        }}>登录或注册即代表您已同意<span className="agree">《用户注册协议》</span></p>
        {/*----协议----*/}
        <Modal
          popup
          visible={this.state.visible}
          animationType="slide-up"
          className="modal-service"
          platform={'android'}
          onClose={this.onClose('visible')}
          footer={[{ text: '确 定', onPress: () => { console.log('ok'); this.onClose('visible')(); } }]}
        >
          <div className="modal-coupon-center" style={{height: 360}}>
            <iframe
              ref={(f) => {
                this.iframe = f;
              }}
              width="100%"
              height="100%"
              frameBorder={0}
              src="https://umijs.org/zh/guide/"
            />
          </div>
        </Modal>
      </div>
    );
  }
}

// 分割线动画组件
class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render() {
    return (
      <div className="line-wrap">
        <CSSTransition
          in={this.props.show}
          timeout={500}
          classNames="line"
        >
          <div className="line"></div>
        </CSSTransition>
      </div>
    )
  }
}
export default LoginNew
