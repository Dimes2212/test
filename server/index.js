import dotenv from 'dotenv';
import express from 'express';

dotenv.config({ path: '.env.local' });

const app = express();
const PORT = process.env.PORT || 3001;

const DADATA_API_KEY = process.env.DADATA_API_KEY;
const DADATA_SECRET_KEY = process.env.DADATA_SECRET_KEY;

app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.sendStatus(204);
    return;
  }

  next();
});

app.post('/api/dadata/find-party', (req, res) => {
  fetch('https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${DADATA_API_KEY}`,
    },
    body: JSON.stringify({
      query: req.body.inn,
    }),
  })
    .then((dadataResponse) =>
      dadataResponse.json().then((data) => ({
        status: dadataResponse.status,
        data,
      })),
    )
    .then(({ status, data }) => {
      res.status(status).json(data);
    })
    .catch((error) => {
      console.error('[find-party error]', error);

      res.status(500).json({
        error: 'Ошибка проверки ИНН',
      });
    });
});

app.post('/api/dadata/clean-address', (req, res) => {
  fetch('https://cleaner.dadata.ru/api/v1/clean/address', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${DADATA_API_KEY}`,
      'X-Secret': DADATA_SECRET_KEY,
    },
    body: JSON.stringify([req.body.address]),
  })
    .then((dadataResponse) =>
      dadataResponse.text().then((text) => ({
        status: dadataResponse.status,
        data: text ? JSON.parse(text) : {},
      })),
    )
    .then(({ status, data }) => {
      res.status(status).json(data);
    })
    .catch((error) => {
      console.error('[clean-address error]', error);

      res.status(500).json({
        error: 'Ошибка проверки адреса',
      });
    });
});

app.listen(PORT, () => {
  console.log(`Backend started on http://localhost:${PORT}`);
});
