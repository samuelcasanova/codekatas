export const sayHello = (): string => {
  return `Hello ${process.env.USER ?? 'world'} from node ${process.version}`
}

console.log(sayHello())
