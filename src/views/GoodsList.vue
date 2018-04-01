<template>
  <div>
    <nav-header></nav-header>
    <nav-bread></nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">Sort by:</span>
          <a href="javascript:void(0)" class="default cur">Default</a>
          <a href="javascript:void(0)" class="price" @click="sortGoods">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
          <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>Price:</dt>
              <dd><a href="javascript:void(0)" v-bind:class="{cur : defaultCur== 'default'}" @click="defaultCur = 'default'">All</a></dd>
              <dd v-for="(item,index) in priceList">
                <a href="javascript:void(0)" @click ="defaultCur = index" v-bind:class="{cur : defaultCur == index }" >{{item.beginPrice |numFormat}} - {{item.endPrice |numFormat }}</a>
              </dd>
            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="(k,v) in goodlist">
                  <div class="pic">
                    <a href="#"><img v-lazy="'/static/'+k.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{k.productName}}</div>
                    <div class="price">{{k.salePrice |numFormat }}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn-cart" @click="addCart(k.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>

</template>
<script>
import './../assets/css/base.css'
import './../assets/css/product.css'
import NavHeader from '@/components/NavHeader.vue'
import NavFooter from '@/components/NavFooter.vue'
import NavBread from '@/components/NavBread.vue'
import axios from 'axios'
export default{
  data(){
    return {
      goodlist:[],
      priceList:[
        {
          "beginPrice":"0",
          "endPrice":"500"
        },
        {
          "beginPrice":"500",
          "endPrice":"1000"
        },
        {
          "beginPrice":"1000",
          "endPrice":"2000"
        }
      ],
      defaultCur:'default',
      sortFlag:true,
      pageSize:'8',
      page:'1',

    }
  },
  components:{
    NavHeader:NavHeader,
    NavFooter:NavFooter,
    NavBread:NavBread,

  },
  mounted:function(){
    this.getGoodList();

  },
  methods:{
    getGoodList(){
      var param = {
        'page':this.page,
        'pageSize':this.pageSize,
        'sort':this.sortFlag ? 1 : -1,

      }
      axios.get('/goods',{
        params:param
      }).then((res)=>{
        var res = res.data;
        this.goodlist = res.result.list;
      }).catch((err)=>{
        console.log('error:',err)
      })
    },
    sortGoods(){
      this.sortFlag = !this.sortFlag;
      this.page = 1;
      this.getGoodList();
    },
    addCart(productId){
      axios.post("/goods/addCart",{
        productId:productId
      }).then((res)=>{
        if(res.status ==0){
          console.log('success')
        }else{
          console.log(res.msg)
        }
      })

    }


  },
  filters:{
    numFormat(value){
      if( value % 1 == 0) {
        return value+'.00'
      }

    }

  }
}

</script>
