 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";

 import { getAuth ,signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
//  import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-analytics.js";
// import { getAuth, signInWithEmailAndPassword } from  'https://cdn.jsdelivr.net/npm/firebase@^9.1.2/firebase-auth.js/+esm' ";
 
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCRypcHCwGfpC_7o1ki2jqesWG64fdSdCc",
   authDomain: "facebook-78ec7.firebaseapp.com",
   projectId: "facebook-78ec7",
   storageBucket: "facebook-78ec7.appspot.com",
   messagingSenderId: "175017246936",
   appId: "1:175017246936:web:9236a63bfa2f47dfc417ad",
   measurementId: "G-H9G8W8PP0F"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 

 var email = document.getElementById("email");
 var password = document.getElementById("password");
 
 window.login= function(e) {
 
   e.preventDefault();
   
   var obj = {
     email: email.value,
     password: password.value,
   };
 console.log(obj)
   signInWithEmailAndPassword(auth, obj.email, obj.password)
     .then(function (success) {
       console.log(success.user.uid);
       window.location.replace('admin.html')
     })
     .catch(function (err) {
       console.log(err);
       alert(err);
     });
 
   console.log(obj);
 }