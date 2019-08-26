const kurumOrganizasyon = (sequelize, DataTypes) => {
	const KurumOrganizasyon = sequelize.define('kurumOrganizasyon', {
		'kurumOrganizasyonId': {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'kurum_organizasyon_id',
			autoIncrement: true,
			primaryKey: true
		},
		'tanim': {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'tanim'
		},
		'createdBy': {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'ekleyen_id'
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'ekleme_tarihi'
		},
		'lastUpdatedBy': {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'guncelleyen_id'
		},
		'lastUpdatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'guncelleme_tarihi'
		},
		'aktif': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'aktif'
		},
		'organizasyonTipId': {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'organizasyon_tip_id'
		},
		'isyeriId': {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'isyeri_id'
		},
		'uniteKodu': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'unite_kodu'
		},
		'birimKod': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'birim_kod'
		},
		'tamKod': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'tam_kod'
		},
		'tasraMerkez': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'tasra_merkez'
		},
		'maliyetKurumOrganizasyonId': {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'maliyet_kurum_organizasyon_id'
		},
		'segment2': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'segment2'
		},
		'segment3': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'segment3'
		},
		'segment6': {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "Bordro icin Birim Kodu alanlari tutulur",
			field: 'segment6',
		},
		'ozellestirme': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'ozellestirme'
		},
		'organizasyonKodu': {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'organizasyon_kodu'
		},
		'isyeriKodu': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'isyerikodu'
		},
		'bolgeKodu': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'bolgekodu'
		},
		'teskilatKodu': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'teskilatkodu'
		},
		'alan1': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'alan1'
		},
		'alan2': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'alan2'
		},
		'alan3': {
			type: DataTypes.STRING,
			allowNull: true,
			comment: "DPB_KODU",
			field: 'alan3'
		},
		'alan4': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'alan4'
		},
		'alan5': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'alan5'
		},
		'tanimUb': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'tanim_ub'
		},
		'haberlesmeKodu': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'haberlesme_kodu'
		},
		'dtvtKodu': {
			type: DataTypes.STRING,
			allowNull: true,
			field: 'dtvt_kodu'
		},
		'merkezKurumId': {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'merkez_kurum_id'
		},
		'kurumIlId': {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'kurum_il_id'
		},
		'siraNo': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'sira_no'
		}
	}, {
			timestamps: false,
			schema: 'kbos_psso',
			tableName: 'gnl_kurum_organizasyon'
		});

	KurumOrganizasyon.associate = models => {
		KurumOrganizasyon.hasOne(models.HizmetBirim, { as: 'hizmetBirimleri', foreignKey: 'daire_id' });

		KurumOrganizasyon.hasMany(models.KurumOrganizasyon, { as: 'altKurumOrganizasyonlar', foreignKey: 'ust_kurum_organizasyon_id' });
		KurumOrganizasyon.belongsTo(models.KurumOrganizasyon, {
			as: 'ustKurumOrganizasyon',
			onDelete: 'SET NULL',
			foreignKey: {
				fieldName: 'ust_kurum_organizasyon_id',
				allowNull: true,
				require: false
			},
			targetKey: 'kurumOrganizasyonId'
		});

	};



	return KurumOrganizasyon;

};


export default kurumOrganizasyon;
