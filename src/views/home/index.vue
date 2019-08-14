<template>
  <el-row :gutter="30" v-loading.fullscreen.lock="fullscreenLoading" element-loading-text="正在加载"
    element-loading-background="rgba(0, 0, 0, 0.7)">
    <el-col :span="12" v-for="(item,index) in newsList" :key="item.title">
      <el-card>
        <div slot="header" class="clearfix">
          <h3>{{item.title}}</h3>
          <i class="fa fa-clock-o" aria-hidden="true" style="font-size: 10px;"> 发布时间：{{item.pubdate.substring(0,10)}}</i>
        </div>
        <div class="content">
          {{item.content}}
        </div>
        <div class="option">
          <el-badge class="item" style="float: left;">
            <el-button type="text" class="button view fa fa-eye" @click="getIndex(index)"> 查看全文</el-button>
          </el-badge>

          <el-badge :value="200" :max="999" class="item">
            <el-tooltip content="点赞" placement="bottom" effect="light">
              <el-button size="small" class="fa fa-thumbs-up fa-2x" aria-hidden="true"></el-button>
            </el-tooltip>
          </el-badge>
          <el-badge :value="2000" :max="999" class="item">
            <el-tooltip content="评论" placement="bottom" effect="light">
              <el-button size="small" class="fa fa-comment fa-2x" aria-hidden="true"></el-button>
            </el-tooltip>
          </el-badge>
          <el-badge :value="200" :max="999" class="item">
            <el-tooltip content="收藏" placement="bottom" effect="light">
              <el-button size="small" class="fa fa-heart fa-2x" aria-hidden="true"></el-button>
            </el-tooltip>
          </el-badge>
          <el-badge :value="200" :max="999" class="item">
            <el-tooltip content="分享" placement="bottom" effect="light">
              <el-button size="small" class="fa fa-share-alt fa-2x" aria-hidden="true"></el-button>
            </el-tooltip>
          </el-badge>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
  export default {
    name: 'Index',
    mounted() {
      this.fullscreenLoading = true;
      this.$axios.get('http://api.komavideo.com/news/list').then(res => {
        this.newsList = res.data;
        this.fullscreenLoading = false;
        console.log(res.data)
      })
    },
    data() {
      return {
        newsList: [], //保存新闻
        fullscreenLoading: false, //全屏加载
      }
    },
    methods:{
      getIndex(index){
        // window.location.href=this.newsList[index].link;
        window.open(this.newsList[index].link,'newwindow')
        console.log(index)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import url("../../style/home/index.less");
</style>
