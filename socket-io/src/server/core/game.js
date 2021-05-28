const Constants = require('../shared/constants')
const  Player  = require('../objects/player')
class Game{
    constructor(){
      // 保存玩家的socket信息
      this.sockets = {}
      // 保存玩家的游戏对象信息
      this.players = {};
      // 子弹
      this.bullets = [];
      // 最后一次执行时间
      this.lastUpdateTime = Date.now();
      // 是否发送给前端数据，这里将每两帧发送一次数据
      this.shouldSendUpdate = false;
      // 游戏更新
    const a =   setInterval(this.update.bind(this), 1000 / 60);
    setTimeout(() => {
        clearInterval(a)
    },10000)
   
    }
  
    update(){
        const now = Date.now();
        // 现在的时间减去上次执行完毕的时间得到中间间隔的时间
        const dt = (now - this.lastUpdateTime) / 1000;
        this.lastUpdateTime = now;
    
        // 更新玩家人物
        Object.keys(this.players).map(playerID => {
          const player = this.players[playerID];
          player.update(dt);
        })
    
        if(this.shouldSendUpdate){
          // 发送数据
          Object.keys(this.sockets).map(playerID => {
            const socket = this.sockets[playerID];
            const player = this.players[playerID];
            socket.emit(
                Constants.MSG_TYPES.UPDATE,
                // 处理游戏中的对象数据发送给前端
                this.createUpdate(player)
            )
          })
    
          this.shouldSendUpdate = false;
        } else {
          this.shouldSendUpdate = true;
        }
      }
    
      createUpdate(player){
        // 其他玩家
        const otherPlayer = Object.values(this.players).filter(
            p => p !== player
        );
    
        return {
          t: Date.now(),
          // 自己
          me: player.serializeForUpdate(),
          others: otherPlayer,
          // 子弹
          bullets: this.bullets.map(bullet => bullet.serializeForUpdate())
        }
      }
    
      // 玩家加入游戏
      joinGame(socket, username){
        this.sockets[socket.id] = socket;
    
        // 玩家位置随机生成
        const x = (Math.random() * .5 + .25) * Constants.MAP_SIZE;
        const y = (Math.random() * .5 + .25) * Constants.MAP_SIZE;
        this.players[socket.id] = new Player({
          id: socket.id,
          username,
          x, y,
          w: Constants.PLAYER.WIDTH,
          h: Constants.PLAYER.HEIGHT
        })
      }
    
      disconnect(socket){
        delete this.sockets[socket.id];
        delete this.players[socket.id];
      }
    }

  
  module.exports = Game;
