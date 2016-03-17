export default class SingleValue<T> {
  constructor(
    private value: T
  ) {}

  valueOf(): T {
    return this.value;
  }

  toString(): string {
    return String(this.value);
  }

  equals(target: SingleValue<T>): boolean {
    return this.value == target.valueOf();
  }
}