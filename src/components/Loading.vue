<template>
  <van-overlay :show="show">
    <div class="bg" :style="{ backgroundImage: 'url(' + bgSrc + ')' }">
      <div class="loading" aria-label="loading...">
        <img src="https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/loading.gif" alt="loading"
          draggable="false" class="loading-img">
      </div>
    </div>
  </van-overlay>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: true
  },
  bgSrc: {
    type: String,
    required: true
  },
  loadingSrc: {
    type: String,
    required: false
  }
})
</script>

<style scoped>
.bg {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  user-select: none;
  width: 50vw;
}

.loading-img {
  display: block;
  max-width: 100%;
  width: 100%;
}
</style>
