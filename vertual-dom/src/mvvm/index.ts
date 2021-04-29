 class Complier {

 }

 class Observer {
    constructor(data: Object) {
        this.observer(data)
    }
    observer(data) {
        if(typeof data ==='object') {
            for(let key in data) {
                this.defineReactive(data, key, data[key])
            }
        }
    }
    defineReactive(obj:Object, key: string, value: any) {
        this.observer(value)
        Object.defineProperty(obj, key, {
            get() {
                return value
            },
            set(newVal) {
                if(newVal !== value) {
                    value = newVal
                }
                
            }

        })
    }
 }

class Watcher {

}


interface VueOptions {
    el: HTMLElement| string
    data:Object
    computed:Object
    methods: Object
}
 class Vue {
    public $el:HTMLElement| string
    public $data: Object
    public computed?: Object
    public methods?: Object
    constructor(options:VueOptions) {
        this.$el = options.el
        this.$data = options.data
        if(this.$el) {
            new Observer(this.$data)
        }
    }
 }