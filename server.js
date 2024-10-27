import express from 'express';
import ViteExpress from 'vite-express';
import pkg from 'disconnect';

const { Client: Discogs } = pkg;

const app = express();

// app.get('/', (_, res) => res.sendStatus(500));

app.get('/authorize', (_, res) => {
    const oAuth = new Discogs().oauth();

    oAuth.getRequestToken(
        'YsGManjNceCoHTFCbfNu',
        'oWfLuIQjcLzGFtNcTnbKNGVmKvgFRmsQ',
        '/',
        function (err, requestData) {
            // Persist "requestData" here so that the callback handler can
            // access it later after returning from the authorize url
            res.redirect(requestData.authorizeUrl);
        }
    );
});

ViteExpress.listen(app, 3000);
