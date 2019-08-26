const kursTuru = (sequelize, DataTypes) => {
	const KursTuru = sequelize.define('kursTuru', {
		'id': {
			type: DataTypes.BIGINT,
			allowNull: false,
			field: 'id',
			autoIncrement: true,
			primaryKey: true
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
		},	
		'kursTuru': {
			type: DataTypes.STRING(500),
			allowNull: false,
			field: 'kurs_turu'
		}

	}, {
			timestamps: false,
			schema: 'kbos_education',
			tableName: 'kurs_turu'			
		});

	return KursTuru;

};


export default kursTuru;
