export default {
  incrementCount({commit}){//comitとは特定のmutationを呼び出すときに使用する。ここでは、mutation.jsのincrement_countを使用する。
    commit('incrementCount');
  },
}