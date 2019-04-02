const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const http = require('http').Server(app)
const fetch = require("node-fetch")
const cors = require('cors')

const GIT_URL = "https://api.github.com/legacy/repos/search/"

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())


app.post('/api/search', function(req, res){
	try{
		const getData = async url => {
  			try{
  				if(req.body.search != null)
  				{
  					composed_url = url + req.body.search
    				const response = await fetch(composed_url)
    				const json = await response.json()
    				res.send(json)
  				}
  				if(req.body.search == null){
  					res.send("Please insert a search query in a JSON body")
  				}
  			} 
  			catch(error){
    			res.send(error)
  			}
		}
		getData(GIT_URL)
	}
	catch(err){
		res.status(500).send({error: err})
	}
})

http.listen(3001,function(){
    console.log("Server : LISTENING")
});