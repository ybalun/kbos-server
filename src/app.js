import 'dotenv/config';
import cors from 'cors';
import bodyParser from 'body-parser';
import express from 'express';

import models, { sequelize } from './models/database';
import routes from './routes/router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  req.context = {
    models
  };
  next();
});

// Routes

app.use('/api/egitim/egiticiNiteligi', routes.egiticiNiteligi);
app.use('/api/egitim/kursTuru', routes.kursTuru);
app.use('/api/egitim/hizmetBirim', routes.hizmetBirim);
app.use('/api/egitim/kursTanim', routes.kursTanim);

app.use('/api/genel/kurumOrganizasyon', routes.kurumOrganizasyon);


// Start

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => { 
  app.listen(process.env.KBOS_SERVER_PORT, () =>
    console.log(`KBOS Server app listening on port ${process.env.KBOS_SERVER_PORT}!`),
  );
});
