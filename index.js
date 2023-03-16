const http = require('http');
const dotenv = require('dotenv').config();
const Application = require('./middleware/Application');
const parseJson = require('./middleware/parseJson');
const parseUrl = require('./middleware/parseUrl');
const filmRouter = require('./routes/filmRoutes');
const genreRouter = require('./routes/gengeRoutes');

const PORT = process.env.PORT || 5000;

const app = new Application();

app.use(parseJson);
app.use(parseUrl(`http://localhost:${PORT}`));
app.addRouter(filmRouter);
app.addRouter(genreRouter);

app.listen(PORT,()=>{
    console.log(`Сервер был запущен на порту:${PORT}`);
})
