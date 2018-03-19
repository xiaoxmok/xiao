import {getSongKeys} from "api/song";
import {ERR_OK} from "api/config";

export default class Song {
  /**
   *
   * @param id 歌曲id
   * @param mid 歌曲mid
   * @param singer 演唱者
   * @param name 歌曲名
   * @param album 专辑名
   * @param duration 歌曲长度
   * @param image 专辑图片
   * @param url 链接
   */
  constructor({id, mid, singer, name, album, albummid, duration, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.albummid = albummid
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}

// 创建一个工厂方法
export function createSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    albummid: musicData.albummid,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=202324981&vkey=${musicData.key}&uin=0&fromtag=999`
  })
}

// 注：上面的url已无效了，不使用指获取vkey值，性能太慢，，目前只通过单曲获取vkey值

// https://thirdparty.gtimg.com/102636799.m4a?fromtag=38
// http://dl.stream.qqmusic.qq.com/C400004dADLe4ec8RG.m4a?vkey=F3D4A1BD8F63B8739A39BF9EEE1117B472C8D2720BBB7AA175AD61FF92B5EC7CE190A846C1953EE79F77EAA554A266747C9BFC385F74D1A7&guid=202324981&uin=237363402&fromtag=66
// http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46

// http://dl.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?guid=202324981&vkey=${_getSongKeys(musicData.songid)}&uin=0&fromtag=999


/**
 * singer的数据结构原先是一个对象，需要取一个字符串类型，当存在多个name的时候，需要中间需要‘/’分开。
 *
 * @param singer
 * @returns {string}
 */
function filterSinger(singer) {
  let ret = []
  // 边界处理
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}


