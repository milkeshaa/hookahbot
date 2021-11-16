'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db) {
  return db.createTable('tobacco_taste', {
    columns: {
      id: { type: 'int', primaryKey: true, autoIncrement: true },
      tobacco_id: {
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'tobacco_taste_tobacco_id',
          table: 'tobaccos',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      },
      taste_id: { 
        type: 'int',
        notNull: true,
        foreignKey: {
          name: 'tobacco_taste_taste_id',
          table: 'tastes',
          rules: {
            onDelete: 'CASCADE',
            onUpdate: 'RESTRICT'
          },
          mapping: 'id'
        }
      },
    },
    ifNotExists: true
  });
};

exports.down = function(db) {
  return db.dropTable('tobacco_taste');
};

exports._meta = {
  "version": 1
};
