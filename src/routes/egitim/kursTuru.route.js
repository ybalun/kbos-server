import { Router } from 'express';
import boom from '@hapi/boom';

import { asyncMiddleware } from '../asyncMiddleware';

const router = Router();

const Joi = require('@hapi/joi');

const kursTuruSchema = Joi.object().keys({
    kursTuru: Joi.string().required()
        .error(errors => {
            return {
                message: "Kurs Türü zorunludur."
            };
        }),

    aktif: Joi.boolean().optional().default(true),
    createdAt: Joi.date().optional(),
    lastUpdatedAt: Joi.date().optional(),
    createdBy: Joi.number().integer().optional().default(1),
    lastUpdatedBy: Joi.number().integer().optional().default(1),
    
});

router.get('/', asyncMiddleware(async (req, res) => {
    const kursTurus = await req.context.models.KursTuru.findAll();
    return res.send(kursTurus);
}));

router.get('/:kursTuruId', asyncMiddleware(async (req, res) => {
    const kursTuru = await req.context.models.KursTuru.findByPk(
        req.params.kursTuruId,
    );
    return res.send(kursTuru);
}));

router.post('/', asyncMiddleware(async (req, res) => {

    const result = Joi.validate(req.body, kursTuruSchema);

    if (result.error) {
     throw boom.badRequest(result.error.details[0].message);
    }

    const kursTuru = await req.context.models.KursTuru.create({
        kursTuru: req.body.kursTuru,
        aktif: result.value.aktif,
        createdAt: new Date(),
        createdBy: result.value.createdBy
    });
    return res.send(kursTuru);
}));

router.put('/:kursTuruId', asyncMiddleware(async (req, res, next) => {

    const result = Joi.validate(req.body, kursTuruSchema);

    if (result.error) {
     throw boom.badRequest(result.error.details[0].message);
    } 

    await req.context.models.KursTuru.update({
        kursTuru: req.body.kursTuru,
        aktif: result.value.aktif,
        createdAt: req.body.createdAt,
        lastUpdatedAt: new Date(),
        createdBy: result.value.createdBy,
        lastUpdatedBy: result.value.lastUpdatedBy
    },
        { returning: true, where: { id: req.params.kursTuruId } }
    ).then(function ([rowsUpdate, [updatedKursTuru]]) {
        res.send(updatedKursTuru)
    }).catch(next);    

}));


router.delete('/:kursTuruId', asyncMiddleware(async (req, res) => {
    const result = await req.context.models.KursTuru.destroy({
        where: { id: req.params.kursTuruId },
    });

    return res.send(true);
}));

export default router;
