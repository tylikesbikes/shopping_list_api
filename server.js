const app = require('./app');
let fakeDb = require('./fakeDb');

app.listen(3000, function() {
    console.log('Server is running on port 3000');
})