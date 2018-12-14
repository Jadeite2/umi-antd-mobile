import React, { Component } from 'react';
import { connect } from 'dva';
import { SearchBar, Modal, Flex } from 'antd-mobile';
import HomeCarousel from '../../components/home-tabbar/home-tabber-carousel'
import Link from 'umi/link';
import router from 'umi/router';
import styles from './index.less';

@connect(({ home }) => ({ home }))
class Home extends Component {
  constructor(props) {
      super(props)
      this.state = {
        banner: [],
        icon: [],
        tab: [],
        bottomBanner: [],
        loinBannerList: [],
        cardLists: [],
        tofobanner: [],
        visible: false,
      }
    }
  render() {
    const { home } = this.props;
    return (
      <div className='homePage'>
        <div className='homePage_search'>
          <div className='homePage_input'>
            <SearchBar
              placeholder="搜索你想要的商品"
              ref={ref => this.manualFocusInst = ref}
              onFocus={() => router.push('/search')}
            />
          </div>
          <div className='homePage_search_ico' onClick={() => router.push('/class')}>
            <img src={require('../../assets/icon-classify.png')}/>
          </div>
          {
           home.list.bannerList && home.list.bannerList.length !== 0 ?
            <HomeCarousel bannerItem={home.list.bannerList} />
            : ""
          }
        </div>
        <div className='stepBlock'>
          <div className='stepBlocktitle'>四步变现</div>
          <img className='stepBlockimg' onClick={() => router.push('/class')} src={require('../../assets/recycleH5_01.png')} alt="" />
        </div>
        <div className='stepBlock hotMobileBlock'>
          <div className='stepBlocktitle'>热门机型</div>
          <Flex className='hotMobile_block'>
            <Flex.Item><div className='hotMobile' onClick={() => router.push('/class?brand=52')}><div  className='hotMobile_icon'></div>苹果</div></Flex.Item>
            <Flex.Item><div className='hotMobile' onClick={() => router.push('/class?brand=4')}><div  className='hotMobile_icon oppo'></div>OPPO</div></Flex.Item>
            <Flex.Item><div className='hotMobile' onClick={() => router.push('/class?brand=16')}><div  className='hotMobile_icon vivo'></div>VIVO</div></Flex.Item>
            <Flex.Item><div className='hotMobile' onClick={() => router.push('/class?brand=9')}><div  className='hotMobile_icon huawei'></div>华为</div></Flex.Item>
          </Flex>
        </div>
        <div className='itemList itemList2'>
          <div className='itemListtitle'>热门回收<div className='gotoMore' onClick={() => router.push('/class')}>更多<img src="https://res.zudeapp.com/wximage/right_arrow.png" alt=""/></div></div>
          <div className='hotlist'>
            {
              home.list.productList && home.list.productList.length !== 0 ? home.list.productList.map((val)=>(
                <div className='itemBlock' key={val.id} onClick={() => {console.log('去商品')}}>
                  <div className='product_img'>
                    <img className='img' src={require('../../assets/5a28b40bc60057c40a000005.png')} />
                  </div>
                  <span className='text_ellipsis'>{val.productName}</span>
                  <div className='priceBox'>最高回收价 <span className='price'>¥{val.topPrice}</span></div>
                  <div className='btn' >立即回收</div>
                </div>
              ))
             : ""
            }
          </div>
        </div>
        <Modal
            visible={this.state.visible}
            transparent
            closable={true}
            maskClosable={true}
            className="modal-shool"
            onClose={() => this.onClose()}
          >
          <img src="http://res.zudeapp.com/allh5/buyput-renew-icon.png" alt="" onClick={() => router.push("/indexActivity")} />
        </Modal>
      </div>
    )
  }
}


export default Home;
