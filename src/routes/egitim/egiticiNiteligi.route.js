import { Router } from 'express';
import boom from '@hapi/boom';

import { asyncMiddleware } from '../asyncMiddleware';

const router = Router();

const Joi = require('@hapi/joi');

const egiticiNiteligiSchema = Joi.object().keys({
    nitelikKodu: Joi.string().min(1).max(1).required()
    .error(errors => {
        return {
          message: "Eğitici Nitelik Kodu 1 karakter olmalıdır."
        };
      }),
    nitelikAdi: Joi.string().required()
    .error(errors => {
        return {
          message: "Eğitici Nitelik Adı zorunludur."
        };
      }),
    aktif: Joi.boolean().optional().default(true),
    createdAt: Joi.date().optional(),
    lastUpdatedAt: Joi.date().optional(),
    createdBy: Joi.number().integer().optional().default(1),
    lastUpdatedBy: Joi.number().integer().optional().default(1),
});

router.get('/', asyncMiddleware(async (req, res) => {
    const egiticiNiteligis = await req.context.models.EgiticiNiteligi.findAll();
    return res.send(egiticiNiteligis);
}));

router.get('/:egiticiNiteligiId', asyncMiddleware(async (req, res) => {
    const egiticiNiteligi = await req.context.models.EgiticiNiteligi.findByPk(
        req.params.egiticiNiteligiId,
    );
    return res.send(egiticiNiteligi);
}));

router.post('/', asyncMiddleware(async (req, res) => {

    const result = Joi.validate(req.body, egiticiNiteligiSchema);
    
    if (result.error) {
     throw boom.badRequest(result.error.details[0].message);
    }

    const egiticiNiteligi = await req.context.models.EgiticiNiteligi.create({
        nitelikKodu: req.body.nitelikKodu,
        nitelikAdi: req.body.nitelikAdi,
        aktif: result.value.aktif,
        createdAt: new Date(),
        createdBy: result.value.createdBy
    });
    return res.send(egiticiNiteligi);
}));

router.put('/:egiticiNiteligiId', asyncMiddleware(async (req, res, next) => {

    const result = Joi.validate(req.body, egiticiNiteligiSchema);

    if (result.error) {
     throw boom.badRequest(result.error.details[0].message);
    } 

    await req.context.models.EgiticiNiteligi.update({
        nitelikKodu: req.body.nitelikKodu,
        nitelikAdi: req.body.nitelikAdi,
        aktif: result.value.aktif,
        createdAt: req.body.createdAt,
        lastUpdatedAt: new Date(),
        createdBy: result.value.createdBy,
        lastUpdatedBy: result.value.lastUpdatedBy
    },
        { returning: true, where: { id: req.params.egiticiNiteligiId } }
    ).then(function ([rowsUpdate, [updatedEgiticiNiteligi]]) {
        res.send(updatedEgiticiNiteligi)
    }).catch(next);    

}));


router.delete('/:egiticiNiteligiId', asyncMiddleware(async (req, res) => {
    const result = await req.context.models.EgiticiNiteligi.destroy({
        where: { id: req.params.egiticiNiteligiId },
    });

    return res.send(true);
}));

export default router;
