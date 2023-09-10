 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-app.js";
 import {
    getDatabase,
    ref,
    set,
    push,
    remove,
    onChildAdded,
    onValue,
    update,
  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-database.js";
  import {
    getAuth,
    onAuthStateChanged,
    signOut,
  } from "https://www.gstatic.com/firebasejs/9.17.2/firebase-auth.js";
  
 
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
 const database = getDatabase(app);
const auth = getAuth(app);

 const clsdiv = document.getElementById('addcls')
 const adstd = document.getElementById('adstd')
var uid;


 window.addCourse = function(){
    clsdiv.className = 'myModal';
 }

 
window.closecls = function(){
    clsdiv.className = 'coursead myModal'
}
window.closemystd = function(){
    adstd.className = 'coursead myModal'
}
window.addstd = function () {
    adstd.className = 'myModal';

}

const sname = document.getElementById('sname')
const sfname = document.getElementById('sfname')
const rnum = document.getElementById('rnum')
const cnum = document.getElementById('cnum')
const cnnum = document.getElementById('cnnum')
const pu = document.getElementById('pu')
const cname = document.getElementById('cname')

window.addstudent = function (e) {
    e.preventDefault();
    const obj = {
        sname : sname.value,
        sfname : sfname.value,
        rnum : rnum.value,
        cnum : cnum.value,
        cnnum : cnnum.value,
        pu : pu.value,
        cname : cname.value
        
    }
    
    const refKey = ref(database, `students/`);
      obj.id = push(refKey).key;
      const reference = ref(database, `students/${obj.rnum}/`);
      set(reference, obj);

     sname.value = "",
       sfname.value = "",
       rnum.value = "",
       cnum.value = "",
       cnnum.value = "",
       pu.value = "",
       cname.value = ""
}

const crname = document.getElementById('crname')
const tname = document.getElementById('tname')
const scname = document.getElementById('scname')
const bnum = document.getElementById('bnum')
const sc = document.getElementById('sc')
const t1 = document.getElementById('t1')
const t2 = document.getElementById('t2')


window.createCourse = function (e) {
    e.preventDefault();
    const obj = {
        crname : crname.value,
         tname :tname.value,
         scname : scname.value,
         bnum : bnum.value,
         sc : sc.value,
        t1 :t1.value,
        t2 :t2.value
     }
     const refKey = ref(database, `courses/`);
     obj.id = push(refKey).key;
     const reference = ref(database, `courses/${obj.id}/`);
     set(reference, obj).then(()=>{alert("Course Added Successfully! ")});

    crname.value = "",
      tname.value = "",
      scname.value = "",
      bnum.value = "",
      sc.value = "",
      t1.value = "",
      t2.value = ""    
}

const ctable = document.getElementById('ctable')
if (ctable.innerHTML === null){
    ctable.innerHTML = "No courses yet!"
}

window.deletecourse = function(id){
    var text = "Are you sure you want to delete this course?"
    if (confirm(text) == true) {
      const cardref = ref(database, `courses/${id}/`);
      remove(cardref);
        window.location.reload()
    } 
}

const  sid = document.getElementById('sid')

window.displayIdModal = function () {
    sid.className = "myModal"


}

const stdd = document.getElementById('stdd')
const rollnum = document.getElementById('rollnum')


window.findstd = function ( ){
    const val = rollnum.value
  
    const reference = ref (database,`students/`)
    onChildAdded( reference, function(data){
      console.log(data.val())
      if (data.val().rnum === val) {

          stdd.innerHTML += `   <div class="d-flex justify-content-between px-3 align-items-center">
          <h3 class="text-success mx-3">
            Name : 
        </h3>
        <p class="fs-3 mx-3 text-center">${data.val().sname}</p>
    </div>
    <div class="d-flex justify-content-between px-3 align-items-center">
        <h3 class="mx-3 text-success">
            Father Name : 
        </h3>
        <p class="fs-3 mx-3 text-center">${data.val().sfname}</p>
    </div>
    <div class="d-flex justify-content-between px-3 align-items-center">
        <h3 class="mx-3 text-success">
            Roll Num : 
        </h3>
        <p class="fs-3 mx-3 text-center">${data.val().rnum}</p>
    </div>
    <div class="d-flex justify-content-between px-3 align-items-center">
    <h3 class="mx-3 text-success">
           Contact Num : 
        </h3>
        <p class="fs-3 mx-3 text-center">${data.val().cnum}</p>
    </div>
    <div class="d-flex justify-content-between px-3 align-items-center">
        <h3 class="mx-3 text-success">
            CNIC Num : 
        </h3>
        <p class="fs-3 mx-3 text-center">${data.val().ccnum}</p>
    </div>
    <div class="d-flex justify-content-between px-3 align-items-center">
        <h3 class="mx-3 text-success">
            Status : 
        </h3>
        <div class="form-floating">
            <select onclick="markAttendance('${rnum}')" class="form-select" id="floatingSelect" aria-label="Floating label select example">
            <option value="abs" >Absent </option>
            <option value="pr">Present</option>
            <option value="le">Leave</option>
            <option value="la">Late</option>
            </select>
            <label for="floatingSelect">Select</label>
          </div>
        </div>
        
    </div>`
       
}
    
    
    }).catch(()=> {
        alert("No Student Found! ")
    })
}

window.closemyidm = function () {
    sid.classList = 'myModal coursead'
}

function render () {
    const reference = ref(database, `courses/`);
    let i = 1;
    onChildAdded( reference, function(data){
      
         ctable.innerHTML += ` <tr onclick="displayIdModal()" class="m-3 p-c">
         <td class="m-3 p-3">${i}</td>
         <td class="m-3 p-3">${data.val().crname}</th>
             <td class="m-3 p-3">${data.val().tname}</th>
         <td class="m-3 p-3">${data.val().scname}</th>
         <td class="m-3 p-3">${data.val().bnum}</th>
         <td class="m-3 p-3 " onclick="deletecourse('${data.val().id}')"><button class="btn btn-danger">Delete</button></th>
            
         </tr>`
         i++;
     
     
     })
}

render()