function module (id, parent) {
  this.id = id
  this.exports = {}
  this.parent = parent
  if(parent && parent.children) {
    parent.children.push(this)
  }
  this.loaded = false
  this.children = []
}