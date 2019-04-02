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
     let FirstTrainTime = document.querySelector('#FirstTrainTime').value 
     let Frequency = document.querySelector('#Frequency').value

      let id = db.collection('AddTrains').doc().id
        db.collection('AddTrains').doc(id).set({
             TrainName: TrainName,
             Destination: Destination,
             FirstTrainTime: FirstTrainTime,
             Frequency:Frequency
         })
     document.querySelector('#TrainName').value= '',
     document.querySelector('#Destination').value= '',
     document.querySelector('#FirstTrainTime').value= '',
     document.querySelector('#Frequency').value= ''
     

     // console.log(TrainName)
     // console.log(Destination)
     // console.log(FirstTrainTime)
     // console.log(Frequency)
 })

 db.collection('AddTrains').onSnapshot(({docs}) => {
    document.querySelector('#trainTable').innerHTML=''
     docs.forEach(doc => {
         console.log(doc.data())
         let  {TrainName, Destination, Frequency, FirstTrainTime, MinutesAway} = doc.data()         
         let userElem = document.createElement('div')
         userElem.innerHTML = `
        <label>${TrainName}</label>
        <label>${Destination}</label>
        <label>${Frequency}</label>
        <label>${FirstTrainTime}</label>
        <label>${MinutesAway}</label>
        <hr>
         `
         document.querySelector('#trainTable').append(userElem)
     })
 })

 