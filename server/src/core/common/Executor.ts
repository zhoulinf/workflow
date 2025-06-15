

abstract class Executor<T> {




  /**
   * Executes the given task and returns a promise that resolves to the result.
   * @param task The task to execute.
   * @returns A promise that resolves to the result of the task.
   */
  abstract execute(task: T): Promise<any>;
}