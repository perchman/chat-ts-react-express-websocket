export default class ServiceLocator {
    private static instances : { [name: string]: any } = {};

    static set<Type>(name: string, instance: Type) : void {
        this.instances[name] = instance;
    }

    static get<Type>(name: string) : Type {
        if (this.instances.hasOwnProperty(name)) {
            return this.instances[name];
        }

        throw new Error('Object not found');
    }
}