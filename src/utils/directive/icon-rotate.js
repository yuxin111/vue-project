export default {
  inserted (el, binding) {
    // 获取第一个图标
    const iconEl = el.getElementsByTagName('i')[0]
    if (iconEl) {
      el.onmouseenter = e => {
        iconEl.classList.add('i-rotate')
      }
      el.onmouseleave = e => {
        iconEl.classList.remove('i-rotate')
      }
    }
  }
}
