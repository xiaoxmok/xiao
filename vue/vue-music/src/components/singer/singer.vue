<template>
    <div class="singer">
      <list-view :data="singers" @select="selectSinger"></list-view>
      <router-view></router-view>
    </div>
</template>

<script>
    import {getSingerList} from "api/singer";
    import {ERR_OK} from "api/config";
    import Singer from 'common/js/singer'
    import ListView from 'base/listview/listview'

    const HOT_NAME = '热门'
    const HOT_SINGER_LEN = 10

    export default {
        name: "singer",
        data(){
          return {
            singers: []
          }
        },
        created(){
          this._getSingerList()
        },
        methods: {
          selectSinger(singer) {
            this.$router.push({
              path: `/singer/${singer.id}`
            })
          },
          _getSingerList(){
            getSingerList().then((res)=>{
              if(res.code === ERR_OK){
                // console.log(this._normalizeSinger(res.data.list));
                this.singers = this._normalizeSinger(res.data.list)
              }
            })
          },
          _normalizeSinger(list){
            let map = {
              hot: {
                title: HOT_NAME,
                items: []
              }
            }
            list.forEach((item, index)=>{
              if(index < HOT_SINGER_LEN){
                map.hot.items.push(new Singer({
                  id: item.Fsinger_mid,
                  name: item.Fsinger_name
                }))
              }

              const key = item.Findex
              if(!map[key]){
                map[key] = {
                  title: key,
                  items: []
                }
              }
              map[key].items.push(new Singer({
                id: item.Fsinger_mid,
                name: item.Fsinger_name
              }))
            })

            // return map

            // 处理map，获取一个有序列表
            let hot = []
            let ret = []
            for(let key in map){
              let val = map[key]
              if(val.title.match(/[a-zA-Z]/)){
                ret.push(val)
              }else if(val.title === HOT_NAME){
                hot.push(val)
              }
            }

            // A-Z排序
            ret.sort((a, b)=>{
              return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })

            return hot.concat(ret)
          }
        },
        components: {
          ListView
        }
    }
</script>

<style scoped lang="stylus">
  .singer
    position: fixed
    top: 88px
    bottom: 0
    width: 100%
</style>
