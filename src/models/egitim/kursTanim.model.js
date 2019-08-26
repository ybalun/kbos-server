
const kursTanim = (sequelize, DataTypes) => {
	const KursTanim = sequelize.define('kursTanim', {
		'id': {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'id',
			autoIncrement: true,
			primaryKey: true
		},
		'siraNo': {
			type: DataTypes.INTEGER,
			allowNull: false,
			field: 'sira_no'
		},
		'kursunAdi': {
			type: DataTypes.STRING(1000),
			allowNull: false,
			field: 'kursun_adi'
		},
		'kursKodu': {
			type: DataTypes.STRING(10),
			allowNull: false,
			field: 'kurs_kodu',
			unique: true
		},
		'merkezSureMin': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'merkez_sure_min'
		},
		'merkezSureMax': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'merkez_sure_max'
		},
		'merkezSureApp': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'merkez_sure_app'
		},
		'tasraSureMin': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'tasra_sure_min'
		},
		'tasraSureMax': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'tasra_sure_max'
		},
		'tasraSureApp': {
			type: DataTypes.INTEGER,
			allowNull: true,
			field: 'tasra_sure_app'
		},
		'aktif': {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			field: 'aktif'
		},
		'createdAt': {
			type: DataTypes.DATE,
			allowNull: false,
			field: 'created_at'
		},
		'lastUpdatedAt': {
			type: DataTypes.DATE,
			allowNull: true,
			field: 'last_updated_at'
		},
		'createdBy': {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'created_by'
		},
		'lastUpdatedBy': {
			type: DataTypes.BIGINT,
			allowNull: true,
			field: 'last_updated_by'
		}
	}, {
			timestamps: false,
			schema: 'kbos_education',
			tableName: 'kurs_tanim'
		});

	KursTanim.associate = models => {
		KursTanim.belongsTo(models.HizmetBirim, {
			as: "hizmetBirim",
			onDelete: 'CASCADE',
			foreignKey: {
				fieldName: 'hizmet_birim_id',
				allowNull: false,
				require: true
			},
			targetKey: 'id'
		});
	};

	return KursTanim;

};


export default kursTanim;