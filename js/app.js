// Initialize Firebase
var config = {
    apiKey: "AIzaSyAaxia4O2C42RKcN5GfZdAZ7U6spEAphWo",
    authDomain: "fir-hw-f51e1.firebaseapp.com",
    databaseURL: "https://fir-hw-f51e1.firebaseio.com",
    projectId: "fir-hw-f51e1",
    storageBucket: "",
    messagingSenderId: "1097118154272"
  };
firebase.initializeApp(config);

let db = firebase.firestore()
document.querySelector('#addBtn').addEventListener('click',
 e => {
     e.preventDefault()
     let TrainName = document.querySelector('#TrainName').value 
     let Destination = document.querySelector('#Destination').value 
     let FirstTime = document.querySelector('#FirstTime').value 
     let Freq = document.querySelector('#Freq').value
    console.log(Destination)
      let id = db.collection('AddTrains').doc().id
        db.collection('AddTrains').doc(id).set({
             TrainName: TrainName,
             Destination: Destination,
             FirstTime: FirstTime,
             Freq:Freq
         })
     document.querySelector('#TrainName').value= '',
     document.querySelector('#Destination').value= '',
     document.querySelector('#FirstTime').value= '',
     document.querySelector('#Freq').value= ''
     

     // console.log(TrainName)
     // console.log(Destination)
     // console.log(FirstTrainTime)
     // console.log(Frequency)
 })

 db.collection('AddTrains').onSnapshot(({docs}) => {
    document.querySelector('#trainTable').innerHTML=''
     docs.forEach(doc => {
         console.log(doc)
         console.log(doc.data())
         //let {TrainName, Destination} = doc.data()

         let  {TrainName, Destination, Freq, FirstTime, MinutesAway} = doc.data()         
         let userElem = document.createElement('div')
         userElem.innerHTML = `
        <tr>${TrainName}</tr>
        <tr>${Destination}</tr>
        <tr>${moment().diff(moment(Freq), "minutes")}</tr>
        <tr>${moment(FirstTime, "HH:mm: A")}</tr>
        <tr>${MinutesAway}</tr>
        <hr>
         `
        
         document.querySelector('#trainTable').append(userElem)
     })
 })

 