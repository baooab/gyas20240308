<template>
  <van-overlay :show="show">
    <div class="wrapper">
      <img :src="selectedPoster[0]" alt="Image" draggable="false" class="image is-full">

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
  ['https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v2/pre_poster_01.jpg',
    'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v2/poster_01.jpg'],
  ['https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v2/pre_poster_02.jpg',
    'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v2/poster_02.jpg'],
  ['https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v2/pre_poster_03.jpg',
    'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v2/poster_03.jpg']
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

.image.is-full {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: translate(0);
  object-fit: cover;
  user-select: none;
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
