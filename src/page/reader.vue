<template>
    <div id="reader">
        <!--<div class="button-click" @click="configShow"></div>-->
        <div class="button-header" v-show="configVisible">
            <div class="button-header-wrap">
                <div class="set-header-item-1" @click="getBack">
                    <i class="cubeic-back"></i>
                </div>
                <div class="set-header-item-3">
                    {{$route.query.code}}
                </div>
                <div class="set-header-item-1">
                    <i class="cubeic-person"></i>
                </div>
            </div>
        </div>
        <div class="button-buttom" v-show="configVisible">
            <ul class="set-item-wrap">
                <li class="set-item" @click="chapterShow">
                    <div class="set-item-icon"><i class="cubeic-calendar"></i></div>
                    <div class="set-item-font">目录</div>
                </li>
                <li class="set-item">
                    <div class="set-item-icon"><i class="cubeic-setting"></i></div>
                    <div class="set-item-font">设置</div>
                </li>
                <li class="set-item">
                    <div class="set-item-icon"><i class="cubeic-aim"></i></div>
                    <div class="set-item-font">进度</div>
                </li>
                <li class="set-item">
                    <div class="set-item-icon"><i class="cubeic-alert"></i></div>
                    <div class="set-item-font">夜间</div>
                </li>
                <li class="set-item">
                    <div class="set-item-icon"><i class="cubeic-tag"></i></div>
                    <div class="set-item-font">书签</div>
                </li>
            </ul>
        </div>
        <!--<cube-button @click="showContents" style="position: absolute;top: 0;z-index: 4">Show Drawer</cube-button>-->
        <div class="read-detail-header">
            {{titleText}}
        </div>
        <div class="read-detail-wrap" @click="configShow">
            <cube-scroll
                    ref="scroll"
                    :data="items"
                    :options="options"
                    @pulling-down="pulling">
                <slot>
                    <div class="read-detail">
                        <template v-for="(item, index) in items">
                        <section :key="index" class="read-detail-chapter">
                        <div v-html="item" class="read-text-style"></div>
                        <cube-button  v-if="index===items.length - 1" @click.stop="nextChapter" class="read-button">加载下一章</cube-button>
                        </section>
                        </template>
                    </div>
                </slot>
            </cube-scroll>
            <!--<cube-index-list :data="items">-->
                <!--<cube-index-list-item-->
                        <!--v-for="(item, index) in items"-->
                        <!--:key="index"-->
                        <!--:item="item">-->
                    <!--<div class="custom-item">我是自定义 {{item}}</div>-->
                <!--</cube-index-list-item>-->
            <!--</cube-index-list>-->
            <!--<div class="read-detail">-->
                <!--<template v-for="(item, index) in items">-->
                    <!--<section :key="index" class="read-detail-chapter">-->
                        <!--<div v-html="item" class="read-text-style"></div>-->
                        <!--<cube-button  v-if="index===items.length - 1" @click.stop="nextChapter" class="read-button">加载下一章</cube-button>-->
                    <!--</section>-->
                <!--</template>-->
            <!--</div>-->
        </div>
        <transition name="fade">
            <div class="contents" v-show="isVisible" @click="hideContents">
                <transition name="move">
                    <div class="contents-main"  @click.stop @transitionend="transitionend" v-show="isVisible" >
                        <div class="contents-title">目录</div>
                        <div class="contents-wrap" ref="contentsmain">
                            <div class="contents-wrap-sub">
                                <ul>
                                    <template v-for="(item, index) in content">
                                        <li class="contents-chapter d_jump" @click="selectItem(item, index)" :key="index" :class="selectedIndex===index?'read-select-active':''">
                                            {{item.title}}
                                        </li>
                                    </template>
                                </ul>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>
        <!--<div class="read-config" v-show="">目录</div>-->
        <!--<cube-button @click="showContents" style="position: absolute;top: 0;z-index: 1">Show Drawer</cube-button>-->
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'reader',
    data () {
        return {
            isVisible: false, // 目录是否显示
            configVisible: false,
            configRead: false,
            clickVisible: true,
            title: '',
            content: [],
            items: [],
            selectedIndex: 0,
            options: {
                scrollbar: {
                    fade: false
                },
                pullDownRefresh: {
                    threshold: 90,
                    stop: 40,
                    txt: 'Refresh success'
                }
            }
        }
    },
    computed: {
        titleText () {
            if (this.content.length === 0) {
                return ''
            } else {
                console.log(this.content[this.selectedIndex])
                return this.content[this.selectedIndex].title
            }
        }
    },
    created () {
        window.addEventListener('mousewheel', (e) => {
            if (e.deltaY === 1) {
                e.preventDefault()
            }
        })
        let _self = this
        let url = `http://47.98.221.113:7001/api/booklist/${this.$route.query.code}`
        axios.get(url)
            .then(function (response) {
                _self.content = response.data
                // _self.title = response.data.title
                let url = `http://47.98.221.113:7001/api/bookread?href=${response.data[0].href}`
                axios.get(url)
                    .then(function (response) {
                        _self.selectedIndex = 0
                        _self.$nextTick(function () {
                            _self.items = [response.data]
                        })
                        // _self.hideContents()
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
            })
            .catch(function (error) {
                console.log(error)
            })
    },
    mounted () {
    },
    methods: {
        getBack () {
            this.$router.push(-1)
        },
        pulling () {
            console.log(11111111111)
            this.nextChapter()
            this.$refs.scroll.forceUpdate()
        },
        selectItem (item, index) {
            let _self = this
            let url = `http://47.98.221.113:7001/api/bookread?href=${item.href}`
            axios.get(url)
                .then(function (response) {
                    _self.selectedIndex = index
                    _self.hideContents()
                    _self.items = [response.data]
                    // _self.hideContents()
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        // 章节控制
        nextChapter () {
            let _self = this
            _self.selectedIndex = _self.selectedIndex + 1
            let href = _self.content[_self.selectedIndex].href
            let url = `http://47.98.221.113:7001/api/bookread?href=${href}`
            axios.get(url)
                .then(function (response) {
                    _self.items.push(response.data)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        showContents () {
            this.isVisible = true
            this.$nextTick(function () {
                this.jump(this.selectedIndex)
            })
        },
        hideContents () {
            this.isVisible = false
        },
        transitionend () {
            console.log('触发了出现动画')
        },
        jump (index) {
            let jump = document.querySelectorAll('.d_jump')
            // 获取需要滚动的距离
            let total = jump[index].offsetTop - 80
            // Chrome
            this.$refs.contentsmain.scrollTop = total
            // Firefox
            this.$refs.contentsmain.scrollTop = total
        },
        configShow () {
            this.configVisible = !this.configVisible
        },
        chapterShow () {
            this.configVisible = false
            this.isVisible = !this.isVisible
        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
#reader
    height: 100vh
    width: 100vw
    background: url(../../static/image/skin-default-t.ece62.jpg) no-repeat center top,url(../../static/image/skin-default-b.79f06.jpg) no-repeat center bottom,url(../../static/image/skin-default-m.35905.jpg) repeat-y center 119px
    background-size: 100%
    color: #000000
/*内容阅读样式    */
.read-detail-header
    padding: 0 10px
    font-size: 12px
    text-align left
    line-height: 44px
    height: 44px
    position: absolute
    z-index: 4
    top: 0
    right: 0
    left: 0
    overflow: hidden
.read-detail-wrap
    position: absolute
    z-index: 2
    top: 50px
    right: 0
    bottom: 0
    left: 0
    overflow: hidden
    /*overflow: auto*/
    /*overflow-y:scroll*/
    /*-webkit-overflow-scrolling: touch*/
/*.read-detail-wrap::-webkit-scrollbar-track-piece
    background-color: rgba(0, 0, 0, 0)
    border-left: 1px solid rgba(0, 0, 0, 0)
.read-detail-wrap::-webkit-scrollbar
    width: 5px
    height: 13px
    -webkit-border-radius: 5px
    -moz-border-radius: 5px
    border-radius: 5px
.read-detail-wrap::-webkit-scrollbar-thumb
    background-color: rgba(0, 0, 0, 0.5)
    background-clip: padding-box
    -webkit-border-radius: 5px
    -moz-border-radius: 5px
    border-radius: 5px
    min-height: 28px
.read-detail-wrap::-webkit-scrollbar-thumb:hover
    background-color: rgba(0, 0, 0, 0.5)
    -webkit-border-radius: 5px
    -moz-border-radius: 5px
    border-radius: 5px
 */
.cube-scroll-wrapper
    height: 100%
.read-detail
    padding 0 12px
.read-detail-chapter
    padding 15px 0
.read-text-style
    text-align: justify
    line-height: 2rem
    font-size: 1rem
.read-select-active
    color: #ed424b
.read-button
    text-align: center
    font-size: .875rem
    line-height: 2.25rem
    border-radius: 99px
    background: #ed424b
    color: #fff
    width: 17.5rem
    padding: 0 1rem
    margin: 2rem 0
/*内容阅读样式    */

/*章节目录样式    */
.contents
    position: absolute
    z-index: 5
    top: 0
    right: 0
    bottom: 0
    left: 0
    overflow: hidden
    background: rgba(0, 0, 0, .2)
.contents-main
    position: absolute
    top: 0
    left: 100%
    bottom: 0
    width: 80vw
    display: flex
    flex-direction: column
    overflow: auto
    box-shadow: -2px 0 2px rgba(0, 0, 0, .2)
    transform: translate3d(-80vw, 0, 0)
    background: #fff
.contents-title
    text-align center
    width: 100%
    position: fixed
    top: 0
    right: 0
    left: 0
    font-size 12px
    color: #ed424b;
    border-bottom:1px solid #ed424b;
    line-height 43px
    height 43px
.contents-wrap
    position: absolute
    top: 44px
    left: 0
    bottom: 0
    right: 0
    width: 80vw
    display: flex
    flex-direction: column
    overflow: auto
contents-wrap-sub
    overflow: auto
.fade-enter-active, .fade-leave-active
    transition: opacity .3s ease-in-out
.fade-enter, .fade-leave-to
    opacity: 0
.move-enter-active, .move-leave-active
    transition: transform .3s ease-in-out
.move-enter, .move-leave-to
    transform: translate3d(0, 0, 0)
.contents-chapter
    text-align: left
    font-size: 12px
    display: block
    overflow: hidden
    height 44px
    line-height 44px
    padding: 0 12px
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
.contents-chapter::after
    display: block
    margin-top: -1px
    content: ''
    transform: scaleY(.75)
    border-top: 1px solid #f0f1f2
/*章节目录样式    */

/*书籍设置配置    */
.button-click
    opacity: 1
    position: absolute
    top: 20vh
    bottom: 20vh
    left: 0
    right: 0
    /*z-index 5*/
.button-buttom
    overflow hidden
    z-index 30
    color: #ffffff
    position: absolute
    background: black
    right: 0
    left: 0
    bottom: 0
    opacity:0.8
    height 48px
.button-header
    overflow hidden
    z-index 30
    color: #ffffff
    position: absolute
    background: black
    top: 0
    right: 0
    left: 0
    opacity:0.8
    height 48px
.button-header-wrap
    display: flex
.set-header-item-1
    flex: 1
    padding 5px 0
    height:38px
    line-height 38px
    text-align:center
.set-header-item-3
    flex: 3
    padding 5px 0
    height:38px
    line-height 38px
    text-align:center
.set-item-wrap
    display: flex

.set-item
    height:38px
    padding 5px 0
    text-align: center
    flex: 1
.set-item-icon
    padding: 3px
    font-size: 16px
    line-height: 16px
    text-align center
    fill: currentColor
.set-item-font
    transform: scale(0.8)
    font-size: 12px
    line-height: 12px
    font-weight: 300
    position: relative
    vertical-align: bottom
/*书籍设置配置    */
</style>
