<template>
    <div id="home">
        <div id="bookList">
            <ul>
                <template v-for="(item, index) in bookList">
                    <li @click="pushRead(item)">{{item.title}}</li>
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
            bookList: []
        }
    },
    created () {
        let url = 'http://localhost:7001/api/booklist'
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
        }
    }
    }
</script>
