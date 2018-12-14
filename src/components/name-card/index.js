import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import styles from './index.less'
import { connect } from 'dva';
import router from 'umi/router';
import imgURL from '../../assets/default-pic.png';

class NameCard extends React.Component {
  constructor(props) {
    super(props);
  }
  link() {
    router.push('/login');
  }
  render() {
    const avatar = this.props.avatar || imgURL;
    if (this.props.notLogin === 1) {
      return (
       <div className={styles.name_content}>
         <div className={styles.content_card}>
           <img className={styles.avatar} src={avatar} alt="" />
           <div className={styles.content_name}>{this.props.name}</div>
         </div>
       </div>
     )
   } else {
     return (
      <div className={styles.name_content}
        onClick={() => this.link()}>
        <div className={styles.content_card}>
          <img className={styles.avatar} src={avatar} alt="" />
          <div className={styles.content_name}>{this.props.name}</div>
        </div>
      </div>
    )
   }
  }
}

export default NameCard;
