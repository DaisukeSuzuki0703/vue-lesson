<template>
  <div>
    <button @click="incrementCount">Add to count</button>
    <p>{{ count }}回クリックされました</p>
  </div>
</template>

<script>
import { mapState ,mapActions } from 'vuex';

export default {
  computed: {
    ...mapState('count', { // 第1引数には配列を指定して、配列には参照したい「state」を文字列で記述することで、「state」をコンポーネントで使用できるようになります！
      count: state => state.count, // メソッド名にはpropsを指定し、第1引数にstateを受け取ることができるので、state.countと記述します。
    }),
  },
  methods: {
    ...mapActions('count',//第1引数には分割した「store」のモジュール名を指定し、第2引数には配列を配列を渡します。
    ['incrementCount',]), //「actions.js」内で定義したコンポーネント内で使用したいメソッド名を文字列で格納していきます。
    //配列の値には使用したいアクション名を文字列で指定します。//これにより、コンポーネントで分割したストアを使用することができます。
  },
}
</script>