var num;
console.log(num);
num = 123;
function num(num) {
//dosomething
}
var obj = {
	num: 666, 
	log: () => {
	    console.log(this.num);
	},
	child: {
		num: 777,
		log: function () {
			console.log(this.num);
		}
	}
}
console.log(obj.log(),111);
console.log(obj.child.log(),222);
var fn = obj.child.log;
console.log(fn(),333);

function num(num) {
//dosomething
}
666,undefined,123


function test(){
	console.log('aaa',111);
}
console.log(test(),222);


var num;
console.log(num);
num = 123;
function num(num) {
//dosomething
}
var obj = {
	num: 666,
	log: () => {
	    console.log(this,this.num);
	},
	child: {
		num: 777,
		log: function () {
			console.log(this,this.num);
		}
	}
}
console.log(obj.log(),11);
console.log(obj.child.log(),22);
var fn = obj.child.log;
console.log(fn());