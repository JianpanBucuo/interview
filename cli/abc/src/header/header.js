import '../common/load.scss'
import './header.scss'
// var imgSrc = require('../img/warning.png')
import imgSrc from '../img/warning.png'
const {commonEvent} = require('../common/common')
console.log('header')

var add =function  () {
    var img = new Image();
    img.src = imgSrc
    document.body.appendChild(img)
}
commonEvent()
exports.add =
    add
