

class KK {
  constructor () {
    this.middleWareList = []
  }
  use (fn) {
    this.middleWareList.push(fn)
  }
  listen (port, cb) {
    cb()
    this.resolveMiddleList()
  }
  resolveMiddleList () {
    console.log('🚀', this.middleWareList)
    function dispatch (index) {
      console.log('😀', index, this)
      if (index >= this.middleWareList.length) return
      const fn = this.middleWareList[index]
      fn.call(this, dispatch(++index))
    }
    dispatch.call(this, 0)
  }
}

const app = new KK()

app.use(async (next) => {
  console.log('fn1 start')
  await next()
  console.log('fn1 end')
})
app.use(async (next) => {
  console.log('fn2 start')
  await next()
  console.log('fn2 end')
})
app.use(async (next) => {
  console.log('fn3 start')
  await next()
  console.log('fn3 end')
})

app.listen(3000, () => {
  console.log('监听3000端口')
})

