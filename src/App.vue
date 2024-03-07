<script setup>
import { ref } from 'vue'
import BgVideo from './components/BgVideo.vue'
import BgAudio from './components/BgAudio.vue'
import Loading from './components/Loading.vue'
import ImageButton from './components/ImageButton.vue'
import OverlayPoster from './components/OverlayPoster.vue'

import { loseEqual } from './utils'
import { VideoBreakPoints, VideoTimeBreakPoints, AudioChangeBreakPoint } from './config'

const breakpoints = ref(Object.values(VideoBreakPoints).map(({ second }) => second))

const videoRef = ref(null)
const bgAudioRef = ref(null)
const videoBgAudioRef = ref(null)
const readyToshowPoster = ref(false)
const showPoster = ref(false)
const showLoading = ref(true)
const showButton = ref(true)
const buttonSrc = ref('https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/board.png')
const bgAudioSrc = ref(AudioChangeBreakPoint.Phase1.src)


function handleCanPlay() {
  // console.log('[canplay]', videoRef.value)
  showLoading.value = false
}

function handleCanPlayDelay() {
  setTimeout(() => {
    showLoading.value = false
  }, 2000)
}

function handlePlayOrStop() {
  if (readyToshowPoster.value) {
    showPoster.value = true
    return
  }

  if (videoRef.value.player.paused()) {
    videoRef.value.player.play();
    videoBgAudioRef.value.audio.play()
  } else {
    videoRef.value.player.pause();
    videoBgAudioRef.value.audio.pause()
  }
}
function handlePause() {
  const currTime = videoRef.value.player.currentTime()

  videoBgAudioRef.value.audio.pause()

  // handle button text
  for (const compareSecond of breakpoints.value) {
    if (loseEqual(currTime, compareSecond)) {
      showButton.value = true
      buttonSrc.value = VideoTimeBreakPoints[compareSecond].src
      break
    }
  }

  // is it time to show poster?
  if (loseEqual(currTime, VideoBreakPoints.GenPoster.second)) {
    readyToshowPoster.value = true
  }

}

function handlePlay() {
  showButton.value = false
  videoBgAudioRef.value.audio.play()
}

function handleEnded() {
  showButton.value = false
  readyToshowPoster.value = false
}

function handleTimeUpdate() {
  const currTime = videoRef.value.player.currentTime()


  // is it time to change bgm?
  if (loseEqual(currTime, AudioChangeBreakPoint.Phase2.second)) {
    bgAudioSrc.value = AudioChangeBreakPoint.Phase2.src
  }

}

function handleRetry() {
  buttonSrc.value = 'https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/board.png'
  bgAudioSrc.value = AudioChangeBreakPoint.Phase1.src
  showPoster.value = false
  readyToshowPoster.value = false
  videoRef.value.player.resetProgressBar_()
  videoRef.value.reset()
  videoBgAudioRef.value.audio.load()
}
</script>

<template>
  <BgVideo src="https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/newest_video.mp4"
    poster="https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/poster.jpg" @ready="handleCanPlayDelay"
    @canplay="handleCanPlay" @loadeddata="handleCanPlay" @canplaythrough="handleCanPlay" muted ref="videoRef"
    @timeupdate="handleTimeUpdate" @ended="handleEnded" @pause="handlePause" @play="handlePlay"
    :breakpoints="breakpoints" />

  <BgAudio :src="bgAudioSrc" autoplay ref="bgAudioRef" />

  <BgAudio src="https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/newest_video.mp3"
    ref="videoBgAudioRef" /> -->

  <ImageButton :show="showButton" @click="handlePlayOrStop" :src="buttonSrc" pos="bottom" />

  <Loading :show="showLoading"
    bg-src="https://zbbusiness.oss-cn-shanghai.aliyuncs.com/gyas20240308/assets/bg_loading.jpg" />

  <OverlayPoster :show="showPoster" @retry="handleRetry" />
</template>
