要开发一个类似 Dify 的 Agent 工作流系统，并使用 NestJS 编写后端，以下是详细的架构思路和如何实现 **“统一执行器接口 + 支持不同类型执行器 + 支持工作流编排调度”** 的方法，结合了 Dify 的设计理念。

---

## 🧠 总体目标

你想要实现：

1. **每个 Node（工作流节点）都有一个对应的执行器（Executor）**
2. **执行器 run 接口统一，但每个执行器的输入参数不一样**
3. **根据工作流编排执行节点间的连接关系，自动调度执行器**
4. **基于 NestJS 实现模块化、高可扩展的服务**

---

## 🔧 Step 1：定义统一接口 `Executor`

```ts
// executor.interface.ts
export interface Executor<TInput = any, TOutput = any> {
  run(input: TInput, context: ExecutionContext): Promise<TOutput>;
}
```

* 所有执行器都要实现这个接口。
* `TInput` 是该执行器节点的输入参数类型。
* `ExecutionContext` 是可选上下文，包含用户信息、全局状态等。

---

## 🧱 Step 2：定义每种类型的执行器

举例：LLM 执行器、图片搜索执行器、自定义脚本执行器等。

```ts
// llm-executor.service.ts
@Injectable()
export class LLMExecutor implements Executor<LLMInput, LLMOutput> {
  async run(input: LLMInput, context: ExecutionContext): Promise<LLMOutput> {
    // 调用大模型，比如 OpenAI / Claude 等
    const response = await this.llmService.call(input.prompt, context);
    return { text: response };
  }
}

// image-search-executor.service.ts
@Injectable()
export class ImageSearchExecutor implements Executor<ImageSearchInput, ImageSearchOutput> {
  async run(input: ImageSearchInput, context: ExecutionContext): Promise<ImageSearchOutput> {
    const results = await this.bingService.searchImages(input.query);
    return { images: results };
  }
}
```

每个 executor 实现 `run(input, context)`，处理自己的逻辑。

---

## 🧭 Step 3：定义 Executor 类型和注册机制

### 使用 Token 注册所有 Executor：

```ts
export enum NodeType {
  LLM = 'llm',
  ImageSearch = 'image_search',
  // ...
}

export const EXECUTOR_MAP: Record<NodeType, Type<Executor>> = {
  [NodeType.LLM]: LLMExecutor,
  [NodeType.ImageSearch]: ImageSearchExecutor,
};
```

然后写一个统一的工厂方法用于 **根据 NodeType 获取执行器实例**：

```ts
@Injectable()
export class ExecutorFactory {
  constructor(
    private moduleRef: ModuleRef // 动态获取服务实例
  ) {}

  getExecutor(type: NodeType): Executor {
    const executorClass = EXECUTOR_MAP[type];
    if (!executorClass) throw new Error(`No executor for type: ${type}`);
    return this.moduleRef.get(executorClass, { strict: false });
  }
}
```

---

## 🔄 Step 4：统一执行调度器（WorkflowRunner）

```ts
@Injectable()
export class WorkflowRunner {
  constructor(
    private readonly executorFactory: ExecutorFactory
  ) {}

  async runWorkflow(workflow: WorkflowGraph, input: Record<string, any>) {
    const results = new Map<string, any>(); // 每个节点的运行结果

    const sortedNodes = this.topologicalSort(workflow.nodes, workflow.edges);
    for (const node of sortedNodes) {
      const inputParams = this.resolveInputParams(node, results);
      const executor = this.executorFactory.getExecutor(node.type as NodeType);
      const result = await executor.run(inputParams, {
        workflowId: workflow.id,
        userId: workflow.userId,
        context: results,
      });

      results.set(node.id, result);
    }

    return results;
  }

  private resolveInputParams(node: WorkflowNode, results: Map<string, any>) {
    // 例如，从依赖节点获取结果
    const inputConfig = node.inputs;
    const resolved: Record<string, any> = {};
    for (const key in inputConfig) {
      const ref = inputConfig[key];
      if (ref?.fromNodeId && results.has(ref.fromNodeId)) {
        resolved[key] = results.get(ref.fromNodeId)[ref.outputKey];
      } else {
        resolved[key] = inputConfig[key]; // 默认值或静态值
      }
    }
    return resolved;
  }

  private topologicalSort(nodes: WorkflowNode[], edges: WorkflowEdge[]) {
    // 拓扑排序：将 DAG 按依赖顺序排序
    // 略（可补充）
    return nodes;
  }
}
```

---

## 🔌 Step 5：整合到 Nest 模块中

```ts
@Module({
  providers: [
    LLMExecutor,
    ImageSearchExecutor,
    ExecutorFactory,
    WorkflowRunner
  ],
  exports: [WorkflowRunner],
})
export class WorkflowModule {}
```

---

## ✅ 最终使用示例：

```ts
@Controller('agent')
export class AgentController {
  constructor(private readonly workflowRunner: WorkflowRunner) {}

  @Post('execute')
  async runWorkflow(@Body() dto: { workflowId: string; input: any }) {
    const workflow = await this.workflowService.getWorkflowGraph(dto.workflowId);
    return await this.workflowRunner.runWorkflow(workflow, dto.input);
  }
}
```

---

## 🧩 Workflow JSON 示例（可视化编排结构）

```json
{
  "nodes": [
    {
      "id": "1",
      "type": "llm",
      "inputs": { "prompt": "用户输入文本" }
    },
    {
      "id": "2",
      "type": "image_search",
      "inputs": {
        "query": { "fromNodeId": "1", "outputKey": "text" }
      }
    }
  ],
  "edges": [
    { "from": "1", "to": "2" }
  ]
}
```

---

## 总结架构关键点：

| 模块                | 职责                 |
| ----------------- | ------------------ |
| `Executor`        | 执行节点逻辑             |
| `ExecutorFactory` | 根据 node type 获取执行器 |
| `WorkflowRunner`  | 按拓扑图调度执行器          |
| `WorkflowGraph`   | 定义 DAG 流程（节点 + 依赖） |
| `ModuleRef`       | 动态依赖注入 Nest 服务     |

---

如你还想深入看下 dify 源码中的实现类位置，我也可以帮你定位（如：`app/workflows/executors`、`workflow-node` 结构等）。

要不要我给你补一个完整的 Nest 项目结构示例（controller + service + executor）？
