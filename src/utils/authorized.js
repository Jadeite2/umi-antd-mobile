import {connect} from 'dva';
import router from 'umi/router';

export default connect(props => {
  const logging_status = localStorage.getItem('authority') || false;
  return logging_status;
})(function Authority (props) {
  const {logging_status, route} = props;
  console.log(router.path,'path')
  if (logging_status) {
    console.log(11111)
  } else {
    console.log(22222)
  }
  return props.children;
})
