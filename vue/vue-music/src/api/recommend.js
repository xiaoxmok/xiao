import jsonp from 'common/js/jsonp'
import {commonParams, options} from "./config";
import axios from 'axios'

// 获取推荐的轮播图
export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1
  })

  return jsonp(url, data, options)
}

// 获取歌单数据，由于歌单数据需要使用服务端代理，
export function getDiscList() {
  const url = '/api/getDiscList'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    sin: 0,
    ein: 29,
    sortId: 5,
    needNewCode: 0,
    categoryId: 10000000,
    rnd: Math.random(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}

// 获取MV数据，
export function getQQMusicMv() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/getmv_by_tag'

  const data = Object.assign({}, commonParams, {
    platform: 'yqq',
    hostUin: 0,
    notice: 0,
    needNewCode: 0,
    cmd: 'shoubo',
    lan: 'all'
  })

  return jsonp(url, data, options)
}

