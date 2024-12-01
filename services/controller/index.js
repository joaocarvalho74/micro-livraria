const express = require('express');
const shipping = require('./shipping');
const inventory = require('./inventory');
const cors = require('cors');

const app = express(); // Inicializa o Express
app.use(cors());

/**
 * Consulta o frete de envio no ShippingService
 */
app.get('/shipping/:cep', (req, res, next) => {
    shipping.GetShippingRate(
        {
            cep: req.params.cep,
        },
        (err, data) => {
            if (err) {
                console.error(err);
                res.status(500).send({ error: 'something failed :(' });
            } else {
                res.json({
                    cep: req.params.cep,
                    value: data.value,
                });
            }
        }
    );
});

/**
 * Busca um produto pelo ID via InventoryService
 */
app.get('/product/:id', (req, res, next) => {
    inventory.SearchProductByID({ id: req.params.id }, (err, product) => {
        if (err) {
            console.error(err);
            res.status(500).send({ error: 'Produto não encontrado ou algo deu errado.' });
        } else {
            res.json(product);
        }
    });
});

/**
 * Inicia o router
 */
app.listen(3000, () => {
    console.log('Controller Service running on http://127.0.0.1:3000');
});
