import Vue from 'vue';//node_moduleで入っているvueをインポートしている。
import uuid from 'vue-uuid';//node_moduleで入っているvue-uuidをインポートしている。

import MyApp from 'Components/App';//webpack.config.babel.jsでパスの指定を__dirnameで指定して,App.vueをインポート。
import store from './store';//追加

Vue.use(uuid);//uuidを使用するために、uuidをインストールして乱数形成のために指定している。

new Vue({
  el: '#app',//#appとその子要素のインスタンスを作成している。→vueを使用することができる。
  store,
  components: {
    MyApp//Myappは上記でComponents/AppでMyappという名前をつけてimportしている。
  },
  template: '<my-app></my-app>',
});