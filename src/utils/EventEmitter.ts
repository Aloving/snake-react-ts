export class EventEmitter {
    private events: {[index: string]: Function[]} = {};

    public on(type: string, listener: Function) {
        this.events[type] = this.events[type] || [];
        this.events[type].push(listener);
    }

    public emit(type: string, arg?: any) {
        if (this.events[type]) {
            this.events[type].forEach(listener => listener(arg));
        }
    }
}
