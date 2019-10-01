<template>
  <div>
    <h1
      v-html="leads.message"
      :class="classObject"
    ></h1>
    <p>{{ leads.description }}</p>
    <button @click="changeTextSize">large</button>
    <button
      @click="addDescription"
    >
      add description
    </button>
    <hr>
    <child-component
      v-if="isShow"
    >
    <template #head>
      <p>head slot</p>
    </template>
    <template #default>
      <p>main slot</p>
      <p>main slot2</p>
    </template>
    <template #foot>
      <p>foot slot</p>
    </template>
    </child-component>
    <button @click="toggleShow">toggle isShow</button>
    <hr>
    <p v-if="id === 1">1</p>
    <template v-else-if="id === 2">
      <p>2-1</p>
      <p>2-2</p>
      <p>2-3</p>
    </template>
    <p v-else>Other</p>
    <hr>
    <template v-for="item in items">
      <child-component
        :key="item.id"
        :title="item.title">
        <span>slot content</span>
      </child-component>
    </template>
    <article v-for="post in posts"
      :key="$uuid.v4()"
    >
      <h2>{{ post.title }}</h2>
      <p>{{ post.body }}</p>
    </article>
    <hr>
    <counter></counter>
    <hr>
    <input type="text" v-model="inputText">
    <p>computed: {{ getUpperCaseText }}</p>
    <p>methods: {{ showUpperCaseText() }}</p>
    <hr>
    <template v-for="category in categories">
      <p :key="$uuid.v4()">
        {{ category }}
      </p>
    </template>
    <button @click="updateText">update text</button>
    <form>
      <div>
        <span>名前:</span>
        <input type="text"
          :value="form.name"
          @input="form.name = $event.target.value"
        >
        <p>名前: {{ getInputName }}</p>
      </div>
      <div>
        <span>性別:</span>
        <label>
          男性
          <input type="radio" value="male" v-model="form.sex">
        </label>
        <label>
          女性
          <input type="radio" value="female" v-model="form.sex">
        </label>
        <p>性別: {{ getRadioValue }}</p>
      </div>
      <div>
        <select v-model="form.selected">
          <option disabled value="">--出身地を選択してください--</option>
          <option v-for="option in form.options"
            :value="option.value"
            :key="option.id"
          >
            {{ option.value }}
          </option>
        </select>
        <p>出身地:{{ getSelectValue }}</p>
      </div>
      <div>
        <label>
          <input type="checkbox" v-model="form.checked">
          20際以上です
        </label>
        <p>チェックボックス: {{ getCheckBoxValue }}</p>
      </div>
    </form>
    <hr>
  </div>
</template>

<script>
  import ChildComponent from 'Components/ChildComponent';//webpack.configのComponents: path.resolve(__dirname, 'src/components')で絶対パスをとる指定をしているため。
  import Counter from 'Components/Counter';
  import InputText from 'Components/InputText';
  import axios from 'axios';

  export default {//１つのファイルを送りますよというような宣言。
    beforeCreate() {
      console.log('beforecreate');
      console.log(this.leads); //undefined
    },
    created() {
      console.log('created');
      console.log(this.posts);
      axios.get('/data.json').then(res => {
        this.posts = res.data.posts;
      });
    },
    //es6のメソッド記法
    data() {//data: function() {}の形での指定の方がより良い。
      return {
        leads: {
          message: '<span> Hello vue </span>',
          description: '',
        },
        isShow: true,
        inputText: '',
        id: 2,
        posts: [],
        classObject: {
          'is-green' :true,
        },
        items: [
          {
            id: this.$uuid.v4(),
            title: '1番目のリスト',
          },
          {
            id: this.$uuid.v4(),
            title: '２番目のリスト'
          },
          {
            id: this.$uuid.v4(),
            title: '3番目のリスト'
          }
        ],
        categories: ['Javascript', 'jQuery'],
        form: {
          name: '',
          sex: '',
          selected: '',
          options: [
            {
              id: this.$uuid.v4(),
              value: '東京都',
            },
            {
              id: this.$uuid.v4(),
              value: '埼玉県',
            },
            {
              id: this.$uuid.v4(),
              value: '神奈川県',
            },
            {
              id: this.$uuid.v4(),
              value: '千葉県',
            },
          ],
          checked: false,
        },
      }
    },
    methods: {
    incrementCount(){
      this.count++;//ここのthisはdata内にあるcountを使用している。（今はstateで管理しているので、Counter.vueのmapのところをさす。）
    },
    showUpperCaseText(){
      const upperCaseText = this.inputText.toUpperCase();//toUpperCase()大文字に変更できるメソッド
      // console.log(`method: ${upperCaseText}`);
      return upperCaseText;
    },
    addDescription() {
      this.leads.description = 'Vue-lesson'
    },
    changeTextSize() {
      //Object.assign({}・・・すべての列挙可能なプロパティの値を、1つ以上のコピー元オブジェクトからコピー先オブジェクトにコピーするために使用されます。戻り値としてコピー先オブジェクトを返します。
      this.classObject = Object.assign({}, this.classObject, {//Object.assign(target, ...sources)targetコピー先、sourceコピー元
        'is-large': true,
      });
    },
    //上の表記の省略型。
    // changeTextSize() {
    //   this.classObject = {...this.classObject, 'is-large': true};
    // },
    toggleShow() {
      this.isShow = !this.isShow;//boolean値の反転
    },
    updateText() {
      this.categories.splice(1, 1, 'Vue.js');//spliceメソッドは一つ要素を配列の中から削除して新しいものを一つ入れることができるもの。this.$set(this.categories, 1, 'Vue.js');の代わり・
    }
  },

  computed: {
    getUpperCaseText(){
      const upperCaseText = this.inputText.toUpperCase();
      // console.log(`computed: ${upperCaseText}`);
      return upperCaseText;
    },
    getInputName() {
      return this.form.name;
    },
    getRadioValue() {
      return this.form.sex;
    },
    getSelectValue() {
      return this.form.selected;
    },
    getCheckBoxValue() {
      return this.form.checked;
    },
  },watch: {
    inputText(value, oldValue) {//メソッド名は、監視したいdataのプロパティ名を指定する。第一引数には現在の値、第二引数には前回の値を受け取ることができる。
      console.log(`value -> ${value}`);
      console.log(`oldValue -> ${oldValue}`);
    },
    leads: {
      handler(){
        console.log('add description');
      },
      deep: true,
    }
  },
    components: {
      ChildComponent,//Childconponent: Childcomponentの省略形（同じ場合、一つにまとめて書くことが可能になる。
      Counter,//Counter: Counterの省略形。（上と同じ記法）
    }
  }
</script>

<style scoped>
  .is-green {
    color: green;
  }
  .is-large {
    font-size: 48px;
  }
  hr {
    margin: 16px 0;
  }
</style>