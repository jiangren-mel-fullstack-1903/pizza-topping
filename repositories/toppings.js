var sqlite3 = require('sqlite3').verbose()


class ToppingsRepository {
    constructor() {
        this.db = new sqlite3.Database('sqlite/sqlite.db');
    }

    // callback?: (this: Statement, err: Error | null, rows: any[]) => void
    getAll() {
        return new Promise((resolve, reject) => {
            this.db.all('select * from topping', (err, rows) => {
                if (err) reject(err);
                else resolve(rows);
            });
        })
    }

    getById(id) {
        return new Promise((resolve, reject) => {
            this.db.get(`select * from topping where id=${id}`, (err, row) => {
                if (err) reject(err);
                else resolve(row);
            });
        })
    }

    create(body) {
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

        return new Promise((resolve, reject) => {
            this.db.run(sql, err => {
                if (err) {
                    reject(err);
                    return;
                }
                this.db.get('select last_insert_rowid()', (err, row) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    let newId = row['last_insert_rowid()'];
                    this.getById(newId).then(row => {
                        resolve(row);
                    }).catch(err => {
                        reject(err);
                    })
                })
            });
        })
    }

    patch(id, body) {
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

        return new Promise((resolve, reject) => {
            this.db.run(sql, err => {
                if (err) {
                    reject(err);
                    return;
                }
                this.getById(id).then(row => {
                    resolve(row);
                }).catch(err => {
                    reject(err);
                })
            });
        })
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.getById(id).then(row => {
                this.db.run(`delete from 'topping' where id=${id}`, err => {
                    if (err) reject(err);
                    else resolve(row);
                });
            }).catch(err => {
                reject(err);
            })
        })
    }

}

let toppingsRepository = new ToppingsRepository();
module.exports = toppingsRepository;
