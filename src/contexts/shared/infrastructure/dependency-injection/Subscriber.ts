export const Subscriber = (_: string): ClassDecorator => {
    return <TFunction extends Function>(target: TFunction): TFunction => {
        return target;
    };
};
