import Vue from 'vue';
import Vuex from 'vuex';
// import actions from './actions';
// import mutations from './mutations';
import count from './modules/count';


  Vue.use(Vuex);

  // export default new Vuex.Store({
  //   state: {
  //     count: 0,
  //   },
  //   actions,
  //   mutations,
  // });
  export default new Vuex.Store({//Vuex.storeをインスタンス呼び出しして、エクスポートしている。
    modules: {
      count,
    }
  });