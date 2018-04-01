var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Goods = require('../models/goods');

/* 链接数据库 */
mongoose.connect('mongodb://127.0.0.1:27017/myVueProject');

mongoose.connection.on("connected",function(){
	console.log("MongoDB connected success");
});

mongoose.connection.on("error",function(){
	console.log("MongoDB connected fail");
});
mongoose.connection.on("dsiconnected",function(){
	console.log("MongoDB connected dsiconnected");
});

router.get("/",function(req,res,next){
	// console.log(req,req.query,111111);
	// let page = parseInt(req.query.page);
	// let pageSize = parseInt(req.query.pageSize);
	// let sort = req.query.sort;
	// let skip = (page-1)*pageSize;
	// let params = {};
	// let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
	// goodsModel.sort({'salePrice':sort});

	// goodsModel.exec(function(err,doc){
	Goods.find({},function(err,doc){
		if(err){
			res.json({
				status:'1',
				msg:err.message
			});
		}else{
			res.json({
				status:"200",
				msg:"",
				result:{
					count:doc.length,
					list:doc
				}
			});
		}

	});
	// 加入购物车
	router.post("/addCart",function(req,res,next){
		var userId="100000077";
		var productId= req.body.parductId;
		var User = require('../models/user');
		// console.log(User,11111)
		User.findOne({userId:userId},function(err,userDoc){
			if(err){
				res.json({
					status:'1',
					msg:err.message
				});
			}else{
				console.log("userDoc:"+userDoc);
				if(userDoc){
					Goods.findone({productId:productId},function(err1,doc){
						if(err){
							res.json({
								status:'1',
								msg:err1.message
							})
						}else{
							if(doc){
								doc.productNum = 1;
								doc.checked = 1;
								userDoc.cartList.push(doc);
								userDoc.save(function(err2,doc2){
									if(err2){
										res.json({
											status:'1',
											msg:err2.message
										});
									}else{
										res.json({
											status:"0",
											mag:"",
											result:"success"
										})
									}


								})
							}
						}
					})
				}
			}

		})
	})


});

module.exports = router;
