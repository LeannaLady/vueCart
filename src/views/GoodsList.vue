<template>
	<div>
		<nav-header></nav-header>
		<nav-bread></nav-bread>
		<div class="accessory-result-page accessory-page">
		  <div class="container">
		    <div class="filter-nav">
		      <span class="sortby">Sort by:</span>
		      <a href="javascript:void(0)" class="default cur">Default</a>
		      <a href="javascript:void(0)" class="price">Price <svg class="icon icon-arrow-short"><use xlink:href="#icon-arrow-short"></use></svg></a>
		      <a href="javascript:void(0)" class="filterby stopPop">Filter by</a>
		    </div>
		    <div class="accessory-result">
		      <!-- filter -->
		      <div class="filter stopPop" id="filter">
		        <dl class="filter-price">
		          <dt>Price:</dt>
		          <dd><a href="javascript:void(0)">All</a></dd>
		          <dd>
		            <a href="javascript:void(0)">0 - 100</a>
		          </dd>
		        </dl>
		      </div>

		      <!-- search result accessories list -->
		      <div class="accessory-list-wrap">
		        <div class="accessory-list col-4">
		          <ul>
		            <li v-for="(k,v) in goodlist">
		              <div class="pic">
		                <a href="#"><img v-bind:src="'/static/'+k.productImg" alt=""></a>
		              </div>
		              <div class="main">
		                <div class="name">{{k.productName}}</div>
		                <div class="price">{{k.productPrice}}</div>
		                <div class="btn-area">
		                  <a href="javascript:;" class="btn btn--m">加入购物车</a>
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
		getGoodList:function(){
			axios.get('/api/goods').then((res)=>{
				var res = res.data;
				this.goodlist = res.result;
			}).catch((err)=>{
				console.log('error:',err)
			})
		}

	}
}
	
</script>
