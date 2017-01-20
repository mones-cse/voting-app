ifMultipleOption =function(){
   var title =$('#title').val();
   var options =$('#options').val();
   title=title.length>1?true:false;
   var match = /\r|\n/.exec(options);
   match=match?true:false;
   if(!title){alert('You need title');}
   if(!match){alert('You need 2 or more options to make a poll');}
   return match&&title;
}

sendPollInfo =function(){
     $.post("/voteAdd",{user: 'user',password: 'pass'}, function(data){
            if(data==='done')
              {
                alert("login success");
              }
          });
}

displayDonut = function (myLabel, myData) {
    var myChart = new Chart(document.getElementById("myChart").getContext('2d'), {
        type: 'doughnut',
        data: {
            labels: myLabel,
            datasets: [{
                backgroundColor: [
                    "#2ecc70",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e",
                    "#2ecc71",
                    "#3498db",
                    "#95a5a6",
                    "#9b59b6",
                    "#f1c40f",
                    "#e74c3c",
                    "#34495e"
                ],
                data: myData
            }]
        }
    });
}



$(function() {
    //removePoll 
    var pollId = $("#pollId").val()  
    $('#removePoll').on("click",function(){
        $.post( "/removePoll",{pollId:pollId},function(err,status){
            console.log('???',status);
            if(status== "success"){
                console.log('gooooo');
                 window.location.href = "/";
            }
        });
    });
    
});