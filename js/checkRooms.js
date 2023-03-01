


document.getElementById("date-in").readOnly = true;
document.getElementById("date-out").readOnly = true;
sessionStorage.clear();






var form = document.getElementById('booking-form')
form.addEventListener('submit', function(event) {
  event.preventDefault(event)
  if(document.getElementById('date-in').value === "" ){
 
    document.getElementById('CheckInerror').style.display = 'block';
  }else if(document.getElementById('date-out').value === "") {
    document.getElementById('CheckOuterror').style.display = 'block';
  }
  else{
    document.getElementById('CheckInerror').style.display = 'none';
    document.getElementById('CheckOuterror').style.display = 'none';
    var CheckIn = document.getElementById('date-in').value
    var CheckOut  = document.getElementById('date-out').value
    var Room = document.getElementById('room').value
    const endpoint = "http://localhost:8080/api/v1/checkAvailability";
    const formData = new FormData();
    formData.append("CheckIn", CheckIn);
    formData.append("CheckOut", CheckOut);
    formData.append("room", Room);
    document.getElementById('CheckInerror').style.display = 'none';
    document.getElementById('loading').style.display = 'block';
    fetch(endpoint, {
      method: "post",
      body: formData,
    }).then((response) => response.json()).then((data) => {
     
   
      if(data.status==201){
        // document.getElementById('loading').style.display = 'none';

        document.getElementById('loading')
    
       const userData = {
         CheckIn:CheckIn,
         CheckOut:CheckOut
       }
 
        setTimeout(()=>{
         sessionStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem('rooms', JSON.stringify(data.Rooms));
          window.location=`/checkAvailabilityRooms.html?CheckIn=${CheckIn}&CheckOut=${CheckOut}`
         

        }, 2000)
        
        
       


        }else if(data.status === 400){
             // Create the alert element
             document.getElementById('loading').style.display = 'none';

             document.getElementById('myModal').style.display = 'block';
        $("#booking-form").trigger("reset");
        $("#myModal").modal("show");
 ;
        

        }
    });

  }

  
  
  

   
      

})