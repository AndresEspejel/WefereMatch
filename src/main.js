const express = require('express')
const google = require('googleapis').google
const OAuth2 = google.auth.OAuth2

async function start() {
    console.log('> Starting Wefere Match')
    console.log('Bienvenido a WefereMarch una API para encontrar Match de textos en Videos de Youtube !!')
    await authenticateWhithAuth()
    //await selectVideo()
    //await downloadCaptionsVideo()
    //await searchTextInCaptions()
    //console.log('> Terminate Wefere Match')
    //console.log('Bye Bye')

    async function authenticateWhithAuth() {
        const webServer = await startWebserver()
        const OAuthClient = await createOAuthClient()
        requestUserConsent(OAuthClient)
        const authorizationToken =  await waitForGoogleCallback(webServer)
        await requestGoogleForAccessTokens()
        //await setGlobalGoogleAuthentication()
        //await stopWebServer()
        
        async function startWebserver() {
            return new Promise((resolve, rejects) => {
                const port = 3000
                const app = express()

                const server = app.listen(port, () => {
                    console.log(`> Listening on http://localhost:${port}`)
                    resolve({
                        app,
                        server
                    })
                })
            })
        }

        async function createOAuthClient(){
            const credentials = require('./main/resources/keys/google_cliente.json')
            const OAuthClient = new OAuth2(
                credentials.web.client_id,
                credentials.web.client_secret,
                credentials.web.redirect_uris[0]
            )
            return OAuthClient
        }

        function requestUserConsent(OAuthClient){
            const consentUrl = OAuthClient.generateAuthUrl({
                accss_type: 'offline',
                scope:['https://www.googleapis.com/auth/youtube.force-ssl']
            })
            console.log(`> Plase give your consent: ${consentUrl} `)
        }
        async function waitForGoogleCallback(webServer){
            return new Promise((resolve,reject)=>{
                console.log('> Waiting for user consent ... 3:)')
                webServer.app.get('/OAuth2',(req,res)=>{
                    const authCode = req.query.code 
                    console.log(`> Consent given: ${authCode}`)
                    res.send('<h1> Gracias </h1> <p>ahora podemos usar la APP WefereMatch <p> <br> <p1> hacer clic Aqui</p1>')
                    resolve(authCode)
                })

            })
        }

    }
}

start()