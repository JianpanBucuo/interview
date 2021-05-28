module.exports = Object.freeze({
    // 玩家的数据
    PLAYER: {
      // 最大生命
      MAX_HP: 100,
      // 速度
      SPEED: 500,
      // 大小
      RADUIS: 50,
      // 开火频率, 0.1秒一发
      FIRE: .1
    },
  
    // 子弹
    BULLET: {
      // 子弹速度
      SPEED: 1500,
      // 子弹大小
      RADUIS: 20
    },
  
    // 道具
    PROP: {
      // 生成时间
      CREATE_TIME: 10,
      // 大小
      RADUIS: 30
    },
  
    // 地图大小
    MAP_SIZE: 5000,
  
    // socket发送消息的函数名
    MSG_TYPES: {
      JOIN_GAME: 1,
      UPDATE: 2,
      INPUT: 3
    }
  })
