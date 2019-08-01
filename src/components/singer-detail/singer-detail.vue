<template>
  <music-list
    :songs="songs"
    :title="title"
    :bgImg="bgImg"
  ></music-list>
</template>

<script>
import { mapGetters } from 'vuex'
import { getSingerDetail, getSongVkey } from '@/api/singer'
import { createSong } from '@/common/js/song'
import { ERR_OK } from '@/api/config'
import MusicList from 'components/music-list/music-list'

export default {
  data () {
    return {
      songs: []
    }
  },
  computed: {
    title () {
      return this.singer.name
    },
    bgImg () {
      return this.singer.avatar
    },
    ...mapGetters([
      'singer'
    ])
  },
  created () {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail () {
      // 如果再歌手详情页刷新则会退到歌手列表页
      if (!this.singer.id) {
        this.$router.push('/singer')
      }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalizeSongs(res.data.list)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        // 结构赋值
        let { musicData } = item
        getSongVkey(musicData.songmid).then((res) => {
          const vkey = res.req_0.data.midurlinfo[0].vkey
          if (musicData.songid && musicData.albumid) {
            ret.push(createSong(musicData, vkey))
          }
        })
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
</style>
