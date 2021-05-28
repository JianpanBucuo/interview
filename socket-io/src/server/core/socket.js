const Constants = require('../shared/constants')
// import Constants  from '../server/shared/constants'
class Socket{
  constructor(game, io){
    this.game = game;
    this.io = io;
  }


  listen(socket){
    console.log(`Player connected! Socket Id: ${socket.id}`);

    // 加入游戏
    socket.on(Constants.MSG_TYPES.JOIN_GAME, this.game.joinGame.bind(this.game, socket));
    // 断开游戏
    socket.on('disconnect', this.game.disconnect.bind(this.game, socket));
  }

}

module.exports = Socket

