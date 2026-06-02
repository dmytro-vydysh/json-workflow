export class JWContextCondition {
  static async hasKey(context: Map<string, any>, key: string) {
    return context.has(key);
  }
}