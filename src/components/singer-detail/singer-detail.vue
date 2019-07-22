<template>
  <transition name="slide-left">
    <div class="singer-detail"></div>
  </transition>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import "~common/stylus/variable"

  .singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background

  .slide-left-enter-active, .slide-left-leave-active
    transition: all 0.5s
  .slide-left-enter, .slide-left-leave-to
    transform: translate3d(100%, 0, 0)
</style>
