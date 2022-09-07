const mongoose = require('mongoose')


const CONNECTION_URL = 'mongodb://localhost:27017/chatappdb'
// 'mongodb+srv://isaacMain:chimdindu1@nasacluster.zixrz.mongodb.net/chat-api?retryWrites=true&w=majority';


mongoose.connect(CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => {
    console.log('Mongo has connected succesfully')
})
mongoose.connection.on('reconnected', () => {
    console.log('Mongo has reconnected')
})
mongoose.connection.on('error', error => {
    console.log('Mongo connection error', error)
    mongoose.disconnect()
})
mongoose.connection.on('disconnected', () => {
    console.log('Mongo is disconnected')
})
