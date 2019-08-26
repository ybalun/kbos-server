const hizmetBirim = (sequelize, DataTypes) => {
	const HizmetBirim = sequelize.define('hizmetBirim', {
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
			field: 'sira_no',
			unique: true
		},
		'birimAdi': {
			type: DataTypes.STRING,
			allowNull: false,
			field: 'birim_adi'
		},
		'kursKodu': {
			type: DataTypes.CHAR(2),
			allowNull: false,
			field: 'kurs_kodu',
			unique: true
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
			tableName: 'hizmet_birim'
		});

	HizmetBirim.associate = models => {
	HizmetBirim.belongsTo(models.KurumOrganizasyon, {
		as: 'daire',
		onDelete: 'CASCADE',
		foreignKey: {
			fieldName: 'daire_id',
			allowNull: false,
			require: true
		},
		targetKey: 'kurumOrganizasyonId'
	});

	};

	return HizmetBirim;

};

export default hizmetBirim;
