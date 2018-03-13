<template>
  <transition name="slide">
    <div class="singer-detail">222</div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "api/singer";
  import {ERR_OK} from "api/config";
  import {createSong,isValidMusic,processSongsUrl} from "common/js/song";
  import {getSongKeys} from "api/song";

  export default {
    name: "singer-detail",
    data() {
      return {
        songs: []
      }
    },
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()

      // console.log(this.songs.albummid)
    },
    methods: {
      _getDetail() {
        // 边界情况，当在歌手详情页面刷新时，不会获取到this.singer.id，所以刷新后返回前一页面。
        // 因为this.singer.id是通过路由传递的，所以在刷新页面时该值为空。
        if (!this.singer.id) {
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res) => {
          if (res.code === ERR_OK) {
            console.log(res.data);
            this.songs = this._normalizeSongs(res.data.list)
            console.log(this.songs);

          }
        })
      },
      _normalizeSongs(list) {
        let ret = []
        list.forEach((item) => {
          let {musicData} = item
          if(musicData.songid && musicData.albummid){
            //console.log(musicData)
            getSongKeys(musicData.songmid,`C400${musicData.songmid}.m4a`).then((res)=>{
              if(res.code === ERR_OK){
                musicData.key = res.data.items[0].vkey
                //console.log(res.data.items[0].vkey)
                ret.push(createSong(musicData))
              }
            })
            //this._getSongKeys(musicData.songid)
          }
        })
        return ret
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import '~common/stylus/variable'
  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background

  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>
