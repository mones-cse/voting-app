ifMultipleOption =function(){
   var title =$('#title').val();
   var options =$('#options').val();
   console.log('title is ',title);
   title=title.length>1?true:false;
   var match = /\r|\n/.exec(options);
   match=match?true:false;
   console.log('?????',title,match);
   if(!title){
        alert('You need title');
   }
   if(!match){
        alert('You need 2 or more options to make a poll');
   }
   return match&&title 

}