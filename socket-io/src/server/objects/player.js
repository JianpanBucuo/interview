const Item = require('./item')
const Constants = require('../shared/constants')

/**
 * 玩家对象类
 */
class Player extends Item{
  constructor(data){
    super(data);

    this.username = data.username;
    this.hp = Constants.PLAYER.MAX_HP;
    this.speed = Constants.PLAYER.SPEED;
    // 击败分值
    this.score = 0;
    // 拥有的buffs
    this.buffs = [];
  }

  update(dt){

  }

  serializeForUpdate(){
    return {
      ...(super.serializeForUpdate()),
      username: this.username,
      hp: this.hp,
      buffs: this.buffs.map(item => item.type)
    }
  }
}

module.exports = Player;

