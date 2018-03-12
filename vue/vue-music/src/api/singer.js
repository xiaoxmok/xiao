import jsonp from 'common/js/jsonp'
import {commonParams, options} from "./config";

// 获取歌手数据
export function getSingerList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    g_tk: 1461780942,
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0
  })

  return jsonp(url, data, options)
}

// 获取歌手详情
export function getSingerDetail(singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'

  const data = Object.assign({}, commonParams, {
    hostUin: 0,
    g_tk: 1461780942,
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    singermid: singerId,
    order: 'listen',
    begin: 0,
    num: 100,
    songstatus: 1
  })

  return jsonp(url, data, options)
}
