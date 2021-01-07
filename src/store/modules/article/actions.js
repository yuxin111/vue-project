const asyncAddCount = context => {
  setTimeout(() => {
    context.commit('COUNT_ADD', 5)
  }, 3000)
}

export default {
  asyncAddCount
}
