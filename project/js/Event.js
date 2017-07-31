class Observer {
    constructor (sender) {
        this.sender = sender;
        this.listeners = [];
    }

    attach (listener) {
        this.listeners.push(listener);
    }

    notify (args) {
        let index;

        for (index = 0; index < this.listeners.length; index++) {
            this.listeners[index](this.sender, args);
        }
    }

    isAttached (listener) {
        let currentListener = this.listeners.find((value) => {
            return value.name == listener.name;
        });

        return undefined || currentListener;
    }

}

module.exports = Observer;