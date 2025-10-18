const express = require('express');
const helmet = require('helmet');
const cors = require('cors');


const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

app.get('/', (req, res) => {
    res.send({
      name: 'Headless CMS',
      version: '1.0.0',
      description: 'Headless CMS for the web',
      author: 'John Doe',
      email: 'john.doe@example.com',
      website: 'https://example.com',
      github: 'https://github.com/john-doe',
      twitter: 'https://twitter.com/john-doe',
      linkedin: 'https://linkedin.com/in/john-doe',
    });
});
