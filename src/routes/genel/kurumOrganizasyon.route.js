import { Router } from 'express';
import boom from '@hapi/boom';

import { asyncMiddleware } from '../asyncMiddleware';

const router = Router();

const Joi = require('@hapi/joi');

const kurumOrganizasyonSchema = Joi.object().keys({

    tanim: Joi.string().required().error(errors => {
        return {
            message: "Tanım zorunludur."
        };
    }),

    aktif: Joi.number().integer().optional().default(1),
    createdAt: Joi.date().optional(),
    lastUpdatedAt: Joi.date().optional(),
    createdBy: Joi.number().integer().optional().default(1),
    lastUpdatedBy: Joi.number().integer().optional().default(1),

    organizasyonTipId: Joi.number().integer().required().error(errors => {
        return {
            message: "organizasyonTipId zorunludur."
        };
    }),
    isyeriId: Joi.number().integer().optional(),
    uniteKodu: Joi.string().optional(),
    birimKod: Joi.string().optional(),
    tamKod: Joi.string().optional(),
    tasraMerkez: Joi.string().optional(),    
    maliyetKurumOrganizasyonId: Joi.number().integer().optional(),
    segment2: Joi.string().optional(),
    segment3: Joi.string().optional(),
    segment6: Joi.string().optional(),
    ozellestirme: Joi.number().integer().optional(),
    organizasyonKodu: Joi.string().required().error(errors => {
        return {
            message: "organizasyonKodu zorunludur."
        };
    }),
    isyeriKodu: Joi.number().integer().optional(),
    bolgeKodu: Joi.number().integer().optional(),
    teskilatKodu: Joi.number().integer().optional(),
    alan1: Joi.string().optional(),
    alan1: Joi.string().optional(),
    alan2: Joi.string().optional(),
    alan3: Joi.string().optional(),
    alan4: Joi.string().optional(),
    alan5: Joi.string().optional(),
    tanimUb: Joi.string().optional(),
    haberlesmeKodu: Joi.string().optional(),
    dtvtKodu: Joi.string().optional(),
    merkezKurumId: Joi.number().integer().optional(),
    kurumIlId: Joi.number().integer().optional(),
    siraNo: Joi.number().integer().optional(),

    ust_kurum_organizasyon_id: Joi.number().integer().optional()
});

router.get('/', asyncMiddleware(async (req, res) => {
    const kurumOrganizasyons = await req.context.models.KurumOrganizasyon.findAll();
    return res.send(kurumOrganizasyons);
}));

router.get('/:kurumOrganizasyonId', asyncMiddleware(async (req, res) => {
    const kurumOrganizasyon = await req.context.models.KurumOrganizasyon.findByPk(
        req.params.kurumOrganizasyonId,
        { include: 'ustKurumOrganizasyon' }
    );
    return res.send(kurumOrganizasyon);
}));

router.post('/', asyncMiddleware(async (req, res, next) => {

    const result = Joi.validate(req.body, kurumOrganizasyonSchema);

    if (result.error) {
        throw boom.badRequest(result.error.details[0].message);
    }
  
    const kurumOrganizasyon = await req.context.models.KurumOrganizasyon.create({
        tanim: req.body.tanim,
        organizasyonTipId: req.body.organizasyonTipId,
        isyeriId: req.body.isyeriId,
        uniteKodu: req.body.uniteKodu,
        birimKod: req.body.birimKod,
        tamKod: req.body.tamKod,
        tasraMerkez: req.body.tasraMerkez,
        maliyetKurumOrganizasyonId: req.body.maliyetKurumOrganizasyonId,
        segment2: req.body.segment2,
        segment3: req.body.segment3,
        segment6: req.body.segment6,
        ozellestirme: req.body.ozellestirme,
        organizasyonKodu: req.body.organizasyonKodu,
        isyeriKodu: req.body.isyeriKodu,
        bolgeKodu: req.body.bolgeKodu,
        teskilatKodu: req.body.teskilatKodu,
        alan1: req.body.alan1,
        alan2: req.body.alan2,
        alan3: req.body.alan3,
        alan4: req.body.alan4,
        alan5: req.body.alan5,
        tanimUb: req.body.tanimUb,
        haberlesmeKodu: req.body.haberlesmeKodu,
        dtvtKodu: req.body.dtvtKodu,
        merkezKurumId: req.body.merkezKurumId,
        kurumIlId: req.body.kurumIlId,
        siraNo: req.body.siraNo,
        ust_kurum_organizasyon_id: req.body.ust_kurum_organizasyon_id,      
        aktif: result.value.aktif,
        createdAt: new Date(),
        createdBy: result.value.createdBy
    });
    return res.send(kurumOrganizasyon);
}));

router.put('/:kurumOrganizasyonId', asyncMiddleware(async (req, res, next) => {

    const result = Joi.validate(req.body, kurumOrganizasyonSchema);
    console.log(result);
    if (result.error) {
        throw boom.badRequest(result.error.details[0].message);
    }

    await req.context.models.KurumOrganizasyon.update({
        tanim: req.body.tanim,
        organizasyonTipId: req.body.organizasyonTipId,
        isyeriId: req.body.isyeriId,
        uniteKodu: req.body.uniteKodu,
        birimKod: req.body.birimKod,
        tamKod: req.body.tamKod,
        tasraMerkez: req.body.tasraMerkez,
        maliyetKurumOrganizasyonId: req.body.maliyetKurumOrganizasyonId,
        segment2: req.body.segment2,
        segment3: req.body.segment3,
        segment6: req.body.segment6,
        ozellestirme: req.body.ozellestirme,
        organizasyonKodu: req.body.organizasyonKodu,
        isyeriKodu: req.body.isyeriKodu,
        bolgeKodu: req.body.bolgeKodu,
        teskilatKodu: req.body.teskilatKodu,
        alan1: req.body.alan1,
        alan2: req.body.alan2,
        alan3: req.body.alan3,
        alan4: req.body.alan4,
        alan5: req.body.alan5,
        tanimUb: req.body.tanimUb,
        haberlesmeKodu: req.body.haberlesmeKodu,
        dtvtKodu: req.body.dtvtKodu,
        merkezKurumId: req.body.merkezKurumId,
        kurumIlId: req.body.kurumIlId,
        siraNo: req.body.siraNo,
        ust_kurum_organizasyon_id: req.body.ust_kurum_organizasyon_id,
        aktif: result.value.aktif,
        createdAt: req.body.createdAt,
        lastUpdatedAt: new Date(),
        createdBy: result.value.createdBy,
        lastUpdatedBy: result.value.lastUpdatedBy
    },
        { returning: true, where: { kurumOrganizasyonId: req.params.kurumOrganizasyonId } }
    ).then(function ([rowsUpdate, [updatedKurumOrganizasyon]]) {
        res.send(updatedKurumOrganizasyon)
    }).catch(next);

}));

router.delete('/:kurumOrganizasyonId', asyncMiddleware(async (req, res) => {
    const result = await req.context.models.KurumOrganizasyon.destroy({
        where: { kurumOrganizasyonId: req.params.kurumOrganizasyonId },
    });

    return res.send(true);
}));

export default router;
