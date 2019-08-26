import { Router } from 'express';
import boom from '@hapi/boom';

import { asyncMiddleware } from '../asyncMiddleware';

const router = Router();

const Joi = require('@hapi/joi');

const kursTanimSchema = Joi.object().keys({
    siraNo: Joi.number().integer().required()
        .error(errors => {
            return {
                message: "Sıra No zorunludur."
            };
        }),

    kursunAdi: Joi.string().required().error(errors => {
        return {
            message: "Kursun Adı zorunludur."
        };
    }),

    kursKodu: Joi.string().required().error(errors => {
        return {
            message: "Kurs Kodu zorunludur."
        };
    }),
    merkezSureMin: Joi.number().integer().optional(),
    merkezSureMax: Joi.number().integer().optional(),
    merkezSureApp: Joi.number().integer().optional(),
    tasraSureMin: Joi.number().integer().optional(),
    tasraSureMax: Joi.number().integer().optional(),
    tasraSureApp: Joi.number().integer().optional(),

    aktif: Joi.boolean().optional().default(true),
    createdAt: Joi.date().optional(),
    lastUpdatedAt: Joi.date().optional(),
    createdBy: Joi.number().integer().optional().default(1),
    lastUpdatedBy: Joi.number().integer().optional().default(1),

    hizmet_birim_id: Joi.number().integer().required().error(errors => {
        return {
            message: "hizmet_birim_id zorunludur."
        };
    })
   

});

router.get('/', asyncMiddleware(async (req, res) => {
    const kursTanims = await req.context.models.KursTanim.findAll();
    return res.send(kursTanims);
}));

router.get('/:kursTanimId', asyncMiddleware(async (req, res) => {
    const kursTanim = await req.context.models.KursTanim.findByPk(
        req.params.kursTanimId,
        { include: 'hizmetBirim' }
    );
    return res.send(kursTanim);
}));

router.post('/', asyncMiddleware(async (req, res, next) => {

    const result = Joi.validate(req.body, kursTanimSchema);

    if (result.error) {
        throw boom.badRequest(result.error.details[0].message);
    }

    const kursTanim = await req.context.models.KursTanim.create({

        siraNo: req.body.siraNo,
        kursunAdi: req.body.kursunAdi,
        kursKodu: req.body.kursKodu,
        daire_id: req.body.daire_id,
        merkezSureMin: req.body.merkezSureMin,
        merkezSureMax: req.body.merkezSureMax,
        merkezSureApp: req.body.merkezSureApp,
        tasraSureMin: req.body.tasraSureMin,
        tasraSureMax: req.body.tasraSureMax,
        tasraSureApp: req.body.tasraSureApp,
        hizmet_birim_id:req.body.hizmet_birim_id,
        aktif: result.value.aktif,
        createdAt: new Date(),
        createdBy: result.value.createdBy
    });
    return res.send(kursTanim);
}));

router.put('/:kursTanimId', asyncMiddleware(async (req, res, next) => {

    const result = Joi.validate(req.body, kursTanimSchema);

    if (result.error) {
        throw boom.badRequest(result.error.details[0].message);
    }

    await req.context.models.KursTanim.update({

        siraNo: req.body.siraNo,
        kursunAdi: req.body.kursunAdi,
        kursKodu: req.body.kursKodu,
        daire_id: req.body.daire_id,
        merkezSureMin: req.body.merkezSureMin,
        merkezSureMax: req.body.merkezSureMax,
        merkezSureApp: req.body.merkezSureApp,
        tasraSureMin: req.body.tasraSureMin,
        tasraSureMax: req.body.tasraSureMax,
        tasraSureApp: req.body.tasraSureApp,
        hizmet_birim_id:req.body.hizmet_birim_id,
        aktif: result.value.aktif,
        createdAt: req.body.createdAt,
        lastUpdatedAt: new Date(),
        createdBy: result.value.createdBy,
        lastUpdatedBy: result.value.lastUpdatedBy
    },
        { returning: true, where: { id: req.params.kursTanimId } }
    ).then(function ([rowsUpdate, [updatedKursTanim]]) {
        res.send(updatedKursTanim)
    }).catch(next);

}));


router.delete('/:kursTanimId', asyncMiddleware(async (req, res) => {
    const result = await req.context.models.KursTanim.destroy({
        where: { id: req.params.kursTanimId },
    });

    return res.send(true);
}));

export default router;
