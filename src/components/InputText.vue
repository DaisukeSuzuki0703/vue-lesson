<template>
  <input type="text" v-model="computedValue">
</template>

<script>
export default {
  props: {
    value: String,//文字列かどうかの判定をこなっている。
  },
  computed: {
    computedValue: {
      get() {//値を参照するときに使用するメソッド。
        return this.value;
      },
      set(value) {//親コンポーネントの@inputが発火するときに呼び出される。
        this.$emit('input', value);//ここで値の変更をリアルタイムで更新できている。emitの第2引数には値を渡すことができ、現在の値を渡すことで親コンポーネント側で値の更新ができるようになる。
      }
    }
  }
}
</script>