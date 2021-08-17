export class Test{
    x : number;
    y : number;

    private static instance : Test;

    constructor() {
        this.x = 1;
        this.y = 2;
    }

    public static getInstance() : Test{
        if(!this.instance){
            this.instance = new this();
        }
        return this.instance;
    }

    view() {
        console.log(this.x + this.y);
    }
}