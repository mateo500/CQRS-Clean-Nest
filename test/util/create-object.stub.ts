import { SinonSandbox, SinonStubbedInstance, stub } from 'sinon';

type Func = (...args: any[]) => any;

type StubObjMethodNames<T = undefined> =
  T extends undefined ?
    (ReadonlyArray<string> | { [methodName: string]: any }) :
    (ReadonlyArray<keyof T> | { [P in keyof T]?: T[P] extends Func ? ReturnType<T[P]> : any });

type ResetStub = { _resetStubs(): void }

export type CustomSinonStubbedInstance<T> = SinonStubbedInstance<T> & ResetStub;

export function createStubObj<T>(methodNames: StubObjMethodNames<T>, sandbox ?: SinonSandbox): CustomSinonStubbedInstance<T> {
  let _stub;
  if(sandbox) {
    _stub = sandbox.stub;
  } else {
    _stub = stub
  }
  const stubbedInstance: any = {};
  (methodNames as any).forEach((methodName) => stubbedInstance[methodName] = _stub());
  return stubbedInstance;
}


