# 关于本仓库
    本仓库仅仅作为前端monorepo 形式下的模板，避免每次新建项目一系列基础配置折磨😩，依照本人开发喜好配置

    涉及内容：
    1. git commit lint 
    2. eslint 
    3. stylelint 
    4. vscode 推荐插件
    5. 保存自动格式化代码（js,ts,css,sass)
    6. 通用的vscode setting
 
    
由于已经有了eslint 保存自动格式化，避免使用Prettier - Code formatter插件进行格式化，以免团队格式化不一致造成冲突过多

# 关于代码提交

代码没有错误继续提交会通过commitlint校验提交信息格式，格式如下

```
<type>(<scope>): <subject>
<body>
<footer>
```

git commit -m "feat:xxx"


type只有以下选项：
feat：新功能
fix：Bug修复
docs：仅文档修改
style：不影响代码含义的更改（空格、格式、缺少分号等）
refactor：既不修复错误也不添加功能的代码更改
perf：提高性能的代码更改
test：添加丢失的测试或更正现有测试
build：影响构建系统或外部依赖关系的更改
ci：更改我们的CI配置文件和脚本
chore：其他不修改src或测试文件的更改
revert：恢复以前的提交
