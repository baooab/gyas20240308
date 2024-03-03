<template>
  <van-overlay :show="show">
    <div class="wrapper">
      <div :style="{ backgroundImage: 'url(' + selectedPoster[0] + ')' }" alt="Image" draggable="false"
        class="bg-image">
      </div>
      <div class="button-group">
        <ImageButton src="https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v1/save_poster.png"
          @click="showPoster = true" class="retry-button" />
        <ImageButton src="https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v1/retry.png" class="save-button"
          @click="handleRetry" />
      </div>
    </div>
  </van-overlay>
  <van-overlay :show="showPoster">
    <div class="wrapper">
      <img :src="selectedPoster[1]" alt="Image" draggable="false" class="image">
      <ImageButton src="https://zbbusiness.oss-cn-shanghai.aliyuncs.com/test/close.png" class="close-btn" pos="bottom"
        @click="handlePoserClose" />
    </div>
  </van-overlay>
</template>

<script setup>
import { watch, ref, onMounted } from 'vue'
import { showToast } from 'vant'
import ImageButton from './ImageButton.vue';
import { getRandomNum } from '../utils'

const props = defineProps({
  show: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['retry'])
const showPoster = ref(false)

const posters = ref([
  ['https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/pre_poster_01.png', 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/poster_01.png'],
  ['https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/pre_poster_02.png', 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/poster_02.png'],
  ['https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/pre_poster_03.png ', 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/poster_03.png'],
])

const selectedPoster = ref([])

// handle save tips
watch(showPoster, (newValue) => {
  console.log('watch', newValue)
  if (newValue) {
    showToast('长按图片保存')
  }
})

onMounted(() => {
  selectedPoster.value = posters.value[getRandomNum(0, 2)]
})

// handle poster select
watch(() => props.show, (newValue) => {
  if (newValue) {
    selectedPoster.value = posters.value[getRandomNum(0, 2)]
  }
})

function handlePoserClose() {
  showPoster.value = false
}

function handleRetry() {
  emit('retry')
}
</script>

<style scoped>
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.image {
  position: absolute;
  height: 85vh;
  width: auto;
  top: 4vh;
  left: 50%;
  transform: translate(-50%);
}

.bg-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translate(0);
  background-repeat: no-repeat;
  background-size: 100% auto;
  background-position-y: 60%;
  user-select: none;
  background-color: white;
}

.button-group {
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 9vw;
  left: 0;
  right: 0;
}

.retry-button,
.save-button {
  width: 67vw;
  height: 10vw;
}

.close-btn.close-btn {
  width: 7vw;
  height: 8vw;
  bottom: 8vw;
  left: 46.5vw;
}
</style>
