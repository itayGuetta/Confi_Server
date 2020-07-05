document.addEventListener('DOMContentLoaded', (event) => {
    const app = firebase.app();

    // const db = firebase.firestore();

    // const myPost = db.collection('Posts').doc('FirstPost')
    // myPost.get().then(doc => {
    //     if (doc.exists) {
    //         console.log("Document data:", doc.data());
    //         const data = doc.data();
    //         console.log(data)
    //         document.write( data.title + '<br>');
    //         document.write( data.createdAt );
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch(function(error) {
    //     console.log("Error getting document:", error);
    // });
});

function googleLogin(){
    
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        const user = result.user;
        document.write(`Hello !  ${user.displayName} <br> Your Email is :  ${user.email} <br>  `);
        document.write(` <br> <img style="width: 300px" src="${user.photoURL}"></img> <br>`)
        console.log(user)
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
       }).catch(console.log);
};

function FacebookLogin(){
    var provider = new firebase.auth.FacebookAuthProvider();
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        console.log(user)
        // ...
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
      });
};
