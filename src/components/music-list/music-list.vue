<template>
  <div class="music-list">
    <div class="back">
      <i class="icon-back" @click="back"></i>
    </div>
    <h1 class="title" v-html="title"></h1>
    <div class="bg-img" :style="bgStyle" ref="bgImg">
      <div class="play-wrapper" @click="random">
        <div
          class="play"
          v-show="songs.length"
          ref="palyBtn"
        >
          <i class="icon-play"></i>
          <p class="text">随机播放全部</p>
        </div>
        <div class="filter" ref="filter"></div>
      </div>
    </div>
    <div class="bg-layer" ref="layer"></div>
    <scroll
      :data="songs"
      :probeType="probeType"
      :listenScroll="listenScroll"
      class="list"
      ref="list"
      @scroll="scroll"
    >
      <div class="song-list-wrapper">
        <song-list
          :songs="songs"
          @select="selectItem"
        >
        </song-list>
      </div>
      <div class="loading-coantainer" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
import { prefixStyle } from '@/common/js/dom'
import Loading from '@/base/loading/loading'
import { mapActions } from 'vuex'

const RESEVER_HEIGHT = 40
const TRANSFORM = prefixStyle('transform')
const BACKDROP = prefixStyle('backdrop-filter')

export default {
  props: {
    bgImg: {
      type: String,
      default: ''
    },
    songs: {
      type: Array,
      default () {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      scrollY: 0
    }
  },
  computed: {
    bgStyle () {
      return `background-image:url(${this.bgImg})`
    }
  },
  created () {
    this.probeType = 3
    this.listenScroll = true
  },
  mounted () {
    this.imgHeight = this.$refs.bgImg.clientHeight
    this.minTranslateY = -this.imgHeight + RESEVER_HEIGHT
    this.$refs.list.$el.style.top = `${this.imgHeight}px`
  },
  methods: {
    scroll (pos) {
      this.scrollY = pos.y
    },
    back () {
      this.$router.back()
    },
    selectItem (song, index) {
      // 点击播放，需要提交mutation 修改state
      this.selectPlay({
        list: this.songs,
        index
      })
    },
    random () {
      console.log('click')
      this.randomPlay({
        list: this.songs
      })
    },
    ...mapActions([
      'selectPlay',
      'randomPlay'
    ])
  },
  watch: {
    scrollY (newY) {
      let translateY = Math.max(this.minTranslateY, newY)
      let zIndex = 0
      let scale = 1
      let blur = 0
      this.$refs.layer.style[TRANSFORM] = `translate3d(0, ${translateY}px, 0`

      const percent = Math.abs(newY / this.imgHeight)

      if (newY > 0) {
        scale = 1 + percent
        zIndex = 10
      } else {
        blur = Math.min(20 * percent, 20)
      }
      this.$refs.filter.style[BACKDROP] = `blur(${blur}px)`

      if (newY < this.minTranslateY) {
        zIndex = 10
        this.$refs.bgImg.style.paddingTop = 0
        this.$refs.bgImg.style.height = `${RESEVER_HEIGHT}px`
        this.$refs.palyBtn.style.display = 'none'
      } else {
        this.$refs.bgImg.style.paddingTop = '70%'
        this.$refs.bgImg.style.height = 0
        this.$refs.palyBtn.style.display = ''
      }
      this.$refs.bgImg.style.zIndex = zIndex
      this.$refs.bgImg.style[TRANSFORM] = `scale(${scale})`
    }
  },
  components: {
    Scroll,
    SongList,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"
@import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      line-height: 40px
      font-size: $font-size-large
      color: $color-text
    .bg-img
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 20px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 135px
          padding: 7px 0
          margin: 0 auto
          text-align: center
          border: 1px solid $color-theme
          color: $color-theme
          border-radius: 100px
          font-size: 0
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-medium-x
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-small
      .filter
        position: absolute
        z-index: 40
        top: 0
        left: 0
        width: 100%
        height: 100%
    .bg-layer
      position: relative
      height: 100%
      background: $color-background
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
