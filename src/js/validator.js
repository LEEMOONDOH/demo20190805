//element rules验证邮箱
export var reg_email = (rule, value, callback) => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!value) {
    callback(new Error('请输入邮箱'));
  } else {
    let check = reg.test(value);
    if (!check) {
      callback(new Error('邮箱格式错误'))
    } else {
      return true,
        callback()
    }
  }
}


//验证密码
export var reg_password = (rule, value, callback) => {
  const reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{8,18}$/;
  if (!value) {
    callback(new Error('请输入密码'));
  } else {
    let check = reg.test(value);
    if (!check) {
      callback(new Error('密码格式错误'))
    } else {
      callback()
    }
  }
}
// 自定义校验
export function is_email(value) {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
  if (!value) {
    return {
      code: 1,
      msg: '请输入邮箱',
      res: false,
    }
  } else {
    let check = reg.test(value);
    if (!check) {
      return {
        code: 2,
        msg: '邮箱格式错误',
        res: false,
      };
    } else {
      return {
        code: 0,
        msg: '邮箱格式正确',
        res: true,
      }
    }
  }
}
// 校验密码
export function is_password(value) {
  const reg = /^(?![a-zA-Z]+$)(?![0-9]+$)[A-Za-z0-9]{8,18}$/;
  if (!value) {
    return {
      code: 1,
      msg: '请输入密码',
      res: false,
    }
  } else {
    let check = reg.test(value);
    if (!check) {
      return {
        code: 2,
        msg: '密码格式错误',
        res: false,
      };
    } else {
      return {
        code: 0,
        msg: '密码格式正确',
        res: true,
      }
    }
  }
}
