class Item{
    constructor(data = {}){
      // id
      this.id = data.id;
      // 位置
      this.x = data.x;
      this.y = data.y;
      // 大小
      this.w = data.w;
      this.h = data.h;
    }
  
    // 这里是物体每帧的运行状态
    update(dt){
    
    }
  
    // 格式化数据以方便发送数据给前端
    serializeForUpdate(){
      return {
        id: this.id,
        x: this.x,
        y: this.y,
        w: this.w,
        h: this.h
      }
    }
  }
  
  module.exports = Item;
  
