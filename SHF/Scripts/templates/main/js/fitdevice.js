(function(){
	function change(){
		document.documentElement.style.fontSize=document.documentElement.clientWidth/600*20+'px';
	}
	change();
	window.addEventListener('resize',change,false);
})();