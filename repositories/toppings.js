var sqlite3 = require('sqlite3').verbose()


class ToppingsRepository {
    constructor() {
        this.db = new sqlite3.Database('sqlite/sqlite.db');
    }

    // callback?: (this: Statement, err: Error | null, rows: any[]) => void
    getAll(callback) {
        this.db.all('select * from topping', (err, rows) => {
            callback(err, rows);
        });
    }

    getById(id, callback) {
        this.db.get(`select * from topping where id=${id}`, (err, row) => {
            callback(err, row);
        });
    }

    create(body, callback) {
        let fields = [];
        let values = [];
        if (body.name) {
            fields.push('name');
            values.push(`'${body.name}'`);
        }
        if (body.price) {
            fields.push('price');
            values.push(`'${body.price}'`);
        }
        if (body.image) {
            fields.push('image');
            values.push(`'${body.image}'`);
        }

        let sql = `INSERT INTO 'topping' (${fields.join(',')}) VALUES (${values.join(',')})`;
        this.db.run(sql, err => {
            if (err) {
                callback(err, null);
                return;
            }
            this.db.get('select last_insert_rowid()', (err, row) => {
                if (err) {
                    callback(err, null);
                    return;
                }
                let newId = row['last_insert_rowid()'];
                this.getById(newId, (err, newRow) => {
                    callback(err, newRow);
                })
            })
        });
    }

    patch(id, body, callback) {
        let fields = [];
        if (body.name) {
            fields.push(`name='${body.name}'`);
        }
        if (body.price) {
            fields.push(`name='${body.price}'`);
        }
        if (body.image) {
            fields.push(`name='${body.image}'`);
        }
        let fieldsStr = '';

        if (fields.length > 0) {
            fieldsStr = fields.join(', ');
            fieldsStr = ' SET ' + fieldsStr;
        }

        let sql = `UPDATE topping ${fieldsStr} WHERE id = ${id}`;
        this.db.run(sql, err => {
            if (err) {
                callback(err, null);
                return;
            }
            this.getById(id, (err, row) => {
                callback(err, row);
            })
        });
    }

    delete(id, callback) {
        this.getById(id, (err, row) => {
            if (err) {
                callback(err);
                return;
            }

            this.db.run(`delete from 'topping' where id=${id}`, err => {
                if (err) {
                    callback(err, null);
                    return;
                }
                callback(null, row);
            });
        })
    }

}

let toppingsRepository = new ToppingsRepository();
module.exports = toppingsRepository;
