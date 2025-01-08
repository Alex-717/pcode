

class KK {
  constructor () {
    this.middleWareList = []
  }
  use (fn) {
    this.middleWareList.push(fn)
  }
  listen (port, cb) {
    cb()
    this.resolveMiddleList(this)
  }
  resolveMiddleList (context) {
    const middleList = this.middleWareList
    if (!Array.isArray(middleList)) throw new TypeError('middleList must be an Array')
    for (const fn of middleList) {
      if (typeof fn !== 'function') {
        throw new TypeError('middleList must be the compose of functions')
      }
    }

    function dispatch (index) {
      const fn = middleList[index]
      if (!fn) return Promise.resolve()
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, index + 1)))
      } catch (err) {
        return Promise.reject(err)
      }
    }
    return dispatch(0)
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
  await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, 1000)
  })
  console.log('fn3 end')
})

app.listen(3000, () => {
  console.log('监听3000端口')
})

