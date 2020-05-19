document.addEventListener('DOMContentLoaded', (event) => {
    const app = firebase.app();

    const db = firebase.firestore();

    const myPost = db.collection('Posts').doc('FirstPost')
    myPost.get().then(doc => {
        if (doc.exists) {
            console.log("Document data:", doc.data());
            const data = doc.data();
            console.log(data)
            document.write( data.title + '<br>');
            document.write( data.createdAt );
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    });
});

function googleLogin(){
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        const user = result.user;
        document.write(`Hello !  ${user.displayName}`);
        console.log(user)
        // This gives you a Google Access Token.
        var token = result.credential.accessToken;
        // The signed-in user info.
       }).catch(console.log);
};