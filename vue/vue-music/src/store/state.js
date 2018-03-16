import {playMode} from "common/js/config";

const state = {
  singer: {},
  playing: false,
  fullScreen: false,
  playList: [],       //播放列表
  sequenceList: [],   //顺序、随便、单曲
  mode: playMode.sequence,
  currentIndex: -1
}

export default state
