const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

//Express middleware
app.use(express.urlencoded({ exteneded: false }));
app.use(express.json());

app.get('/', (req, res) => {
    res.json({
        message: 'Hello World'
    });
});

//default response for any other request to the server
app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});