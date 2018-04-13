<template>
    <div class="recommend" ref="recommend">
      <scroll ref="scroll" class="recommend-content" :data="disclist">
        <div>
          <div v-if="recommends.length" class="slider-wrapper">
            <slider>
              <div v-for="item in recommends" :key="item.id">
                <a :href="item.linkUrl">
                  <img class="needsclick" @load="loadImage" :src="item.picUrl" alt="">
                </a>
              </div>
            </slider>
          </div>
          <div class="recommend-list">
            <h1 class="list-title">热门歌曲推荐</h1>
            <!--<ul>
              <li v-for="item in disclist" class="item" :key="item.dissid">
                <div class="icon">
                  <img v-lazy="item.imgurl" width="60" height="60" alt="">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.creator.name"></h2>
                  <p class="desc" v-html="item.dissname"></p>
                </div>
              </li>
            </ul>-->
            <ul>
              <li v-for="item in QQMusicMv" class="item" :key="item.mv_id">
                <div class="icon">
                  <img :src="item.picurl" width="60" height="60" alt="">
                </div>
                <div class="text">
                  <h2 class="name" v-html="item.mvtitle"></h2>
                  <p class="desc" v-html="item.mvdesc"></p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="loading-container" v-show="!QQMusicMv.length">
          <loading></loading>
        </div>
      </scroll>
    </div>
</template>

<script>
    import Loading from 'base/loading/loading'
    import Scroll from 'base/scroll/scroll'
    import Slider from 'base/slider/slider'
    import {getRecommend, getDiscList, getQQMusicMv} from "api/recommend";
    import {ERR_OK} from "api/config";
    import {playlistMixin} from "../../common/js/mixin";

    export default {
      name:'recommend',
      mixins: [playlistMixin],
      data() {
        return {
          recommends: [],
          disclist: [],
          QQMusicMv: []
        }
      },
      created() {
        this._getRecommend()
        // this._getDiscList()
        this._getQQMusicMv()
      },
      methods: {
        handlePlaylist(playlist) {
          const bottom = playlist.length > 0 ? '60px' : ''
          this.$refs.recommend.style.bottom = bottom
          this.$refs.scroll.refresh()
        },
        _getRecommend() {
          getRecommend().then((res)=>{
            if(res.code === ERR_OK){
              this.recommends = res.data.slider;
            }
          })
        },
        _getDiscList() {
          getDiscList().then((res)=>{
            if(res.code === ERR_OK){
              // console.log(res.data);
              this.disclist = res.data.list;
            }
          })
        },
        _getQQMusicMv() {
          getQQMusicMv().then((res)=>{
            if(res.code === ERR_OK){
              // console.log(res.data);
              this.QQMusicMv = res.data.mvlist;
            }
          })
        },
        loadImage() {
          if(!this.checkLoaded){
            this.$refs.scroll.refresh()
            this.checkLoaded = true
          }
        }
      },
      components: {
        Slider,
        Scroll,
        Loading
      }
    }
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"

  .recommend
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .recommend-content
      height: 100%
      overflow: hidden
      .slider-wrapper
        position: relative
        width: 100%
        overflow: hidden
      .recommend-list
        .list-title
          height: 65px
          line-height: 65px
          text-align: center
          font-size: $font-size-medium
          color: $color-theme
        .item
          display: flex
          box-sizing: border-box
          align-items: center
          padding: 0 20px 20px 20px
          .icon
            flex: 0 0 60px
            width: 60px
            padding-right: 20px
          .text
            display: flex
            flex-direction: column
            justify-content: center
            flex: 1
            line-height: 20px
            overflow: hidden
            font-size: $font-size-medium
            .name
              margin-bottom: 10px
              color: $color-text
            .desc
              color: $color-text-d
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
