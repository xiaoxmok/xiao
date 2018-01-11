/**
 * mod header
 * @authors 	Inman Shaw
 * @date    	2014-05-22 17:32:14
 * @version 	1.0.0
 */
define(function(require, exports, module) {
 
	// 通过 require 引入依赖
	var $ = require('jquery');

	function header(){
		$('body').on('mouseover mouseout', '.topnav li', function(e){
			e.stopPropagation(); 
			$this = $(this);
			if($this.find('.topnav-sub').length>0){
				var $sub = $this.find('.topnav-sub');
				switch(e.type){
					case 'mouseover':
						$this.addClass('topnav-hover');
						break;
					case 'mouseout':
						$this.removeClass('topnav-hover');
						break;
					default:break;
				}
			}
		})
	}
	exports.header=header;	

});
