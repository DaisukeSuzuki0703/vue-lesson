const state = {
  count: 0,
}

const actions = {
  incrementCount({ commit }) {
    commit('incrementCount');
  }
}

const mutations = {
  incrementCount(state) {
    state.count++;
  }
}

export default {
  namespaced: true,//名前空間の登録をしています。
  //これにより違うモジュールで同じ名前のactionやmutationやgetterがあったとしても名前で衝突することはありません。
  state,
  actions,
  mutations
}