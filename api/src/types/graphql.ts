export type Resolver = (parent: any, args: any, context: any, info: any) => any

export interface IResolver {
  [key: string]: {
    [key: string]: Resolver
  }
}
