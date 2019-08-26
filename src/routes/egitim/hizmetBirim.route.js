import { Router } from 'express';
import boom from '@hapi/boom';

import { asyncMiddleware } from '../asyncMiddleware';

const router = Router();

const Joi = require('@hapi/joi');

const hizmetBirimSchema = Joi.object().keys({
    siraNo: Joi.number().integer().required()
        .error(errors => {
            return {
                message: "Sıra No zorunludur."
            };
        }),

    birimAdi: Joi.string().required().error(errors => {
        return {
            message: "Birim Adı zorunludur."
        };
    }),

    kursKodu: Joi.string().required().error(errors => {
        return {
            message: "Kurs Kodu zorunludur."
        };
    }),
    daire_id: Joi.number().integer().required().error(errors => {
        return {
            message: "DaireId zorunludur."
        };
    }),
    aktif: Joi.boolean().optional().default(true),
    createdAt: Joi.date().optional(),
    lastUpdatedAt: Joi.date().optional(),
    createdBy: Joi.number().integer().optional().default(1),
    lastUpdatedBy: Joi.number().integer().optional().default(1),

});

router.get('/', asyncMiddleware(async (req, res) => {
    const hizmetBirims = await req.context.models.HizmetBirim.findAll();
    return res.send(hizmetBirims);
}));

router.get('/:hizmetBirimId', asyncMiddleware(async (req, res) => {
    const hizmetBirim = await req.context.models.HizmetBirim.findByPk(
        req.params.hizmetBirimId,
        { include: 'daire' }
    );
    return res.send(hizmetBirim);
}));

router.post('/', asyncMiddleware(async (req, res, next) => {

    const result = Joi.validate(req.body, hizmetBirimSchema);

    if (result.error) {
        throw boom.badRequest(result.error.details[0].message);
    }

    const hizmetBirim = await req.context.models.HizmetBirim.create({

        siraNo: req.body.siraNo,
        birimAdi: req.body.birimAdi,
        kursKodu: req.body.kursKodu,
        daire_id: req.body.daire_id,
        aktif: result.value.aktif,
        createdAt: new Date(),
        createdBy: result.value.createdBy
    });
    return res.send(hizmetBirim);
}));

router.put('/:hizmetBirimId', asyncMiddleware(async (req, res, next) => {

    const result = Joi.validate(req.body, hizmetBirimSchema);

    if (result.error) {
        throw boom.badRequest(result.error.details[0].message);
    }

    await req.context.models.HizmetBirim.update({

        siraNo: req.body.siraNo,
        birimAdi: req.body.birimAdi,
        kursKodu: req.body.kursKodu,
        daire_id: req.body.daire_id,
        aktif: result.value.aktif,
        createdAt: req.body.createdAt,
        lastUpdatedAt: new Date(),
        createdBy: result.value.createdBy,
        lastUpdatedBy: result.value.lastUpdatedBy
    },
        { returning: true, where: { id: req.params.hizmetBirimId } }
    ).then(function ([rowsUpdate, [updatedHizmetBirim]]) {
        res.send(updatedHizmetBirim)
    }).catch(next);

}));


router.delete('/:hizmetBirimId', asyncMiddleware(async (req, res) => {
    const result = await req.context.models.HizmetBirim.destroy({
        where: { id: req.params.hizmetBirimId },
    });

    return res.send(true);
}));

export default router;
