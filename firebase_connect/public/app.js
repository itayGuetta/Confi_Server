document.addEventListener('DOMContentLoaded', (event) => {
    const app = firebase.app();
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