<template>
  <Transition>
    <button v-show="show" :class="['btn', pos && `is-${pos}`]" :style="{ backgroundImage: 'url(' + src + ')' }"></button>
  </Transition>
</template>

<script setup>
const props = defineProps({
  src: {
    type: String,
    required: false,
    default: function () {
      return 'https://makeplaceholder.com/?size=252x60&text=Button'
    }
  },
  show: {
    type: Boolean,
    required: false,
    default: true
  },
  text: {
    type: String,
    required: false,
    default: 'Button'
  },
  pos: {
    type: String,
    required: false,
    default: ''
  }
})
</script>

<style scoped>
.btn {
  border: none;
  background-color: transparent;
  font-family: inherit;
  font-size: inherit;
  padding: 0;
  outline: 0;
  cursor: pointer;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  color: transparent;
}

.btn.is-bottom {
  position: fixed;
  z-index: 1;
  width: 68vw;
  height: 12vw;
  bottom: 20vw;
  left: 50%;
  transform: translateX(-50%) translateY(0%);
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
