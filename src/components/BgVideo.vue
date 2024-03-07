<template>
  <VideoPlayer :class="['full-page-video', canplay && 'vjs-can-play']" :src="src" :poster="poster" :muted="muted"
    playsinline webkit-playsinline @mounted="handleEvent({ type: 'mounted', ...$event })" @ready="handleEvent($event)"
    @play="handleEvent($event)" preload="auto" @pause="handleEvent($event)" @ended="handleEnded($event)"
    @loadeddata="handleEvent($event)" @waiting="handleEvent($event)" @playing="handleEvent($event)"
    @canplay="handleEvent($event)" @canplaythrough="handleEvent($event)" @timeupdate="handleEvent($event)" />
</template>

<script setup>
import { defineComponent, shallowRef, ref } from "vue";
import { VideoPlayer } from "@videojs-player/vue";
import "video.js/dist/video-js.css";

// See https://vuejs.org/guide/components/registration.html#component-name-casing
defineComponent({
  components: {
    VideoPlayer,
  },
});

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  poster: {
    type: String,
    required: false,
  },
  muted: {
    type: Boolean,
    required: false,
    default: false,
  },
  breakpoints: {
    type: Array,
    required: false,
    default: []
  }
});


const pausePoints = ref(props.breakpoints.map(breakpoint => {
  return {
    breakpoint,
    fired: false
  }
}));

const canplay = ref(false)
const playerRef = shallowRef(null)

const emit = defineEmits(["mounted", "ready", "play", "pause", "loadeddata", "waiting", "playing", "canplay", "canplaythrough", "canplay", "timeupdate"]);

defineExpose({
  player: playerRef,
  reset: handleEnded
})

function handleEvent(event) {
  if (event.type !== "timeupdate") {
    console.log("Basic player event", event);
  }

  if (event.type === "mounted") {
    handleMounted(event)
  } else if (event.type === "timeupdate") {
    handleTimeUpdate(event)
  } else if (event.type === "ended") {
    handleEnded(event)
  } else if (event.type === "canplay") {
    hanleCanPlay(event)
  }

  emit(event.type)
}

function handleMounted(event) {
  // console.log("Basic player mounted", event)
  playerRef.value = event.player
}

function handleTimeUpdate(event) {
  // console.log("Basic player timeupdate", playerRef.value.currentTime())

  for (let pausePoint of pausePoints.value) {
    if (
      !pausePoint.fired &&
      playerRef.value.currentTime() >= pausePoint.breakpoint
    ) {
      pausePoint.fired = true;
      playerRef.value.pause();
    }
  }
}

function hanleCanPlay(event) {
  // console.log("Basic player canplay", event)
  canplay.value = true;
}

function handleEnded(event) {
  // console.log("Basic player ended", event)

  reset()
}

function reset() {
  for (let pausePoint of pausePoints.value) {
    pausePoint.fired = false;
  }
}
</script>

<style scoped>
.full-page-video {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.full-page-video :deep(video) {
  pointer-events: none;
  object-fit: cover;
}

.full-page-video :deep([class$="poster"]) {
  background-size: cover;
}

/* fix video.js bugs */
.full-page-video.vjs-has-started :deep([class$="poster"]) {
  display: block;
}

.full-page-video.vjs-has-started.vjs-can-play :deep([class$="poster"]) {
  display: none;
}
</style>
