const inquirer = require('inquirer')

const promptList = [
    {
        type:'input',
        message:'设置一个用户名',
        name:'name'
    },
    {
        type:'input',
        message:'设置一个手机号',
        name:'phone',
        validate: val => {
            if(val.match(/\d{11}/g)){
                return true
            }
            return false
        }
    }
]

// inquirer.prompt(promptList).then(answers =>{
//     console.log(answers) //  { name: 'sa', phone: '132600872444' }
// })
process.argv.forEach((val, index) => {
 
    console.log(`${index}: ${val}`);
     
    });