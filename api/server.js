const fs = require('fs');
const express = require('express'); 
const app = express(); 
const port = 3000;

const vulnerabilities = JSON.parse(fs.readFileSync(`${__dirname}/data/data.json`));

app.use((req, res, next) => { 
	res.header("Access-Control-Allow-Origin", 
			"http://localhost:4200"); 
	res.header("Access-Control-Allow-Headers", 
			"Origin, X-Requested-With, Content-Type, Accept"); 
	next(); 
}); 


app.get('/api/vulnerabilities', (req, res) => { 
	res.status(200).json({
        status: "success",
        data: {
            vulnerabilities
        }
    }); 
}); 

app.listen(port, () => { 
	console.log(`Server listening on port ${port}`); 
});
