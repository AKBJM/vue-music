<template>
  <music-list
    :title="title"
    :bgImg="bgImg"
    :songs="songs"
    :rank="rank"
  ></music-list>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import { mapGetters } from 'vuex'
import { getRankList } from '@/api/rank'
import { ERR_OK } from '@/api/config'
import Song from '@/common/js/song'
import { getSongVkey } from '@/api/singer'

export default {
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title () {
      return this.topList.topTitle
    },
    bgImg () {
      return this.topList.picUrl
    }
  },
  created () {
    this._getRankList()
  },
  methods: {
    _getRankList () {
      if (!this.topList.id) {
        this.$router.push({
          path: '/rank'
        })
      }
      getRankList(this.topList.id).then((res) => {
        if (res.code === ERR_OK) {
          console.log(res)
          let rankList = res.detail.data.songInfoList
          console.log(rankList)
          this.songs = this._normalizeSongs(rankList)
          console.log(this.songs)
        }
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((musicData) => {
        getSongVkey(musicData.mid).then((res) => {
          const vkey = res.req_0.data.midurlinfo[0].vkey
          if (musicData.id && musicData.album.id) {
            ret.push(this._createSong(musicData, vkey))
          }
        })
      })
      return ret
    },
    _createSong (musicData, vkey) {
      return new Song({
        id: musicData.id,
        mid: musicData.mid,
        singer: this.filterSinger(musicData.singer),
        name: musicData.name,
        album: musicData.album.name,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.album.mid}.jpg?max_age=2592000`,
        url: `http://isure.stream.qqmusic.qq.com/C400${musicData.mid}.m4a?guid=13912579&vkey=${vkey}&uin=3735&fromtag=66`
      })
    },
    filterSinger (singer) {
      let ret = []
      if (!singer) {
        return ''
      }
      singer.forEach((s) => {
        ret.push(s.name)
      })
      return ret.join('/')
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
</style>
