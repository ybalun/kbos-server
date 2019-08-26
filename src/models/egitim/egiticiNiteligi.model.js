const egiticiNiteligi = (sequelize, DataTypes) => {
	const EgiticiNiteligi = sequelize.define('egiticiNiteligi', {
		'id': {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'id',			
			primaryKey: true,
			autoIncrement: true
		},
		'nitelikKodu': {
			type: DataTypes.CHAR(1),
			allowNull: false,
			field: 'nitelik_kodu',
			unique: true
		},
		'nitelikAdi': {
			type: DataTypes.STRING(500),
			allowNull: false,
			field: 'nitelik_adi'
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
			tableName: 'egitici_niteligi'
		});

	return EgiticiNiteligi;

};

export default egiticiNiteligi;

