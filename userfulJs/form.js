/*form表单相关的方法*/

//取得用户在文本框中选择的文本
function getSelectedText (textBox) {
	return textBox.value.substring(textBox.selectionStart,textBox.selectionEnd);
}

//跨浏览器实现取得用户在文本框中选择的文本
function selectText (textbox, startIndex, endIndex) {
	if (textbox.setSlectionRange) {
		textbox.setSelectionRange(startIndex,endIndex);
	} else if (textbox.createTextRange) {
		var range = textbox.createTextRange();
		range.collapse(true);
		range.moveStart("character",startIndex);
		range.moveEnd("character",endIndex - startIndex);
		range.select();
	}
	textbox.focus();
}

//取得select中所有被选择的项
function getSelectedOptions (selectbox) {
	var result = new Array ();
	var option = null;

	for (var i = 0; i < selectbox.options.length; i++) {
		option = selectbox.options[i];
		if (option.selected) {
			result.push(option);
		}
	}

	return result;
}

//序列化表单数据
function serialize(form){        
    var parts = [],field = null,i,len,j,optLen,option,optValue;    
    for (i=0, len=form.elements.length; i < len; i++){
        field = form.elements[i];    
        switch(field.type){
            case "select-one":
            case "select-multiple":            
                if (field.name.length){
                    for (j=0, optLen = field.options.length; j < optLen; j++){
                        option = field.options[j];
                        if (option.selected){
                            optValue = "";
                            if (option.hasAttribute){
                                optValue = (option.hasAttribute("value") ? option.value : option.text);
                            } else {
                                optValue = (option.attributes["value"].specified ? option.value : option.text);
                            }
                            parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(optValue));
                        }
                    }
                }
                break;                
            case undefined:     //fieldset
            case "file":        //file input
            case "submit":      //submit button
            case "reset":       //reset button
            case "button":      //custom button
                break;                
            case "radio":       //radio button
            case "checkbox":    //checkbox
                if (!field.checked){
                    break;
                }
                /* falls through */                            
            default:
                //don't include form fields without names
                if (field.name.length){
                    parts.push(encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value));
                }
        }
    }        
    return parts.join("&");
}

