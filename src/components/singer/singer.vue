<template>
  <div class="singer" ref="singer">
    <listview :data="singers" @select="selectSinger" ref="list"></listview>
    <transition name="slide">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import Singer from '@/common/js/singer'
import Listview from '@/base/listview/listview'
import { mapMutations } from 'vuex'
import { playlistMixin } from '@/common/js/mixin'

const HOT_NAME = '热门'
const HOT_LIST_LEN = 10

export default {
  mixins: [ playlistMixin ],
  data () {
    return {
      singers: []
    }
  },
  created () {
    this._getSingerList()
  },
  methods: {
    handlePlaylist (playList) {
      const _bottom = playList.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = _bottom
      this.$refs.list.refresh()
    },
    selectSinger (singer) {
      this.$router.push({
        path: `/singer/${singer.id}`
      })
      this.setSinger(singer)
    },
    _getSingerList () {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._normalizeSinger(res.data.list)
          // this.singers = res.data.list
          console.log(this.singers)
        }
      })
    },
    // 对数据进行处理 获得所需要的数据内容
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_LIST_LEN) {
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: item.Findex,
            items: []
          }
        }
        map[key].items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name
        }))
      })
      // 未得到有序列表，对map进行处理
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  },
  components: {
    Listview
  }
}
</script>

<style lang="stylus" scoped>
  .singer
    position: absolute
    top: 88px
    bottom: 0
    width: 100%
    .slide-enter-active, .slide-leave-active
      transition: all 0.5s
    .slide-enter, .slide-leave-to
      transform: translate3d(100%, 0, 0)
</style>
