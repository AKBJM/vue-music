// 缓存相关内容 storage
import storage from 'good-storage'
// 搜索历史相关
const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15
// 播放历史相关
const PLAY_KEY = '__play__'
const PLAY_MAX_LEN = 200
// 收藏相关
const FAVORITE_KEY = '__favorite__'
const FAVORITE_MAX_LEN = 200

// 搜索历史插入数组
function insertArray (arr, val, compare, maxLen) {
  // compare 是一个比较函数
  const index = arr.findIndex(compare)
  if (index === 0) {
    return
  }
  if (index > 0) {
    arr.splice(index, 1)
  }
  // 插入到第一个
  arr.unshift(val)
  // 如果超过限制 把最后一个删除
  if (maxLen && arr.length > maxLen) {
    arr.pop()
  }
}
// 将某一条历史删除
function deleteFromArray (arr, compare) {
  const index = arr.findIndex(compare)
  if (index > -1) {
    arr.splice(index, 1)
  }
}
// 保存搜索历史
export function saveSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  insertArray(searches, query, (item) => {
    return item === query
  }, SEARCH_MAX_LEN)
  storage.set(SEARCH_KEY, searches)
  return searches
}
// 删除搜索历史
export function deleteSearch (query) {
  let searches = storage.get(SEARCH_KEY, [])
  deleteFromArray(searches, (item) => {
    return item === query
  })
  storage.set(SEARCH_KEY, searches)
  return searches
}
// 清空搜索历史
export function clearSearch () {
  storage.remove(SEARCH_KEY)
  return []
}
// 本地读取搜索历史
export function loadSearch () {
  return storage.get(SEARCH_KEY, [])
}
// 存储播放历史
export function savePlay (song) {
  let songs = storage.get(PLAY_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, PLAY_MAX_LEN)
  storage.set(PLAY_KEY, songs)
  return songs
}
// 读取播放历史
export function loadPlay () {
  return storage.get(PLAY_KEY, [])
}
// 保存收藏
export function saveFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  insertArray(songs, song, (item) => {
    return song.id === item.id
  }, FAVORITE_MAX_LEN)
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 删除收藏
export function deleteFavorite (song) {
  let songs = storage.get(FAVORITE_KEY, [])
  deleteFromArray(songs, (item) => {
    return item.id === song.id
  })
  storage.set(FAVORITE_KEY, songs)
  return songs
}
// 本地读取
export function loadFavorite () {
  return storage.get(FAVORITE_KEY, [])
}
