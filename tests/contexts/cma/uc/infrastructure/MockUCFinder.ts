import { UCFinder } from "../../../../../src/contexts/cma/uc/application/find/UCFinder";
import { UCPrimitives } from "../../../../../src/contexts/cma/uc/domain/UC";

export class MockUCFinder extends UCFinder {
private mockFind = jest.fn();

constructor() {
super(null as any);
}

async find(id: string): Promise<UCPrimitives> {
return this.mockFind() as Promise<UCPrimitives>;
}

shouldFind(uc: UCPrimitives): void {
this.mockFind.mockReturnValueOnce(uc);
}
}
