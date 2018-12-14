import React from 'react';
import { connect } from 'dva';
import styles from './index.less'

class OrderStatusItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={styles.order_status_item}>
        <div className={styles.order_status_item_image} onClick={e => this.props.onStatusClick(e)}>
          {this.props.count ? (
            <div className={styles.order_status_item_image_icon}>{this.props.count}</div>
          ) : (
            <div className={styles.order_status_item_image_icon_disable} />
          )}
          <img className={styles.order_status_item_image_content} src={this.props.url} alt="" />
        </div>
        <div className={styles.order_status_item_image_text}>{this.props.text}</div>
      </div>
    );
  }
}

export default OrderStatusItem;
