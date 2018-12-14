/**
 * 验证必填
 */
const require = (message) => {
  const msg = message || '必填';
  return { required: true, message: msg };
};

/**
 * 数字，中英文，中横线，下划线，utf-8中文
 */
const phone = (message) => {
  const msg = message || '请输入正确的手机号码';
  return { pattern: /^\d{3} \d{4} \d{4}$/, message: msg };
};

/**
 * 验证参数组件必填
 */
const verifyCode = (message, fn) => {
  const msg = message || '请输入六位数字';
  return { pattern: /^\d{6}$/, message: msg };
};


export default {
  require,
  phone,
  verifyCode,
}
