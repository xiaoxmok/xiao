<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <span class="lang" @click.stop="changeLang">{{lang?'ZH':'EN'}}</span>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        lang: false
      }
    },
    methods: {
      changeLang() {

        this.$i18n.locale = this.lang ? 'zh' : 'en'
        this.lang = !this.lang;
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .m-header
    position: relative
    height: 44px
    text-align: center
    color: $color-theme
    font-size: 0
    .lang
      position absolute
      width 20px
      height 15px
      line-height 15px
      font-size 12px
      top 10px
      right 10px
      color: #fff
      border 1px solid bisque
      border-radius 3px
    .icon
      display: inline-block
      vertical-align: top
      margin-top: 6px
      width: 30px
      height: 32px
      margin-right: 9px
      bg-image('logo')
      background-size: 30px 32px
    .text
      display: inline-block
      vertical-align: top
      line-height: 44px
      font-size: $font-size-large
    .mine
      position: absolute
      top: 0
      right: 0
      .icon-mine
        display: block
        padding: 12px
        font-size: 20px
        color: $color-theme
</style>
