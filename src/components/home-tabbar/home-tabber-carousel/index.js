import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import styles from './index.less'
import { connect } from 'dva';
import router from 'umi/router';

class HomeTabbarCarousel extends Component{
  constructor(props){
    super(props)
    this.state = {
      data: ['1', '2', '3'],
      imgHeight: 176,
      slideIndex: 0
    }
  }
  bannerLink(link){
    router.push('/class')
  }
  render() {
    const { bannerItem } = this.props;
    console.log(bannerItem)
    return (
      <Carousel
          autoplay={true}
          infinite
          selectedIndex={0}
          className={styles.space_carousel}
        >
        {(this.props.bannerItem ? this.props.bannerItem : []).map((val,index)  => (
          <a
            key={index}
            onClick={() => this.bannerLink(val.url)}
            style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
          >
            <img
              src={require('../../../assets/2c3968e33e2342feaa9fa3695b2e169e.png')}
              alt=""
              style={{ width: '100%', verticalAlign: 'top' }}
              onLoad={() => {
                window.dispatchEvent(new Event('resize'));
                this.setState({ imgHeight: 'auto' });
              }}
            />
          </a>
        ))}
      </Carousel>
    )
  }
}

export default HomeTabbarCarousel
