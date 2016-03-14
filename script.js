jQuery(document).ready(function(){
  jQuery(document.body).dblclick(function(event) {
    if(!jQuery(event.target).hasClass('replaced_word')){
      sel = document.getSelection();
      range = sel.getRangeAt(0);
      content = range.cloneContents();
      span = document.createElement("span");
      span.appendChild(document.createTextNode(sel));
      span.className = 'custom-tip-top replaced_word';
      jQuery.ajax({
        type: 'GET',
        url: "http://thesaurus.altervista.org/service.php?word="+sel+"&language=en_US&output=json&key=jwfvONJM6Il9gGDEBo6a",
        
        success: function(data){
          console.log("inside success:"+JSON.stringify(data));
          result = data['response'][0]['list']
          title = result['category']
          title += " "
          title += result['synonyms']
          span.title = title;
          range.deleteContents();
          range.insertNode(span);
          console.log("ahsdbfk");
          jQuery(span).trigger('mouseover');
        }
      }).fail(function(jqXHR, textStatus){
        console.log("fail:"+textStatus+" "+jqXHR);
        if(textStatus == 'timeout')
        {     
          span.title = 'Invalid word or Word not selected properly'
          range.deleteContents();
          range.insertNode(span);
          jQuery(span).trigger('mouseover');
          setTimeout(function(){
            jQuery(span).trigger('mouseout');
          },3000);
        }
      });
    }
  });
});