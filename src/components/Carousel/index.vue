<template>
  <div class="carousel-wrapper" @mouseenter="stopAutoPlay" @mouseleave="startAutoPlay">
    <div class="carousel-inner">
      <div
        class="carousel-slide"
        v-for="(item, index) in list"
        :key="item.id"
        :class="{ active: index === currentIndex }"
      >
        <img :src="item.imgUrl" :alt="'banner-' + item.id" />
      </div>
    </div>

    <!-- 左右箭头 -->
    <button class="carousel-arrow carousel-prev" @click="prev">❮</button>
    <button class="carousel-arrow carousel-next" @click="next">❯</button>

    <!-- 指示器 -->
    <div class="carousel-indicators">
      <span
        v-for="(item, index) in list"
        :key="index"
        :class="{ active: index === currentIndex }"
        @click="goTo(index)"
      ></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CarouselComponent',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    }
  },
  data() {
    return {
      currentIndex: 0,
      timer: null
    }
  },
  methods: {
    next() {
      this.currentIndex = (this.currentIndex + 1) % this.list.length
    },
    prev() {
      this.currentIndex = (this.currentIndex - 1 + this.list.length) % this.list.length
    },
    goTo(index) {
      this.currentIndex = index
    },
    startAutoPlay() {
      if (this.autoPlay && this.list.length > 1) {
        this.timer = setInterval(() => {
          this.next()
        }, this.interval)
      }
    },
    stopAutoPlay() {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    }
  },
  watch: {
    list: {
      handler(newVal) {
        if (newVal && newVal.length > 0) {
          this.$nextTick(() => {
            this.startAutoPlay()
          })
        }
      },
      immediate: true
    }
  },
  beforeUnmount() {
    this.stopAutoPlay()
  }
}
</script>

<style scoped lang="less">
.carousel-wrapper {
  position: relative;
  width: 100%;
  height: 460px;
  overflow: hidden;
  border-radius: 4px;

  .carousel-inner {
    width: 100%;
    height: 100%;
    position: relative;

    .carousel-slide {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      transition: opacity 0.6s ease;

      &.active {
        opacity: 1;
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }

  .carousel-arrow {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 40px;
    height: 70px;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    border: none;
    outline: none;
    opacity: 0;
    transition: opacity 0.3s;
    z-index: 10;

    &:hover {
      background: rgba(0, 0, 0, 0.5);
    }
  }

  &:hover .carousel-arrow {
    opacity: 1;
  }

  .carousel-prev {
    left: 0;
    border-radius: 0 4px 4px 0;
  }

  .carousel-next {
    right: 0;
    border-radius: 4px 0 0 4px;
  }

  .carousel-indicators {
    position: absolute;
    bottom: 15px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 8px;
    z-index: 10;

    span {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.5);
      cursor: pointer;
      transition: background 0.3s;

      &.active,
      &:hover {
        background: #e1251b;
      }
    }
  }
}
</style>
