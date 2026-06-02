export class JWContextTransformer {
  static async setKey(context: Map<string, any>, key: string, value: any) {
    context.set(key, value);
  }
  static async getKey(context: Map<string, any>, key: string) {
    return context.get(key);
  }
}