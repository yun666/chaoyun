function showTxt(index){
		$(".mainright .panel:eq("+index+")").show();
	// $($(".mainright textarea")[index]).siblings().hide();
		$(".mainright .panel:eq("+index+")").siblings().hide();
}
function refreshList(){
	//1.get qing
	console.log('in refreshList')
	$.ajax({
	    type:'GET',
	    url:'/msglist',
	    success:function(data) {
	    	console.log('data', data)
	    	$('table').empty();
	    	for(var i=0; i<data.length; i++) {
	    		var str = "<tr><td>"+data[i].name+ "</td><td>"+data[i].age+"</td><td>"+data[i].liuyan+"</td></tr>"

	    		$('table').append(str);	
	    	}
	    }
	});
	//2.pin html
	//3.html--->append/html()放入留言板table内
}

$('#leaveword').on('click',function(e){    //点击留言按钮用ajax留言
	$.ajax({
	  type: 'POST',
	  url: '/testmysql',
	  data: {
	  	"a":$("#a").val(),
	  	"b":$("#b").val(),
	  	"c":$("#c").val()
	  },
	  success: function(data){
	  	alert("留言成功");
	  	$("#a").val('');
	  	$("#b").val('');
	  	$("#c").val('');
	  	//refreshList();
	  }
	});
});
$('#showList').on('click',function(e){
	//$(".msg-table").show();
	refreshList();
});
//验证form表单
function validate_required(field,alerttxt){
	with(field){
		if (value==null||value=="") {
			alert(alerttxt);
			return false;
		}else{
			return true;
		}
	}
}
//验证form表单
function validate(thisform){
	with(thisform){
		if (validate_required(a,"请输入您的昵称")==false) {
			a.focus();
			return false;
		}else if (validate_required(c,"请输入您的留言信息")==false) {
			c.focus();
			return false;
		}else{return true;}
	}
}

