const uuid = require('uuid')
class TicketFull  {
    constructor (name, description) {
        this.id = uuid.v4();
        this.name = name;
        this.description = description;
        this.status = false;
        this.created = TicketFull.setCreatedDate()
    }

    static setCreatedDate() {
        const date = new Date()
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`
    }
}

module.exports = {
    TicketFull
}