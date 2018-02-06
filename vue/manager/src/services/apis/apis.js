import axios from 'axios'

/**
 * 登录
 * @param account 账号
 * @param password 密码
 */
export const login = (obj) => {
  // return axios.post('/member/v1/login', obj)
  return new Promise(function (resolve) {
    resolve({
      status: true,
      data: {
        token: 'mocktoken'
      }
    })
  })
}

/**
 * 查询的接口
 */
export const getOrderList = (obj) => {
  // return axios.post('/member/v1/getOrderList', obj)
  return new Promise(function (resolve) {
    resolve([
      {
        uuid: '213g213yu21y3y',
        corderno: 'testcorderno1',
        clinename: '线路1',
        cwapusername: '赵钱孙李',
        iqty: '20',
        dbgndate: '2017-12-01',
        denddate: '2017-12-02',
        istandardduration: 2,
        drealbgndate: '2017-12-01',
        drealenddate: '2017-12-01',
        namount: '400',
        csource: '线上预定',
        ccomplainflag: 0,
        corderstatus: '40',
        ccomplainstatus: '30',
        dcreate: '2017-12-03'
      }
    ])
  })
}

/**
 * 表单：新增
 */
export const addForm = (obj) => {
  // return axios.post('/member/v1/add', obj)
  return new Promise(function (resolve) {
    resolve({
      status: true
    })
  })
}
