<template>
  <transition name="slide">
    <div class="singer-detail">222</div>
  </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from "api/singer";
  import {ERR_OK} from "api/config";

  export default {
    name: "singer-detail",
    computed: {
      ...mapGetters([
        'singer'
      ])
    },
    created() {
      this._getDetail()
      console.log(this.singer);
    },
    methods: {
      _getDetail() {
        // 边界情况，当在歌手详情页面刷新时，不会获取到this.singer.id，所以刷新后返回前一页面。
        // 因为this.singer.id是歌手页面通过路由传过来的。
        if(!this.singer.id){
          this.$router.push('/singer')
          return
        }
        getSingerDetail(this.singer.id).then((res)=>{
          if(res.code === ERR_OK){
            console.log(res.data);
          }
        })
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
