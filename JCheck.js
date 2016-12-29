//================================
//功能介绍：表单验证
//正则修改:wxg 2010-05-19
//================================
String.prototype.trim = function()
{
    return this.replace(/(^\s*)|(\s*$)/, "");
}

String.prototype.length2 = function()
{
    var cArr=this.match(/[^\x00-xff]/ig);
    return this.length+(cArr==null?0:cArr.length);
}


function IsNumInputAndFormat(ctrl,notNull,Not0,cent,isThousand)
{
    if(IsNumInput(ctrl,notNull,Not0))
    {
        ctrl.value=formatNumber(ctrl.value,cent==null?2:cent,isThousand==false?false:true);
        return true;
    }
    return false;
}

function IsNumInput(ctrl,notNull,Not0)
{
    var LengthMin=0;

    if(notNull)
        LengthMin=1;
        
    var type="NUMDATA";
    if(Not0)
        type="NUMNOT0";

    if(!CheckInput(ctrl,"请输入正确的数值!输入内容",type,LengthMin,""))                
        return false;
    return true;
}

function CheckInput(Id,Title,Format,LengthMin,LengthMax,silent)
{
    if(silent)
    {
        return CheckInputNoAlert(Id,Title,Format,LengthMin,LengthMax);
    }
    var Str=Id.value.trim();
	//检测并初始化输入参数
//	if(Id=="")
//	{
//	    alert('请输入待检测项目的ID!');return false;
//	}
//	if(Title == '' )
//	{
//		alert('请输入待检测项目的名称!');return false;
//	}
	if(Str == '' && LengthMin != 0 )
	{
		alert('请输入' + Title + '!' );
		try
		{
		    Id.focus();
		}
		catch(e)
		{
		}
		return false;
	}
	if(Format == '' )
	{
		Format = 'ELSE';
	}
	else
	{
		Format =Format.toUpperCase();
	}
	if( LengthMin == '' ) LengthMin = 0;
	if( LengthMax == '' ) LengthMax = 255;


	//判断是否合法
	if(Str!='')
	{
		if(Str.length2() < LengthMin)
		{
			window.alert( Title + '的长度不能小于' + LengthMin + '个字符, 且不能大于' + LengthMax +  '个字符!');
			Id.focus();
			return false;
		}
		if(Str.length2() > LengthMax )
		{
			window.alert( Title + '的长度不能大于' + LengthMax +  '个字符!' );
			Id.focus();
			return false;
		}
		if(Format == 'DATE')
		{
			if(!CheckDate(Str))
			{
				window.alert( Title + '格式不正确!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'EMAIL')
		{
			if(!CheckEmail(Str))
			{
				window.alert( Title + '格式不正确!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'URL')
		{
			if(!CheckURL(Str))
			{
				window.alert( Title + '格式不正确!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'POST')
		{
			if(!CheckPost(Str))
			{
				window.alert( Title + '格式不正确!');
				Id.focus();
				return false;
			}
		}
		if(Format=='MOBILE')
		{
		    if(!CheckMobile(Str))
			{
				window.alert( Title + '格式不正确!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'PHONE')//也可支持手机号码
		{
			if(!CheckPhone(Str)&&!CheckMobile(Str))
			{
				window.alert( Title + '格式不正确!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'PC')
		{
			if(!CheckPC(Str))
			{
				window.alert( Title + '格式不正确!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'NUM')
		{
			if(!CheckNum(Str))
			{
				window.alert( Title + '不是纯数字!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'NUMDATA')
		{
			if(!CheckNumData(Str))
			{
				window.alert( Title + '不是纯数值!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'NUMNOT0')
		{
			if(!CheckNumData(Str))
			{
				window.alert( Title + '不是纯数值!');
				Id.focus();
				return false;
			}
			else if(parseFloat(Str)==0)
			{
				window.alert( Title + '不能为零!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'HZ')
		{
			if(!CheckPwd(Str))
			{
				window.alert( Title + '由数字、字母、下划线组成!!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'UN')
		{
			if(!CheckUserName(Str))
			{
				window.alert( Title + '必须字母开头并且由字母、数字、下划线组成!!');
				Id.focus();
				return false;
			}
		}
		if(Format == 'QQ')
		{
			if(!CheckQQ(Str))
			{
				window.alert( Title + '格式不正确!');
				Id.focus();
				return false;
			}
		}
		return true;
	}
	return true;
}

function CheckInputNoAlert(Id,Title,Format,LengthMin,LengthMax)
{
    
 var Str=Id.value.trim();
	if(Str == '' && LengthMin != 0 )
	{

		try
		{
		    Id.focus();
		}
		catch(e)
		{
		}
		return false;
	}
	if(Format == '' )
	{
		Format = 'ELSE';
	}
	else
	{
		Format =Format.toUpperCase();
	}
	if( LengthMin == '' ) LengthMin = 0;
	if( LengthMax == '' ) LengthMax = 255;


	//判断是否合法
	if(Str!='')
	{
		if(Str.length2() < LengthMin)
		{

			Id.focus();
			return false;
		}
		if(Str.length2() > LengthMax )
		{

			Id.focus();
			return false;
		}
		if(Format == 'DATE')
		{
			if(!CheckDate(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'EMAIL')
		{
			if(!CheckEmail(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'URL')
		{
			if(!CheckURL(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'POST')
		{
			if(!CheckPost(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format=='MOBILE')
		{
		    if(!CheckMobile(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'PHONE')
		{
			if(!CheckPhone(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'PC')
		{
			if(!CheckPC(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'MONEY')
		{
		    if(Str.length>1&&"$￥".indexOf(Str.subStr(0,1))>0)
		        Str=Str.subStr(1);
			if(!CheckNumData(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'NUM')
		{
			if(!CheckNum(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'NUMDATA')
		{
			if(!CheckNumData(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'NUMNOT0')
		{
			if(!CheckNumData(Str))
			{

				Id.focus();
				return false;
			}
			else if(parseFloat(Str)==0)
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'HZ')
		{
			if(!CheckPwd(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'UN')
		{
			if(!CheckUserName(Str))
			{

				Id.focus();
				return false;
			}
		}
		if(Format == 'QQ')
		{
			if(!CheckQQ(Str))
			{
				Id.focus();
				return false;
			}
		}

		return true;
	}
	return true;
}




//显示、隐藏错误信息
function  ShowErrorMessage(id,state)
{
	if(state=='0')
	{
		id.style.display = 'none';
	}
	else if(state=='1')
	{
		id.style.display = '';
	}
}


//start of kuair 添加//
//验证时间匹配 ,style=1表示（2008-08-00 ）style=2表示（2008-08-00 12:12:12）格式,style其他，则表示（12:12:12）格式
function CheckDate1(str,style)
{ 

if(!style)
style=0;
var r;
var reg1=/^(\d{1,4})(-|\/|\\)(\d{1,2})\2(\d{1,2})$/;
var reg2=/^(\d{1,4})(-|\/|\\)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/; 
var reg3=/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/;
if(style==1)
    r=str.match(reg1);
else if(style==2)
    r=str.match(reg2);
else
    r=str.match(reg3);
if(r==null)
    return false;
else
    return true;
}


//判断短日期(如2003-12-05) 
function isDate(date)
{ 
    var r = date.match(/^(\d{1,4})(\-|\|)(\d{1,2})(\-|\|)(\d{1,2})$/); 
    if(r==null)
    { 
        return false; 
    }
   
    if (r[1]<1 || r[3]<1 || r[3]-1>12 || r[5]<1 || r[5]>31) 
    { 
        return false; 
    } 
    var d= new Date(r[1], r[3]-1, r[5]); 
    if(d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[5])
    { 
        return true; 
    } 
} 



//函数名：chkdate 
//功能介绍：检查是否为日期 
//参数说明：要检查的字符串 
//返回值：0：不是日期 1：是日期 
function CheckDate(datestr) 
{ 
	var lthdatestr 
	if (datestr != '') 
		lthdatestr= datestr.length ; 
	else 
		lthdatestr=0; 

	var tmpy=''; 
	var tmpm=''; 
	var tmpd=''; 
	var status; 
	
	status=0; 
	if ( lthdatestr== 0) return false;

	for (i=0;i<lthdatestr;i++) 
	{	if (datestr.charAt(i)== '-') 
		{ 
			status++; 
		} 
		if (status>2) 
		{ 
			return false; 
		} 
		if ((status==0) && (datestr.charAt(i)!='-')) 
		{ 
			tmpy=tmpy+datestr.charAt(i) 
		} 
		if ((status==1) && (datestr.charAt(i)!='-')) 
		{ 
			tmpm=tmpm+datestr.charAt(i) 
		} 
		if ((status==2) && (datestr.charAt(i)!='-')) 
		{ 
			tmpd=tmpd+datestr.charAt(i) 
		} 

	} 

	year=new String (tmpy); 
	month=new String (tmpm); 
	day=new String (tmpd) 
	//tempdate= new String (year+month+day); 
	//alert(tempdate); 
	if ((tmpy.length!=4) || (tmpm.length>2) || (tmpd.length>2)) 
	{ 
		return false; 
	} 
	if (!((1<=month) && (12>=month) && (31>=day) && (1<=day)) ) 
	{ 
		return false; 
	} 
	if (!((year % 4)==0) && (month==2) && (day==29)) 
	{ 
		return false; 
	} 
	if ((month<=7) && ((month % 2)==0) && (day>=31)) 
	{ 
		return false; 
	} 
	if ((month>=8) && ((month % 2)==1) && (day>=31)) 
	{ 
		return false; 
	} 
	if ((month==2) && (day==30)) 
	{ 
		return false; 
	} 

	return true; 
}


//是否Email格式
function CheckEmail(EmailText)
{
//    var checkOk='@';
//    var checkStr=EmailText;
//    var allValid=true;
//    var decPoints=0;
//    var allNum='';
//    
//    if(checkStr.charAt(0)=='@')
//       return(false);
//    if(checkStr.charAt(checkStr.length-1)=='@')
//       return(false);
//    if(checkStr.charAt(checkStr.length-1)=='.')
//       return(false);
//   
//   a_valid=0;
//   a_count=0;
//   d_valid=0;
// 
//    for(i=0;i<checkStr.length;i++)
//    {
//      ch=checkStr.charAt(i);
//      if(ch=='@')
//       {a_valid=1;a_count++;} 
//      if(ch=='.')
//      {d_valid=1;}
//    }
//   
//    if(a_count>1)
//      return(false);
//      
//    if(a_valid==1&&d_valid==1)
//      return(true);
//    else 
//      return(false);

   var re=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
   return re.test(EmailText);
}


//是否URL格式
function CheckURL(Str)
{
//	if (Str.length < 7 ) return false;
//	Str =Str.toUpperCase();
//	if (Str.substr( 0,7) != 'HTTP://') return false;
//	if (Str.indexOf( '.') == -1 ) return false;
//	return true;
	
   //var re=/http(s)?:\/\/([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?/;
  // return re.test(Str);
   
   Str=Str.toLowerCase();
   var strRegex = "^((https|http|ftp|rtsp|mms)?://)" 
    + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@ 
          + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184 
          + "|" // 允许IP和DOMAIN（域名）
          + "([0-9a-z_!~*'()-]+\.)*" // 域名- www. 
          + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名 
          + "[a-z]{2,6})" // first level domain- .com or .museum 
          + "(:[0-9]{1,4})?" // 端口- :80 
          + "((/?)|" // a slash isn't required if there is no file name 
          + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$"; 
          var re=new RegExp(strRegex); 
          if (re.test(Str)){
              return (true); 
          }else{ 
              return (false); 
          }

}


//是否邮编格式
function CheckPost(Str)
{
   var re=/^\d{6}$/;
   return re.test(Str);
}


//是否电话传真格式
function CheckPhone(Str)
{

   //正确格式为："XXX-XXXXXXX"、"XXXX-XXXXXXXX"、"XXX-XXXXXXX"、"XXX-XXXXXXXX"、"XXXXXXX"和"XXXXXXXX"。
    var re = /^((\d{3,4}-?)|\d{3,4}-?)?\d{7,8}$/;
    return re.test(Str);

}

//验证手机号码
function CheckMobile(Str)
{
    if(Str.search("^1(3|5|8)\\d{9}$")!=0)
    {
        return false;
    }
    return true;
}

//是否电话传真格式，项目中输入多个电话需要以逗号(英文)格开
function CheckMultiPhone(Str)
{
	var validChar = '0123456789-,';
	var i;
	
	if(Str.length < 7) return false;

	for (i = 0; i <Str.length; i++)
	{
		var c =Str.charAt(i);
		if ( validChar.indexOf(c) == -1) return false;
	} 
	return true;
}

//是否身份证格式-----\d{15}|\d{18}
function CheckPC(Str)
{
//	var validChar = '0123456789Xx';
//	var i;
//	
//	if (Str.length != 15 && Str.length != 18 && Str.length != 0 ) 	return false;
//	for (i=0;i<Str.length;i++) 
//	{ 
//		var c =Str.charAt(i);
//		if ( validChar.indexOf(Str.charAt(i) ) == -1) return false;
//	}
//	return true;
	
   var re=/^\d{17}[\d|X]|\d{15}$/;
   return re.test(Str);
}

//是否是数字、字母
function CheckBiaoshi(Str)
{
//	var validChar = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ._-/';
//	var i;

//	for (i = 0; i <Str.length; i++)
//	{
//		var c =Str.charAt(i);
//		if (validChar.indexOf(c) == -1) return false;
//	} 
//	return true;
   
   var re=/^\w+$/;
   return re.test(Str);
}


//是否是纯数值
function CheckNumData(Str)
{
 var f=Str.charAt(0);
 if(f=='-'||f=='+')
      Str=Str.substring(1);
  
 f=Str.charAt(0);
 if(f=='.')
      return false;
 f=Str.charAt(Str.length-1);
 if(f=='.')
      return false;
 if(Str.indexOf('.')>-1&&Str.indexOf('.',Str.indexOf('.')+1)>-1)
      return false;
 
 
	var validChar = '0123456789.,';
	var i;

	for (i = 0; i <Str.length; i++)
	{
		var c =Str.charAt(i);
		if (validChar.indexOf(c) == -1) return false;
	} 
	return true;
}


//是否是纯数字
function CheckNum(Str)
{
//	var validChar = '0123456789';
//	var i;

//	for (i = 0; i <Str.length; i++)
//	{
//		var c =Str.charAt(i);
//		if (validChar.indexOf(c) == -1) return false;
//	} 
//	return true;

   var re=/^\d+$/;
   return re.test(Str);
}


//是否纯中文
function CheckHZ(param)
{
	var reg = /[^u4E00-u9FA5]/g;
   
   if(reg.test(param)) return false;
   return true;
}
//密码合法性
function CheckPwd(Pwd)
{
	 var filter=/^\s*[.A-Za-z0-9_-]{5,15}\s*$/;
	 if(!filter.test(Pwd)) return false;
	 return true; 
}

//用户名合法性
function CheckUserName(name)
{
	 var filter=/^[A-Za-z][A-Za-z0-9_]{3,15}$/;
	 if(!filter.test(name)) return false;
	 return true; 
}

//去掉字符串内所有多余空格
function Alltrim(str) 
{ 
//    while (str.charAt(0)==' '||str.charAt(0)=='　') 
//	{
//	   str=str.substr(1);
//	} 
//	while (str.charAt(str.length-1)==' '||str.charAt(0)=='　') 
//	{
//	   str=str.substr(0,str.length-1);
//	} 
//    return(str);

   return str.replace(/\s+/,''); 
} 


//所有被选中的复选框计数
function CountChkBoxDeleItem()
{
    var j = 0;
    
	for(i=0;i<document.all.length;i++)
	{
		if(document.all(i).type=='checkbox')
		{
			if(document.all(i).checked)
			{j++;}
		}
	}
    return j;
}


//字符串长度检测
function CheckStringLength(InputValue,TitleName,MinStrLength,MaxStrLength)
{  
    var CheckedValue = Alltrim(InputValue);
    
    if(CheckedValue.length==0)
    {
       window.alert(TitleName+'不能为空！');
       return false;
    }
    if(CheckedValue.length > MaxStrLength)
    {
		window.alert(TitleName+'长度不能大于'+MaxStrLength+'个字符！');
		return false;
    }
    if(CheckedValue.length < MinStrLength)
    {
		window.alert(TitleName+'长度不能小于' + MinStrLength + '个字符');
		return false;
    }
    return true;
}


//打开一个窗口
function openWindow(strURL,strName)
{
  var newWindow = window.open(strURL,strName,'width=640,height=480,top=0,left=0,toolbar=0,location=0,directories=0,menubar=0,scrollbars=1,resizable=1,status=0');
  newWindow.focus();
  return newWindow;
}

      
//检测输入
function getDouble(obj) {
    var info = obj.value.trim();
    if (info.match(new RegExp(/^\d+(\.\d+)?$/)) == null) {
        obj.value = "0.00";
        return false;
    }
    return true;
}
     

 //比较时间大小
function compareDate(EndDate,BeginDate)
{
    var OneMonth = EndDate.substring(5,EndDate.lastIndexOf ("-"));
    var OneDay = EndDate.substring(EndDate.length,EndDate.lastIndexOf ("-")+1);
    var OneYear = EndDate.substring(0,EndDate.indexOf ("-"));

    var TwoMonth = BeginDate.substring(5,BeginDate.lastIndexOf ("-"));
    var TwoDay = BeginDate.substring(BeginDate.length,BeginDate.lastIndexOf ("-")+1);
    var TwoYear = BeginDate.substring(0,BeginDate.indexOf ("-"));

    if (Date.parse(OneMonth+"/"+OneDay+"/"+OneYear) <Date.parse(TwoMonth+"/"+TwoDay+"/"+TwoYear))
    {
        return true;
    }
    else
    {
        return false;
    }
}


 //过滤特殊字符 
function CheckTxt(Obj)
{
    //var keyWords='\,.<>/?]{}[^`~!@$%^&()+=|>\\\#][\]\{\}:;<';
    var keyWords='';
    var txt=Obj.value;
    for(var i=0;i<keyWords.length;i++)
    {
        txt=txt.replace(keyWords.charAt(i),"");
    }
    return txt;
    
}
function trimRN(Obj)
{
    var keyWords='\r\n';
    var txt=Obj.value;
    for(var i=0;i<keyWords.length;i++)
    {
        txt=txt.replace(keyWords.charAt(i),"");
    }
    return txt;
}

//验证QQ
function CheckQQ(Str) {
    var re = /^[1-9]\d{4,10}$/;
    return re.test(Str);

}

//表单验证 By AK
function FormCheck(RangeType,sVal)
{
  var sReg;
  var ErrorMessage="";
    switch (RangeType)
    {
        case "date":{
            sReg="^[1-2]?[0-9]{3}\\-(0?2\\-((0?[1-9]?)|([1-2][0-9]?))|((0?[1|3|5|7|8])|(1[0|2]))\\-((0?[1-9])|([1-2][0-9])|(3[0-1]))|((0?[4|6|9])|(1{2}))\\-((0?[1-9])|([1-2][0-9])|(30)))([ ]+(([0-1]?[0-9])|(2[0-3])):[0-5][0-9](:[0-5][0-9])?)?$";
            ErrorMessage="日期格式不正确,正确的格式是: yyyy-mm-dd 如：2008-8-20";
            break;
            }                    
        case "datetime":{
            sReg="^[1-2]?[0-9]{3}\\-(0?2\\-((0?[1-9]?)|([1-2][0-9]?))|((0?[1|3|5|7|8])|(1[0|2]))\\-((0?[1-9])|([1-2][0-9])|(3[0-1]))|((0?[4|6|9])|(1{2}))\\-((0?[1-9])|([1-2][0-9])|(30)))([ ]+(([0-1]?[0-9])|(2[0-3])):[0-5][0-9](:[0-5][0-9])?)$";
            ErrorMessage="日期时间格式不正确,正确的格式是: yyyy-mm-dd hh:MM:ss 如：2008-8-20 12:58:58";
            break;
            }            
        case "int":{
            sReg="^[0-9]{1,9}$";
            ErrorMessage="整数格式不正确";
            break;
            }
        case "int32":{
            sReg="^[0-9]{1,18}$";
            ErrorMessage="数字格式不正确";
            break;
            }
        case "numeric":{
            sReg="^[0-9]{0,}[.]?[0-9]{0,}$";
            ErrorMessage="数字格式不正确";
            break;
            }
        case "url":{                                
            sReg="^[a-zA-z]+://[^\\s]*$";
            ErrorMessage="Url格式不正确";
            break;                            
            }
        case "email":{
            sReg="^([\\w-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([\\w-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$";
            ErrorMessage="Email格式不正确";
            break;
            }
        case "mobile":{
            sReg="^[\\+]?[0-9]{0,5}[\\-]?[0-9]{6,8}$";
            ErrorMessage="电话格式不正确";
            break;
            }
          case "phone":{
			sReg="^[\\+]?[0-9]{0,5}[\\-]?[0-9]{6,8}$";
			ErrorMessage="电话格式不正确";
            break;
           }
         case "password":{
            sReg="^\\S{6,12}$"
            ErrorMessage="密码格式不正确(必须为6~12位字符组合)";
            break;
            }
        case "postcode":{
            sReg="^[0-9]{6}$";
            ErrorMessage="邮编格式不正确";
            break;       
            }            
        default:sReg="";
            break;    
                                          
    }                        
    if(sReg!=""){
        var reg = new RegExp(sReg,"i");
        if(!reg.test(sVal))
        {  
            //alert(ErrorMessage);                          
            return false;
        }        
    }
    return true;

}