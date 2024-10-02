class Ticket  {
    constructor (obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.status = obj.status;
        this.created = obj.created;
    }
}

module.exports = {
    Ticket
}