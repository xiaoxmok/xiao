import jsonp from 'common/js/jsonp'
import {commonParams, options} from "./config";
import axios from "axios/index";

export function getSongs(albummid) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_album_info_cp.fcg'

  const data = Object.assign({}, commonParams, {
    albummid: albummid,
    g_tk: 1461780942,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    notice: 0
  })

  return jsonp(url, data, options)
}

export function getSongKeys111(songid) {
  const url = 'http://c.y.qq.com/base/fcgi-bin/fcg_musicexpress.fcg'

  const data = Object.assign({}, commonParams, {
    guid: songid,
    g_tk: 1461780942,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    notice: 0,
    loginUin:0,
    json:3
  })

  return jsonp(url, data, options)
}

/**
 * 通过代码获取QQ音乐的key值
 *
 * @param songmid
 * @param filename
 * @returns {Promise<AxiosResponse<any>>}
 */
export function getSongKeys(songmid, filename) {

  //const url = 'https://c.y.qq.com/base/fcgi-bin/fcg_music_express_mobile3.fcg'
  const url = '/api/getSongKeys'

  const data = Object.assign({}, commonParams, {
    songmid: songmid,
    filename: filename,
    g_tk: 1461780942,
    hostUin: 0,
    platform: 'yqq',
    needNewCode: 0,
    notice: 0,
    guid: 202324981,
    cid:205361747,
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res)=>{
    return Promise.resolve(res.data)
  })
}
