require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.get('/api/products', (req, res, next) => {
  db.query('select "productId", "name", "price", "image", "shortDescription" from "products";')
    .then(result => res.json(result.rows))
    .catch(err => next(err));
});

app.get('/api/products/:productId', (req, res, next) => {
  const id = Number(req.params.productId);
  if (!id || id < 1) return res.status(400).json({ error: 'productId must be a postive integer' });
  const sql = `
    select *
      from "products"
     where "productId" = $1;
  `;
  const values = [id];
  db.query(sql, values)
    .then(result => {
      if (result.rows.length <= 0) return next(new ClientError('Product not found', 404));

      return res.json(result.rows[0]);
    })
    .catch(err => next(err));
});

app.get('/api/cart', (req, res, next) => {
  const sql = `
    select "c"."cartItemId",
           "c"."price",
           "p"."productId",
           "p"."image",
           "p"."name",
           "p"."shortDescription"
      from "cartItems" as "c"
      join "products" as "p" using ("productId")
     where "c"."cartId" = $1;
  `;

  return (
    req.session.cartId
      ? db.query(sql, [req.session.cartId])
        .then(response => res.json(response.rows))
      : res.json([])
  );
});

app.post('/api/cart', (req, res, next) => {
  const productId = Number(req.body.productId);

  if (!productId || productId < 1) return res.status(400).json({ error: 'productId must be a positive integer' });

  const sql = `
    select "price"
      from "products"
     where "productId" = $1;
  `;
  const values = [productId];

  db.query(sql, values)
    .then(result => {
      if (result.rows.length <= 0) throw new ClientError('Product not found', 404);

      const price = result.rows[0].price;

      if (req.session.cartId) {
        return (
          db.query('insert into "carts" ("cartId", "createdAt") values (default, default) returning "cartId"')
            .then(result => ({ price, cartId: req.session.cartId }))
            .catch(err => next(err))
        );
      }

      return (
        db.query('insert into "carts" ("cartId", "createdAt") values (default, default) returning "cartId"')
          .then(result => ({ price, cartId: result.rows[0].cartId }))
          .catch(err => next(err))
      );
    })
    .then(result => {
      req.session.cartId = result.cartId;

      const sql = `
        insert into "cartItems" ("cartId", "productId", "price")
        values ($1, $2, $3)
        returning "cartItemId";
      `;

      const values = [result.cartId, productId, result.price];

      return (
        db.query(sql, values)
          .then(result => result.rows[0])
      );
    })
    .then(result => {
      const sql = `
        select "c"."cartItemId",
               "c"."price",
               "p"."productId",
               "p"."image",
               "p"."name",
               "p"."shortDescription"
          from "cartItems" as "c"
          join "products" as "p" using ("productId")
         where "c"."cartItemId" = $1
      `;
      const values = [result.cartItemId];

      return (
        db.query(sql, values)
          .then(result => res.status(201).json(result.rows[0]))
      );
    })
    .catch(err => next(err));

});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
