class Common {
  saveData(name: string, data: object | string | number) {
    let dataStr = null
    if (typeof data === 'object') {
      dataStr = JSON.stringify(data)
    }
    if (typeof data === 'string' || typeof data === 'number') {
      dataStr = data.toString()
    }
    if (dataStr) {
      localStorage.setItem(name, dataStr)
    }
  }

  getData(name: string) {
    let data = localStorage.getItem(name)
    if (data) {
      try {
        data = JSON.parse(data)
        return data
      } catch {
        return data
      }
    }
  }

  removeData(name: string) {
    localStorage.removeItem(name)
  }

  deepCopy(data: object) {
    return JSON.parse(JSON.stringify(data))
  }

  formatDate(time: number, format = 'y-m-d h:i:s') {
    if (time) {
      const mSec = time * (time.toString().length < 13 ? 1000 : 1)
      const date = new Date(mSec)
      const zero = (num: number) => ((num | 0) < 10 ? '0' + num : num.toString())
      const contrast: { [key: string]: string } = {
        y: date.getFullYear().toString(),
        m: zero(date.getMonth() + 1),
        d: zero(date.getDate()),
        h: zero(date.getHours()),
        i: zero(date.getMinutes()),
        s: zero(date.getSeconds()),
      }

      for (const n in contrast) {
        format = format.replace(new RegExp(n, 'g'), contrast[n])
      }

      return format
    } else {
      return time
    }
  }
}

export default Common
