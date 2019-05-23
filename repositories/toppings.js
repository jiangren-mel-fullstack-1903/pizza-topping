class Topping {
    constructor(id, name, image) {
        this.id = id;
        this.name = name;
        this.image = image;
    }
}

class ToppingsRepository {
    constructor() {
        this.toppings = [
            new Topping(1, 'bread', ''),
            new Topping(2, 'bacon', ''),
            new Topping(3, 'cheese', '')
        ];
    }

    getAll() {
        return this.toppings;
    }

    getById(id) {
        return this.toppings.find(x => x.id == req.params.id);
    }

    create(body) {
        var newId = this.toppings[this.toppings.length - 1].id + 1;
        var newItem = Object.assign({}, { id: newId }, body);
        this.toppings.push(newItem);
        return newItem;
    }

    put(id, body) {
        let index = this.toppings.findIndex(x => x.id == id);
        let newElement = { ...{ id: id }, ...body };
        this.toppings[index] = newElement;
        return newElement;
    }

    patch(id, body) {
        let found = this.toppings.find(x => x.id == id);
        Object.assign(found, body);
        return found;
    }

    delete(id) {
        let index = this.toppings.findIndex(x => x.id == id);
        let removed = this.toppings.splice(index, 1);
        return removed;
    }

}

let toppingsRepository = new ToppingsRepository();
module.exports = toppingsRepository;

