//几种排序算法的封装

var sort = {
	sort: function (array) {
		return array.sort(function (a,b) {
			return a-b;
		});
	},
	//冒泡排序，依次比较前后两个，大的放在后面，时间复杂度 n的平方
	bubbleSort: function (array) {
		var len = array.length;
		var i,j,d;
		for(i = 0; i < len; i ++) {
			for(j = 1; j < len-i; j ++) {
				if (array[j-1] > array[j]) {
					d = array[j];
					array[j] = array[j-1];
					array[j-1] = d;
				}
			}
		}
		return array;
	},
	//选择排序，首先在待排序序列中找到最小的元素，将其放入储存有序序列中，
	            //同时从待排序序列中删除这个元素。
	selectSort: function (array) {
		var reSort = [];
		var len    = array.length;
		var min,i;
		for (i = 0; i < len; i ++) {
			min = Math.min.apply(null,array);
			reSort.push(min);
			array.splice(array.indexOf(min),1);
		}
		return reSort;
	},
	//插入排序，从待排序序列的第0个元素开始排序，该元素可以认为已经是有序的；取出下一个元素，在已经排序的元素序列中，从后向左遍历
	//如果已排序元素大于新元素，将钙元素
	insertSort: function (array) {
		var len = array.length;
		var i,j;
		for( i = 1; i < len; i ++ ) { //从1开始，因为array[0]默认就是已经排序好的
			j = i;
			var value = array[j];//保存未排序序列
			while(array[j-1] > value){
				array[j] = array[j-1];
				j --;
				if (j === 0) {
					break;
				}
			}
			array[j] = value;//j就是要插入的位置
		}
		return array;
	},

	//快速排序，找一个基准值，比它小的放在它前面比它大的放在它后面
	quickSort: function (array) {
		var len = array.length;
		if (len <= 1) {
			return array;
		}
		var pivot    = array[0];		
		var leftArr  = [];
		var rightArr = [];
		for(var i = 1; i < len; i ++) {
			if (array[i] < pivot) {
				leftArr.push(array[i]);
			} else {
				rightArr.push(array[i]);
			}
		}
		return arguments.callee(leftArr).concat(pivot,arguments.callee(rightArr));
	}

}
