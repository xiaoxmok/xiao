/**
 * 封装 localStorage
 */
export default {
  set (key, value) {
    window.localStorage.setItem(key, JSON.stringify(value))
  },
  get (key) {
    let value = window.localStorage.getItem(key)
    try {
      value = JSON.parse(value)
    } catch (error) {
    }

    return value
  },

  remove (key) {
    window.localStorage.removeItem(key)
  },

  clear () {
    window.localStorage.clear()
  }
}
