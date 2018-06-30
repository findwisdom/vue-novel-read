<template>
  <div id="home">
    <div class="header">
      <div class="header-left">欢乐书盟</div>
      <div class="header-right"><i class="cubeic-person"></i></div>
    </div>
    <div class="img">
      <cube-slide ref="slide" :data="items" @change="changePage">
        <cube-slide-item v-for="(item, index) in items" :key="index" @click.native="clickHandler(item, index)">
          <a :href="item.url">
            <img :src="item.image">
          </a>
        </cube-slide-item>
      </cube-slide>
    </div>
    <div class="cube-input-search">
      <cube-input v-model="searchValue"
                  placeholder="请输入内容"
      ></cube-input>
    </div>
    <div id="bookList">
      <ul>
        <template v-for="(item, index) in bookList">
          <li @click="pushRead(item)" class="book-one">
            <div class="book-img">
              <img src="//qidian.qpic.cn/qdbimg/349573/1011335417/150" alt="">
            </div>
            <div class="book-content">
              <h1 class="book-title">{{item.title}}</h1>
              <div class="book-description">{{item.description}}</div>
              <div class="book-author">
                <span class="book-author-left">
                  <i class="cubeic-person"></i> {{item.author}}
                </span>
                <span class="book-type">
                  <span class="book-type-border">
                    {{item.tag}}
                  </span>
                </span>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'

  export default {
    data () {
      return {
        bookList: [],
        items: [
          {
            url: 'http://www.didichuxing.com/',
            image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide01.png'
          },
          {
            url: 'http://www.didichuxing.com/',
            image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide02.png'
          },
          {
            url: 'http://www.didichuxing.com/',
            image: '//webapp.didistatic.com/static/webapp/shield/cube-ui-examples-slide03.png'
          }
        ],
        searchValue: ''
      }
    },
    created () {
      let url = 'http://47.98.221.113:7001/api/booklist'
      let _self = this
      axios.get(url)
        .then(function (response) {
          _self.bookList = response.data
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      pushRead (item) {
        this.$router.push({name: 'reader', path: '/reader', query: {code: item.code}})
      },
      changePage (current) {
        console.log('当前轮播图序号为:' + current)
      },
      clickHandler (item, index) {
        console.log(item, index)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  #home
    position relative
    overflow hidden
    padding 0 15px
    overflow hidden
    /*background-color #f6f7f9*/

  .header
    height 20px
    line-height 20px
    padding 12px 0
    display flex

  .header-left
    font-weight blod
    font-size 16px
    padding 0 10px
    text-align left
    flex 4

  .header-right
    padding 0 5px
    text-align right
    flex 1
  .img
    overflow hidden
    height 139px
  .cube-input-search
    overflow hidden

  #bookList
    margin-top 20px
  .book-one
    height 88px
    display flex
    overflow hidden
    padding 12px 0
  .book-img
    width 66px
    height 88px
    margin-right 6px
  .book-img img
    width 100%
    height 100%
  .book-content
    flex 1
    height 88px
    overflow hidden
    .book-title
      font-weight bold
      font-size 15px
      text-align left
      line-height 1.4
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
    .book-description
      text-align justify
      height 34px
      padding 5px 2px
      line-height 1.4
      color #969ba3
      font-size 14px
      overflow : hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    .book-author
      display flex
      color #969ba3
      font-size 14px
      text-align left
      height 24px
      line-height 24px
      .book-author-left
        flex 1
      .book-type
        width 100px
        display inline-block
        text-align right
        .book-type-border
          border-radius 5px
          text-align center
          color red
          border 1px solid red
          width 100px
          font-size 12px
          padding 0 10px
</style>
