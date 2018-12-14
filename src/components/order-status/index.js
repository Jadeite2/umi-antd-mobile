import React, { Component } from 'react'
import { Carousel } from 'antd-mobile';
import styles from './index.less'
import { connect } from 'dva';
import router from 'umi/router';
import OrderStatusItem from '../order-status-item';
import recycleH5_14 from '../../assets/recycleH5_14.png';
import recycleH5_13 from '../../assets/recycleH5_13.png';
import recycleH5_16 from '../../assets/recycleH5_16.png';
import recycleH5_11 from '../../assets/recycleH5_11.png';

export default class OrderStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 订单状态
      statusItem: [
        {
          text: `待发货`,
          url: recycleH5_14,
          name:'waitingDeliveryCount',
          value: 1
        },
        {
          text: `待收货`,
          url: recycleH5_13,
          name: 'waitingReceiveCount',
          value: 2
        },
        {
          text: `待验机`,
          url: recycleH5_16,
          name:'waitingReviewCount',
          value: 3
        },
        {
          text: `待确认`,
          url: recycleH5_11,
          name:'waitingConfirmCount',
          value: 4
        },
      ],

      // 订单状态
      orderStatus: {}
    };
  }

  componentWillMount() {}
  orderMore(){
    console.log('跳转去更多哦')
  }
  render() {
    this.props.countList
    return (
      <div className={styles.order_deatil_info + ' ' + 'box_shadow'}>
        <div
          className={styles.orders}
          onClick={e => {
              this.orderMore();
            }
          }
        >
          <div className={styles.order_text_large}>我的订单</div>
          <div className={styles.order_text_right}>
            <span className={styles.right_content}>查看更多</span>
          </div>
        </div>
        <div className={styles.list}>
          {(this.state.statusItem ? this.state.statusItem : []).map((item, index) => {
            return (
              <OrderStatusItem
                count={this.props.countList && this.props.countList[item.name] !== 0 ? this.props.countList[item.name] : ""}
                key={index}
                text={item.text}
                url={item.url}
                onStatusClick={() =>{
                    console.log(`跳转到${item.text}`)
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
