document.addEventListener('DOMContentLoaded', (event) => {

    const app = firebase.app();




});

function uploadFile(files){
    
    const sotrageRef = firebase.storage().ref();
    const file_name = files.item(0).name;
    const horseRef = sotrageRef.child(file_name);

    const file = files.item(0);
    const task = horseRef.put(file);

    task.then(snapshot => {
        console.log(snapshot)
        const url = snapshot.ref.getDownloadURL().then(function(downloadURL) {
            document.querySelector('#imgUpload').setAttribute('src',downloadURL)
          });
      
    });


}