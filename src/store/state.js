import { playMode } from '@/common/js/config'
import { loadSearch, loadPlay, loadFavorite } from '@/common/js/cache'

const state = {
  singer: {},
  // 播放器相关
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  disc: {},
  topList: {},
  // 搜索历史 本地读取
  searchHistory: loadSearch(),
  // 添加歌曲用到播放历史
  playHistory: loadPlay(),
  // 我喜欢的列表
  favoriteList: loadFavorite()
}

export default state
