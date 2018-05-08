const express = require('express');
const app = express();
//root , callback function with 2 arguments
app.get('/', (req, res) => {
	res.send('helloworld');
});
// app.post();
// app.put();
// app.delete();

app.get('/api/courses', (req, res) => {
	res.send([1,2,3]);
});

app.listen(3000, () => console.log('listening on 3000'));
