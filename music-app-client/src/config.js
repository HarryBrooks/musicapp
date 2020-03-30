export default {
    Auth: {
        identityPoolId: "eu-west-1:e659b87a-7814-4ef3-aea9-912815cb8668",
        region: "eu-west-1",
        userPoolId: "eu-west-1_DWhlOuzTz",
        userPoolWebClientId: "3bdor0t8sfcsc0eps2h0b4ud9i",
        oauth: {
            domain: "music-app.auth.eu-west-1.amazoncognito.com",
            scope: [
                "email",
                "profile",
                "openid"
            ],
            redirectSignIn: "http://localhost:3000/",
            redirectSignOut: "http://localhost:3000/",
            responseType: "code"
        }
    }
} 