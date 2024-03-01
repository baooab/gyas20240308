<template>
  <div :class="['bg-audio', paused && 'paused']" tabindex="-1" @pointerdown="togglePlay" role="button" v-show="autoplay">
  </div>
  <audio ref="audioRef" preload="auto" loop :src="src" />
</template>

<script setup>
import { onMounted, watch, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
const paused = ref(false)
const audioRef = ref(null)

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: false
  }
})

watch(() => props.src, (newValue) => {
  console.log('watcher', newValue)

  audioRef.value.pause()
  requestAnimationFrame(() => {
    audioRef.value.play()
  })
})

defineExpose({
  audio: audioRef,
})

onMounted(() => {
  if (props.autoplay) {
    useEventListener(document, 'DOMContentLoaded', () => {
      tryAutoPlay()
    }, { once: true })

    useEventListener(document, 'onload', () => {
      tryAutoPlay()
    }, { once: true })

    useEventListener(document, 'pointermove', () => {
      tryAutoPlay()
    }, { once: true })

    useEventListener(document, 'pointerdown', () => {
      tryAutoPlay()
    }, { once: true })
  }
})

function tryAutoPlay() {
  try {
    audioRef.value.play()
  } catch (error) {
    //
  }
  useEventListener(document, 'WeixinJSBridgeReady', (evt) => {
    audioRef.value.play()
  }, { once: true })
}

function togglePlay() {
  const isPaused = !paused.value
  paused.value = isPaused
  if (isPaused) {
    audioRef.value.pause()
  } else {
    audioRef.value.play()
  }
}

</script>

<style scoped>
.bg-audio {
  width: 8vw;
  height: 8vw;
  position: fixed;
  left: 7.778vw;
  top: 7.315vw;
  z-index: 1;
  cursor: pointer;
  background: url('https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240101/v1/audio.png') no-repeat;
  background-size: cover;
  animation: music 4s linear infinite;
}

.bg-audio.paused {
  animation-play-state: paused;
}

@keyframes music {
  0% {
    transform: rotate(0)
  }

  to {
    transform: rotate(359deg)
  }
}
</style>
