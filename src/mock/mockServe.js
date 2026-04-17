import Mock from 'mockjs'
import banner from './banner.json'
import floor from './floor.json'

// Mock轮播图数据
Mock.mock('/mock/banner', {
  code: 200,
  data: banner
})

// Mock楼层数据
Mock.mock('/mock/floor', {
  code: 200,
  data: floor
})
