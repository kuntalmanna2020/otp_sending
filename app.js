
  
var express = require('express')

var expresshbs = require('express-handlebars')
var bodyparser = require('body-parser')

var messagebird = require('messagebird')('q1azXm8c41ImjkkYKa4E8S8RF')

var app = express()

app.engine('handlebars', expresshbs({ defaultLayout: 'main' }))

app.set('view engine', 'handlebars')

app.use(bodyparser.urlencoded({extended:true}))

app.get('/', (req, res) => {
    res.render('step1')
})

app.post('/step2', (req, res) => {
    var number = req.body.number

    messagebird.verify.create(number, {
        template:"Your verification code is %token"
    }, function (err, response) {
            if (err) {
                console.log(err)
                res.render('step1', {
                    error:err.errors[0].description
                })
            }
            else {
                console.log(response)
                res.render('step2', {
                    id:response.id
                })
            }
    })
})

app.post('/step3', (req, res) => {
    var id = req.body.id
    var token = req.body.token

    messagebird.verify.verify(id, token, (err, response) => {
        if (err) {
            res.render('step2', {
                error: err.errors[0].description,
                id:id
            })
        }
        else {
            res.render('step3')
        }
    })
})



























// var express = require('express')
// const app=express();
// const fast2sms=require('fast-two-sms');
// require('dotenv').config();
//     app.set('view engine','ejs');
// app.use(express.urlencoded({extended:false}))

// app.get('/',(req,res)=>
// {
//     res.render('index')
// })

// app.post('/sendmessage',async (req,res)=>
// {
//     // console.log(req.body);
//     const response=await fast2sms.sendMessage({authorization: process.env.API_KEY,message: req.body.message,numbers:[req.body.number]});
//     console.log(response);
// })











app.listen(4000, () => {
    console.log("Server started at port 5000")
})
