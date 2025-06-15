

abstract class Executor<T> {

  abstract execute(task: T): Promise<any>;
}