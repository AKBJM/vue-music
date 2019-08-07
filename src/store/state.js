import { playMode } from '@/common/js/config'
import { loadSearch } from '@/common/js/cache'

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
  searchHistory: loadSearch()
}

export default state
