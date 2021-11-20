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

const DATA = [
  {
    tableName: 'tastes',
    columnNameArray: [['name'], ['name']],
    valueArray: [['sweet'], ['sour']],
  },
  {
    tableName: 'tobaccos',
    columnNameArray: [
      //sweet
      ['name', 'strength'],
      ['name', 'strength'],
      ['name', 'strength'],
      //sour
      ['name', 'strength'],
      ['name', 'strength'],
      ['name', 'strength'],
    ],
    valueArray: [
      //sweet
      ['apple_drops', 5.5],
      ['banana_mama', 5.5],
      ['coconut_shake', 5.5],
      //sour
      ['black_currant', 5.5],
      ['blueberry', 5.5],
      ['forrest_berries', 5.5],
    ],
  },
  {
    tableName: 'tobacco_taste',
    columnNameArray: [
      //sweet
      ['tobacco_id', 'taste_id'],
      ['tobacco_id', 'taste_id'],
      ['tobacco_id', 'taste_id'],
      //sour
      ['tobacco_id', 'taste_id'],
      ['tobacco_id', 'taste_id'],
      ['tobacco_id', 'taste_id'],
    ],
    valueArray: [
      //sweet
      [1, 1],
      [2, 1],
      [3, 1],
      //sour
      [4, 2],
      [5, 2],
      [6, 2]
    ],
  },  
];

exports.up = function(db) {
  const promises = [];

  DATA.forEach(data => {
    data.columnNameArray.forEach((columns, index) => {
      promises.push(db.insert(data.tableName, columns, data.valueArray[index]));
    });
  });

  return Promise.all(promises);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
