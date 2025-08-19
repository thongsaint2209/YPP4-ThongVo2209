//giữ các instance trong 1 scope
export class ScopeContext {
  private instances = new Map<any, any>();

  get<T>(token: any): T | undefined {
    return this.instances.get(token);
  }

  set<T>(token: any, instance: T) {
    this.instances.set(token, instance);
  }
}
