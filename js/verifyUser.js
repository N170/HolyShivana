   // Check for local token
   const token = localStorage.getItem('token');
   if (!token) {
     window.location.href = '/login.html'; // Redirect to login if token is not found
   }

   // Make POST request with token
   const data = {
     token: token
   };

   fetch('http://localhost:8080/api/v1/verifyUser', {
     method: 'POST',
     headers: {
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(data)
   })
   .then(response => {
     console.log(response.status)
     if (response.ok) {
 // Display dashboard data
} else if (response.status === 401) {
 // Redirect to login page if token is invalid
 window.location.href = '/login.html';
} else {
 // Handle other errors here
}
   })
   .catch(error => {
     console.log(error);
   });