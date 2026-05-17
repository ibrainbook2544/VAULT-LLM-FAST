---
title: Lex-Fridman-视频笔记-全-
source: https://www.cnblogs.com/opendoccn/p/19773984
author:
  - "[[布客飞龙I]]"
published: 2026-03-25
created: 2026-05-14
description: Lex Fridman 视频笔记（全） Cursor 团队访谈：人工智能驱动下的编程未来 🚀 概述 在本节课中，我们将一起学习 Cursor 团队在 Lex Fridman 播客中分享的关于人工智能如何改变编程未来的深刻见解。我们将探讨代码编辑器的演变、AI 辅助编程的核心技术、未来
tags:
  - clippings
updated: 2026-05-17T15:12
---
## Lex Fridman 视频笔记（全）

## Cursor 团队访谈：人工智能驱动下的编程未来 🚀

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_1.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_3.png)

## 概述

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_5.png)

在本节课中，我们将一起学习 Cursor 团队在 Lex Fridman 播客中分享的关于人工智能如何改变编程未来的深刻见解。我们将探讨代码编辑器的演变、AI 辅助编程的核心技术、未来编程的形态，以及 Cursor 团队如何通过创新推动这一变革。

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_7.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_8.png)

## 代码编辑器的本质与演变

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_10.png)

代码编辑器长期以来是构建软件的核心场所。对于非程序员来说，可以将其视为一个为程序员高度优化的文字处理器。代码具有丰富的结构，因此代码编辑器能够提供许多传统文字处理器无法实现的功能。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_12.png)

以下是代码编辑器提供的一些核心功能：

- **视觉区分** ：快速扫描代码中的不同标记。
- **导航** ：像使用超链接浏览网页一样，在代码库中跳转到定义处。
- **错误检查** ：捕获基本的程序错误。

随着 AI 技术的融入，代码编辑器的定义和功能将在未来十年发生巨大变化。编程的本质和构建软件的方式也将随之改变。

编程本身应该充满乐趣。速度往往是乐趣的关键因素之一。计算机编程的魅力在于，个人就能与计算机快速交互，独立构建出非常酷的东西。

---

## Cursor 的诞生与愿景

Cursor 是一个基于 VS Code 的代码编辑器，它增加了许多强大的 AI 辅助编程功能，吸引了编程和 AI 社区的广泛关注。Cursor 团队的创始成员包括 Michael Trull、Swli Asff、Arvid Lumark 和 Amman Sger。

团队最初都是 Vim 用户。大约在 2021 年 GitHub Copilot 推出时，为了体验其功能，他们转向了当时唯一支持 Copilot 的编辑器 VS Code。Copilot 带来的体验足够好，促使他们完成了这次切换。

Copilot 的核心功能是智能代码补全。它能在你开始编写时，建议如何完成当前的一到三行代码。当它“理解”你的意图时，会带来一种默契感；即使出错了，影响也不大，因为你可以通过继续输入字符来迭代修正。Copilot 是第一个真正意义上的 AI 消费级产品，也是大型语言模型的第一个“杀手级应用”。

Cursor 的起源与 OpenAI 在 2020 年发布的“缩放定律”论文密切相关。该论文指出，模型规模和数据量的增大可以带来可预测的性能提升。这让他们意识到，AI 技术将对各领域知识工作者产生深远影响。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_14.png)

2022 年底，团队获得了 GPT-4 的早期访问权限。其能力的巨大飞跃，让之前基于缩放定律的理论预测变得非常具体。他们意识到，这不仅是一个点状解决方案，而是整个编程流程都将通过这些模型进行，这需要一个全新的编程环境和方式。于是，他们开始着手构建 Cursor，以实现这个更宏大的愿景。

团队曾对 AI 在数学领域的进展速度有过激烈讨论。事实证明，对进展最乐观的成员 Amman 的预测非常具有前瞻性。AI 在数学等具有明确验证信号的领域可能进展神速，甚至达到超人类水平，但这并不等同于通用人工智能。

---

## 为何选择分叉 VS Code

既然已有 Copilot 等 VS Code 扩展在做 AI 相关功能，为何还要分叉 VS Code 并从头构建 Cursor？

团队认为，随着模型能力持续快速提升，构建软件的方式将发生根本性改变，不仅会带来巨大的生产力提升，编程行为本身也会彻底改变。如果仅作为现有代码编辑器的插件，会受到诸多限制。他们不希望被这些限制束缚，而是希望自由地构建最有用的功能。

在竞争方面，AI 编程领域非常独特。每年甚至每次模型能力的跃升，都会解锁一波新的可能性和功能。在这个领域，即使只是领先几个月，产品的实用性也会天差地别。Cursor 的目标是不断创新，快速实现新功能，推动能力上限。他们以初创公司的敏捷性，致力于进行必要的研究和实验。

一个被低估的事实是，他们最初是为自己构建 Cursor。当时他们感到沮丧，因为模型能力在提升，但 Copilot 的体验却停滞不前，没有充分利用模型的新能力。相比之下，Cursor 的体验是统一开发的，负责 UX 交互和模型优化的是同一批人，甚至往往是同一个人，这种紧密协作能创造出原本不可能实现的功能。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_16.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_18.png)

---

## Cursor 的核心功能：Tab 与智能编辑

Cursor 目前主要擅长两个方面：

1. **预测与补全** ：像一个快速的同事，预测你的下一步操作并提前输入。这不仅是预测光标后的字符，更是预测下一个完整的更改、下一个要跳转的位置。
2. **指令到代码** ：帮助你跳转到 AI 前面，通过指令生成代码。

团队在这两方面都投入了大量工作，旨在使编辑体验符合人体工程学，同时确保功能智能且快速。

**Tab 键** 是实现“零熵操作”理念的核心。其抽象思想是：一旦你表达了意图，而完成这个想法所需的操作是确定性的（即信息熵为零），那么模型就应该能“读懂你的想法”，通过按 Tab 键直接跳过这些步骤。代码的字符可预测性本身就比自然语言高，而预测用户在现有代码基础上的下一个编辑动作，这种可预测性会被进一步放大。Tab 的目标就是消除编辑器中所有低熵的操作，让用户直接“跳跃”到未来。

**技术实现细节** ：  
为了实现高质量且低延迟的 Tab 预测，需要解决几个关键技术挑战：

- **长上下文与低延迟** ：预测需要很长的提示（看到大量代码），但生成的令牌却很少。这非常适合使用 **混合专家模型** ，它能显著提升长上下文下的性能。
- **推测解码变体** ：团队构建了一种称为 **推测编辑** 的变体。它利用原始代码作为强先验，并行处理大块代码，直到模型预测与原始代码出现分歧，从而大幅加速代码重写过程。
- **缓存优化** ：由于输入令牌量巨大，必须设计缓存感知的提示，并重用键值缓存，以减少每次击键的计算量，降低延迟和 GPU 负载。

**Tab 的未来能力** ：  
Tab 功能旨在实现“下一个动作预测”。其广义目标包括：

- 生成新代码（填充空白）。
- 跨多行编辑代码。
- 在同一文件内跳转到不同位置。
- 在不同文件间跳转。
- 甚至建议在终端中运行命令，或跳转到定义处获取必要知识后再返回，以便用户验证补全是否正确。

理想状态下，如果编程中接下来五分钟要做的事可以从近期操作中预测，那么用户就能通过不断按 Tab 键，快速完成一系列大型更改。

---

## 差异界面与代码审查

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_20.png)

Cursor 的一个显著特点是其差异界面。当模型建议修改时，会通过红色（删除）和绿色（添加）高亮显示代码变更，用户可以在聊天窗口中查看、应用或接受这些差异。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_22.png)

团队为不同场景优化了不同的差异界面：

- **自动补全** ：差异需要极快的阅读速度，因为用户视线聚焦在单一区域。
- **审查大块代码** ：需要不同的呈现方式。
- **多文件更改** ：又需要另一种优化。

他们尝试过多种设计方案，例如最初采用类似 Google Docs 的删除线样式，但过于分散注意力；后来尝试过按住 Option 键预览建议。目前的版本可能仍非最终形态。

随着模型变得更智能，它们能提出的更改会越来越大，人类需要进行的验证工作也越来越多。当前的差异算法缺乏智能，无法区分更改的重要性。未来的方向是让模型智能地指导审查，例如：

- **高亮重要部分** ：突出显示差异中包含大量信息的关键部分，淡化低熵的重复性更改。
- **自动标记潜在错误** ：让模型分析差异，标记出可能存在问题的部分，提示用户重点审查。

这本质上是一个引导人类程序员以最优方式阅读必要信息的 UX 设计工程问题。

对于跨多文件的代码审查，可以借鉴但超越 GitHub 的代码审查体验。当代码由语言模型生成时，设计可以完全围绕审查者展开，使其工作更轻松、高效。例如，模型可以智能地引导审查顺序，按照逻辑依赖关系而非简单的文件列表顺序进行审查。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_24.png)

---

## 自然语言与编程的未来

编程的未来是否完全由自然语言主导？团队认为并非如此。

与 AI 协作编程，类似于人与人之间的结对编程。有时，通过自然语言指令（“请实现这个函数”）是最高效的；但有时，用语言解释意图非常繁琐，直接动手写一部分示例代码给 AI 看，反而是更简单的沟通方式。未来，沟通方式可能更加多元，包括拖拽、绘图，甚至脑机接口。

因此，自然语言会占有一席之地，但绝不会是大多数时候编程的主要方式。

---

## 底层机器学习技术

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_26.png)

Cursor 的有效运行依赖于一个由定制模型和前沿模型组成的“组合拳”。定制模型可以在特定任务上超越甚至是最先进的前沿模型。

**定制模型的应用领域** ：

1. **Cursor Tab** ：专门针对“预测下一个编辑”任务进行训练和优化的小模型，在该任务上表现卓越。
2. **代码应用** ：将模型生成的“草图”实际应用到代码文件中。前沿模型擅长规划代码更改和生成粗略草图，但精确地生成差异（如准确计算行号）却很困难。Cursor 的解决方案是：让前沿模型勾勒出更改的粗略代码块，然后由一个专门训练的 **应用模型** 来精确执行这个更改，将其应用到文件中。这个“应用”步骤对人类来说看似简单，但对模型而言并非确定性算法，需要专门优化。

这种分工模式允许使用更智能的模型进行规划，而由能力稍弱的模型处理实现细节，从而在成本和延迟上取得平衡。未来，可能会形成更复杂的层级，例如由 O1 给出更高层次的计划，然后由 Sonnet 和应用模型递归执行。

---

## 模型比较与基准测试

在编程领域，没有哪个模型在所有重要维度（速度、代码编辑能力、长上下文处理、编码能力）上全面占优。

目前综合表现最佳的是 **Sonnet 3.5** 。 **O1** 在解决编程面试或 LeetCode 风格的问题上表现出色，但在理解模糊意图方面感觉不如 Sonnet。其他前沿模型在基准测试中表现很好，但一旦稍微偏离基准测试的分布，能力就可能下降。

**基准测试的局限性** ：  
基准测试（如 SWE-bench）与真实编程存在显著差距：

- **真实编程的模糊性** ：真实编程中，人类的指令可能是破碎的英语、引用之前的操作，或者包含大量上下文依赖。它更侧重于理解人类意图并执行，而非解决定义明确的问题。
- **数据污染问题** ：流行的公共基准测试数据很可能已经污染了基础模型的训练数据。模型可能直接“记住”了问题、文件路径或函数名，而非真正解决问题。

由于基准测试的缺陷，许多构建系统或模型的公司会依赖 **人工定性评估** （“氛围检查”）和私有测试集来评估进展方向。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_28.png)

---

## 提示工程与上下文管理

好的提示对于模型成功至关重要。不同模型对提示的敏感度不同。早期 GPT-4 上下文窗口小，对提示非常敏感。现在即使上下文窗口变长，填满整个窗口也会导致速度变慢，有时甚至会让模型困惑。

Cursor 内部构建了一个名为 **Preempt** 的系统来管理上下文。其灵感来源于 React 的声明式 UI 设计。开发者使用类似 JSX 的语法声明提示组件及其优先级（例如，光标所在行优先级最高），然后由 Preempt 渲染器根据上下文窗口大小智能地编排这些组件，决定包含哪些、截断哪些。

团队的目标是让用户以最自然的方式操作，而由系统负责在后台智能地检索和组织相关上下文。系统也会尝试在用户输入时，主动建议可能相关的文件，以减少指令中的不确定性。

---

## 智能体与编程

智能体非常酷，它模仿人类的行为方式，让人感觉更接近 AGI。但目前，智能体在许多任务上还不够实用。

智能体在某些类型的任务上会很有用，例如修复一个定义明确的 Bug。用户可以用两句话描述问题，然后让智能体花长时间去定位、复现、修复并验证这个 Bug。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_30.png)

然而，团队认为智能体不会接管所有编程工作。因为编程的很多价值在于迭代，用户在看到初始版本前往往不清楚自己想要什么，之后需要快速迭代并提供更多反馈。因此，对于大量编程工作，用户更需要一个能即时给出初始版本并支持快速迭代的系统。

像 **Roo Code** 或 **Devin** 这类能设置开发环境、安装软件包、配置数据库并部署应用的智能体，对于某些类型的编程（尤其是繁琐的步骤）会很酷。这属于 Cursor 让程序员生活更轻松、更有趣的范畴，但目前并非工作重点。

未来，智能体可以在后台运行，与用户协同工作。例如，当用户在处理一个涉及前后端的 PR 时，后台智能体可以并行处理后端部分，等用户切换到后端时，就已经有了一些初始代码可供迭代。

---

## 性能优化技术

Cursor 的多数操作都感觉非常快。性能优化涉及多个层面：

1. **缓存预热** ：在用户输入时，就预先将可能用到的上下文（如当前文件内容）加载并计算其键值缓存。当用户按下回车时，需要预填充和计算的令牌就很少，从而显著降低首次令牌生成时间。
2. **键值缓存** ：Transformer 模型通过注意力机制工作，其中键和值代表了之前所有令牌的内部表示。如果已经计算并存储了前 N 个令牌的 KV 缓存，在计算第 N+1 个令牌时，就无需再次让前 N 个令牌通过整个模型，只需处理新令牌并复用缓存，这大大加快了生成速度。
3. **高级缓存与推测** ：对于 Cursor Tab，可以提前推测用户接受建议后的状态，并触发另一个请求，将结果缓存。这样当用户按下 Tab 时，下一个建议几乎可以立即呈现。
4. **注意力机制优化** ：从多头注意力转向 **多查询注意力** 或 **分组查询注意力** ，可以压缩 KV 缓存的大小，这对于长上下文、大批量生成时的内存带宽瓶颈至关重要。 **MLA** 等更复杂的算法通过将键值压缩为潜在向量，进一步减少了缓存大小。
5. **被动搜索** ：模型内部对“用户想要哪个建议”存在不确定性。通过一次生成多个候选，然后使用奖励模型（通过人类反馈进行强化学习训练）挑选出人类更可能喜欢的那个，可以提升体验。强化学习还可以用来训练小模型，使其在特定任务上达到与大模型相当的性能。

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_32.png)

## 影子工作区与后台智能体

团队正在实验“影子工作区”的概念，即在后台进行计算，以帮助用户在更长的时间尺度上（如下一个十分钟）预测和准备将要进行的操作。

其核心思想是利用反馈来提升模型表现。一个重要的反馈来源是 **语言服务器** 。LSP 为不同编程语言提供语法检查、类型检查、跳转到定义、查找引用等功能。在大型项目中，这些功能至关重要。

影子工作区的实现方式是：在本地启动一个隐藏的 Cursor 窗口，AI 智能体可以在其中任意修改代码（只要不保存），并获取 LSP 的反馈、跳转到定义、迭代运行代码，就像在真实环境中一样。在 Linux 上，可以通过内核扩展创建内存中的镜像文件系统；在 macOS 和 Windows 上则更具挑战性。

一个有趣的思路是“保存锁”。智能体持有保存锁，在内存中进行修改和测试，当用户尝试运行时，如果检测到锁，可以从智能体那里取回锁。这为实现强大的后台智能体提供了可能。

对于耗时较长、改动较大的任务，可能需要在远程沙箱环境中进行，这又带来了如何精确复制用户环境的挑战。

---

## Bug 检测与程序验证

当前，即使是最先进的模型，在被动提示下进行 Bug 检测的效果也很差，校准度非常低。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_34.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_36.png)

这可能是因为在预训练数据中，真正“检测真实 Bug 并提出修复”的例子非常少。模型可能“感觉”到某些代码有问题，但难以将其明确表达出来，更难以判断 Bug 的严重性（是实验性代码中的小问题，还是数据库核心代码中不可接受的错误）。

**Bug 检测的重要性** ：随着 AI 承担越来越多的编程工作，不仅需要生成代码，还需要验证代码。强大的 Bug 检测模型对于实现 AI 编程的最高愿景至关重要。

**如何训练 Bug 检测模型** ：

- **合成数据** ：一个流行的思路是，引入 Bug 比发现 Bug 更容易。可以训练一个模型在现有代码中引入合理的 Bug，然后利用这些合成数据训练一个反向的 Bug 检测模型。
- **利用更多信息** ：除了代码本身，还可以让模型访问运行时信息，如跟踪、调试器步骤、日志等。
- **产品形态** ：可能有两种形态：一个快速、专业的模型在后台持续运行，尝试发现 Bug；另一种是用户愿意为解决特定难题支付高额费用，让模型投入大量计算进行深度分析。

**代码标注实践** ：在可能造成严重损害的代码行旁添加醒目的注释（如“危险！！！”），不仅对人类工程师是很好的提醒，也能让 AI 模型更关注这些区域，从而提高发现 Bug 的几率。这是一个有争议但可能非常有效的实践。

**程序验证的未来** ：未来，人们可能不再需要编写测试。模型会在你编写函数时，建议一个规范，并在你审查规范的同时，由智能推理模型计算出一个证明，验证实现符合规范。这可能适用于大多数函数。

然而， **规范制定** 本身就是一个难题。如何用形式化语言准确捕捉那些难以明确指定的意图？此外，如何处理外部依赖（如调用 Stripe API）或程序中使用语言模型作为原语的情况？这些都是程序验证面临的挑战。但若能实现，将从消除程序 Bug 到确保 AI 安全，产生深远影响。

---

## 基础设施与扩展挑战

Cursor 主要使用 AWS。AWS 的可靠性是选择它的关键原因，尽管其控制台界面可能复杂，但服务本身非常稳定。

随着用户量和请求量的指数级增长，团队遇到了各种扩展挑战：

- **通用组件** ：缓存、数据库等通用组件在规模扩大时会遇到各种问题，如表溢出。
- **定制系统** ：例如为代码库构建语义索引的检索系统。

**检索系统的技术细节** ：

- **隐私与同步** ：非常注重客户端 Bug，因此服务器上不存储用户代码，只存储代码片段的嵌入向量。技术挑战在于确保本地代码库状态与服务器状态同步。
- **高效同步** ：使用默克尔树等层次化哈希结构进行高效同步。仅当根哈希不匹配时，才逐层向下查找具体差异的文件，避免了持续的全量哈希比对带来的巨大网络和数据库开销。
- **嵌入缓存** ：嵌入计算是成本瓶颈。对于同一公司的多个用户访问相同代码库（可能处于不同分支），可以通过基于代码块哈希的向量缓存来避免重复嵌入，大幅提升速度并降低成本。

**索引代码库的当前价值** ：最明显的用途是快速定位。当你在大型代码库中模糊记得某个功能的位置时，可以通过代码库聊天功能快速找到。未来，随着检索质量的提升，其价值会越来越大。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_38.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_40.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_42.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/96ce1bc073f5f2cf0890c836e0e94d5b_43.png)

**为何不做本地处理** ：团队考虑过本地模型，但这非常困难。大多数用户使用

## 人工智能前沿：第1部分：2026年大语言模型、编程、规模定律与AGI现状

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_1.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_2.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_3.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_5.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_6.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_7.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_8.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_10.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_11.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_13.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_14.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_15.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_16.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_18.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_19.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_20.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_22.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_24.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_26.png)

## 概述

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_28.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_29.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_30.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_32.png)

在本节课中，我们将一起探讨人工智能领域的最前沿现状。我们将回顾过去一年中激动人心的技术突破与发展，并展望未来一年可能发生的有趣趋势。虽然讨论有时会涉及非常专业的技术细节，但我们会确保内容对领域外的朋友同样易于理解，同时绝不降低其深度。我们很荣幸能与人工智能社区的两位杰出人物——塞巴斯蒂安·拉什卡和内森·兰伯特——共同探讨这些话题。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_34.png)

塞巴斯蒂安是两本广受好评的书籍的作者，我强烈推荐给初学者和专家：《从零开始构建大语言模型》和《从零开始构建推理模型》。我坚信，在机器学习与计算机科学领域，学习和理解某样东西的最佳方式就是亲手从零开始构建它。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_36.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_38.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_40.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_42.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_43.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_44.png)

内森是艾伦人工智能研究所的后训练负责人，也是关于人类反馈强化学习的权威书籍的作者。他们两人都在社交媒体和知识分享平台上有出色的表现，拥有精彩的课程、播客和文章，每个人都应该关注他们的动态。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_46.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_47.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_49.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_51.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_52.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_53.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_54.png)

这是莱克斯·弗里德曼播客。要支持我们，请查看描述中的赞助商信息，您也可以在描述中找到联系我、提问、提供反馈等链接。现在，亲爱的朋友们，有请塞巴斯蒂安·拉什卡和内森·兰伯特。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_56.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_58.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_59.png)

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_61.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_62.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_64.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_65.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_67.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_68.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_69.png)

## 国际竞争格局：谁在领跑？

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_71.png)

上一节我们介绍了本次讨论的背景和嘉宾。本节中，我们来看看当前人工智能领域的国际竞争格局。一个有用的观察视角是所谓的“深度求索时刻”。这大约发生在一年前的2025年1月，当时中国的开源公司深度求索发布了DeepSeek-R1。可以说，它以声称更少的计算成本和更便宜的价格，实现了接近或达到最先进的性能，这让所有人都感到惊讶。从那时起到今天，人工智能的竞争在研究和产品层面都变得异常激烈，并且一直在加速。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_73.png)

让我们今天讨论所有这些，也许可以从一些尖锐的问题开始。在国际层面上，你认为谁在领跑？是中国的一系列公司，还是美国的一系列公司？塞巴斯蒂安，内森，很高兴见到你们。那么塞巴斯蒂安，你认为谁在赢？

“赢”是一个非常宽泛的术语。你提到了“深度求索时刻”，我确实认为深度求索在赢得那些致力于开源模型的人心方面无疑是赢家，因为他们分享了这些开源模型。我认为“赢”有多个时间尺度：今天、明年、十年后。我唯一确定的是，我不认为在2026年的今天，会有任何一家公司拥有其他公司无法获得的技术。这主要是因为研究人员经常更换工作、更换实验室，他们在流动。因此，我不认为在技术获取方面会有明显的赢家。然而，我认为差异将在于预算和硬件限制。所以，想法不会是专有的，但实现这些想法所需的资源会是。因此，我目前看不到赢家通吃的局面。

内森，你怎么看？你看到不同的实验室在他们试图做的事情上投入了不同的精力。在我们录制这个节目的时间点，关于Anthropic的Claude Opus 4.5模型的炒作已经达到了疯狂的程度。我在过去几周里使用和构建它，感觉这种炒作几乎成了一个梗。有趣的是，这完全是有机产生的。如果我们回到几个月前，谷歌的Gemini 3发布了，那次发布的营销和“哇”效应似乎非常高。但在11月底Claude Opus 4.5发布后，炒作一直在增长。Gemini 3在此之前发布，但现在感觉人们谈论得没那么多了，即使它刚出来时，大家都说这是Gemini的时刻，要夺回谷歌在AI上的结构性优势。Gemini 3是一个很棒的模型，我仍然在使用它，只是差异化更小了。

我同意塞巴斯蒂安的观点，想法空间非常流动。但在文化上，Anthropic以在代码上投入巨大而闻名，他们的Claude Code目前运作得很好。所以我认为，即使想法可以自由流动，但很多瓶颈在于人力和组织文化。Anthropic至少表现得最不混乱，这算是一个优势。如果他们能保持一段时间，那会很好。

另一方面，中国有很多令人瞩目的技术，那里的实验室比深度求索多得多。深度求索在中国发起了一场运动，有点像ChatGPT在美国发起的运动，那时所有东西都有聊天机器人。现在中国有很多科技公司正在发布非常强大的前沿开源模型，以至于我认为深度求索正在失去其作为中国卓越开源模型制造者的王冠。像智谱AI的GLM模型、MiniMax的模型、月之暗面（Moonshot）的模型，尤其是在过去几个月里，表现更加亮眼。新的深度求索模型仍然很强，但这可能被视为一个重要的叙事转折点：2025年深度求索来了，然后它为更多发布这些出色模型的中国公司提供了一个平台，让他们有了这种新型的运营方式。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_75.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_77.png)

这些中国公司的模型是开源权重的。根据这些美国公司的商业模式发展轨迹，它们可能面临风险。但目前，很多人在美国为AI软件付费，而在中国和世界其他地区，历史上人们不太愿意为软件付费。所以像深度求索这样的模型因为开源而赢得了人们的喜爱。你认为中国公司会继续发布开源模型多久？

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_79.png)

我认为会持续几年。在美国，开源模型没有明确的商业模式。我写开源模型有一段时间了，这些中国公司已经意识到了这一点。我收到过他们的一些咨询，他们很聪明，也意识到了同样的限制：很多美国科技公司和其他IT公司出于安全考虑，不会为订阅中国公司的API付费。这是科技领域长期以来的习惯。这些公司的人因此将开源模型视为影响并参与美国巨大且不断增长的AI支出市场的一种能力。他们对此非常现实，而且这对他们有效。我认为政府会看到这在国际上建立了很大的技术影响力。所以会有很多激励措施来保持这种势头。但构建这些模型和进行研究非常昂贵，所以在某个时候，我预计会出现整合。但我不认为这会是2026年的故事。2026年将会有比2025年更多的开源模型构建者，其中很多引人注目的将在中国。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_81.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_83.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_84.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_86.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_88.png)

你想说点什么吗？是的，你提到深度求索正在失去王冠。在某种程度上，我同意，但我们也必须考虑到，他们仍然略微领先。其他公司并非深度求索变差了，而是其他公司使用了深度求索的想法。例如，你提到的月之暗面，他们使用相同的架构进行训练。然后我们又有了这种“深度蛙跳”，他们可能在某个时间点因为拥有更新的模型而变得更好一些。我认为这又回到了一个事实：不会有明确的赢家，只会是：一个人发布了东西，另一个人跟进，最新的模型可能总是最好的模型。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_90.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_92.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_93.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_95.png)

我们还会看到中国公司有不同的动机。深度求索非常保密，而像MiniMax、智谱AI这样的初创公司，他们实际上已经提交了IPO文件，试图获得西方市场的关注并进行大量推广。我不知道这些动机是否会改变模型开发，因为深度求索众所周知是由对冲基金高瓴资本建立的，我们不知道他们到底用模型做什么，或者是否关心这些。他们在沟通上是保密的，但在描述模型工作原理的技术报告方面是开放的。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_97.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_99.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_101.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_103.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_104.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_106.png)

关于Opus 4.5的炒作，还有一层因素是它在X（Twitter）回音壁中成为宠儿。实际使用该模型的人数，我认为公平地说，ChatGPT和Gemini专注于广大的用户基础，他们只想解决日常生活中的问题，而这个用户基础是巨大的。所以关于编码的炒作可能并不代表实际使用情况。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_108.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_110.png)

我认为很多使用模式，如你所说，是品牌认知度和习惯问题，几乎是肌肉记忆。ChatGPT已经存在很长时间了，人们已经习惯使用它，这几乎像一个飞轮，他们推荐给其他用户。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_112.png)

另一个有趣的点是LLM的定制化。例如，ChatGPT有记忆功能。你可能订阅了它用于个人事务，但我不确定你是否想在工作中使用同一个东西，因为私人和工作之间有界限。如果你在一家公司工作，他们可能不允许，或者你可能不想要那样。我认为这也是一个有趣的点，你可能会有多个订阅：一个是干净的代码，不包含你的个人图像或业余项目，只是工作相关；另一个是你的个人事务。所以我认为未来也是多个模型并存。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_114.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_115.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_116.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_117.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_119.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_121.png)

## 2026年，哪个模型会胜出？

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_123.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_124.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_126.png)

在消费者聊天机器人的背景下，问题是：你愿意押注Gemini超过ChatGPT吗？凭直觉，我觉得这有点冒险，因为OpenAI是现有领导者，这有很多好处。我认为2025年的势头在Gemini一边，但他们的起点很低。他们早期的尝试，如Bard，经历了巨大的组织混乱，他们能坚持下来值得称赞。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_128.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_130.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_132.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_134.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_135.png)

但也很难押注OpenAI会输，因为他们总是显得很混乱，但他们非常擅长落地产品。我个人对GPT-5的评价褒贬不一，但它的“高线”功能作为一个路由器，可能为他们节省了大量资金，因为大多数用户不再像以前那样为GPU成本付费。所以，很难将我喜欢模型的地方与实际会成为大众差异化因素的东西分开。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_137.png)

关于2026年谁会赢，我来说点冒险的。我认为Gemini将继续在ChatGPT上取得进展。当两者都在极端规模上运营时，谷歌有能力将研究和产品稍微分开。你听到很多关于AI在运营上混乱、追逐高影响力事物的说法，这是一种非常初创公司的文化。在软件和企业方面，我认为Anthropic将继续取得成功，因为他们一次又一次地为那做好了准备。显然，谷歌云有很多产品，但Gemini这个品牌对他们建立很重要，谷歌云将继续表现良好，但这在生态系统中是一个更复杂的事情，因为它是在与Azure和AWS竞争，而不是在模型提供商层面。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_139.png)

在基础设施方面，你认为GPU会带来巨大优势，主要是因为英伟达芯片的利润率极高。谷歌可以从上到下开发一切以适应他们的技术栈，而不必支付这种利润率，而且他们在建设数据中心方面有先发优势。所有这些具有高交付周期和高成本利润率的事情，谷歌都有历史优势。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_141.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_143.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_145.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_147.png)

如果要有新的范式，它最有可能来自OpenAI，因为他们的研究部门一次又一次地展示了落地新研究想法或产品的能力。我认为像深度研究、O1思维模型，所有这些定义性的东西都来自OpenAI，这一定是他们作为一个组织的顶级优势之一。所以很难押注他们会输。但我认为今年很多将是关于规模和优化模型中可以描述为“低垂果实”的东西。显然，智能和速度之间存在权衡。这就是ChatGPT-5试图在幕后解决的问题：广大公众是想要智能，还是想要速度？

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_149.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_151.png)

我认为实际上有一个很好的选择，或者有一个切换选项。就我个人使用而言，大多数时候我查找东西，是为了快速提问，获取我想要的信息。对于大多数日常任务，我现在使用快速模型。我认为自动模式很好，你不必特别指定“思考”或“非思考”模式。但有时我也想要专业版。我经常做的是，当我写完东西后，把它放进ChatGPT，说“嘿，做一个非常彻底的检查：我的所有引用正确吗？我的所有想法正确吗？我有没有格式错误？图表编号错了吗？”我不需要马上得到结果，我可以完成我的工作，也许吃个晚饭，让它运行，然后回来检查。我认为这是重要的选择。如果每个查询我都必须等30分钟或10分钟，我会疯掉的。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_153.png)

我在这里的反应是，你居然使用路由器和非思考模型，我简直无法想象你怎么能忍受。我的反应是，我重度使用ChatGPT有一段时间了，从未碰过GPT-5非思考版。我发现它的语气和错误倾向，就是出错的几率更高。其中一些是从OpenAI发布O3时开始的，那是第一个进行深度搜索、查找许多来源并为你整合的模型。所以我习惯了那种方式。因此，当我在工作中查找任何信息查询时，无论是论文还是我找到的一些代码参考，我只使用GPT-5.2思考版或专业版。我经常同时进行五个专业版查询，每个都在寻找一篇特定的论文或对方程的反馈。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_155.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_156.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_158.png)

我有一个很好的例子，就在这次播客旅行前，我需要尽快回答一个问题。我在家里运行着一个本地GPU，我想在旅行期间运行一个强化学习实验。通常我也会拔掉插头，因为如果你不在家，你不想让东西一直插着。我不小心拔掉了GPU的插头。我妻子已经在车里了，情况很紧急。基本上，我需要一个尽可能快的bash脚本来运行我的不同实验和评估。我知道如何使用bash终端，但在那一刻，我只需要10秒钟给我命令。这是一个有趣的情况。那么你用了什么？我用了非思考快速模型，它给了我bash命令，让我将不同的脚本链接在一起。然后问题是，你有一个tee命令，你想把它路由到一个日志文件。我当时很匆忙，我本可以自己想的。顺便说一句，我不知道这是否是一个有代表性的案例：在车里等着，必须运行GPU生成一个batch.sh，听起来像电影情节。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_160.png)

我用Gemini做那种事。我用思考版处理所有事情，然后用Gemini处理快速事情或有时可以谷歌的事情。它擅长解释事情，我信任它有这种知识背景，而且很简单。Gemini应用已经变得好多了，很适合那种事情。对于代码和任何哲学讨论，我使用Claude Opus 4.5，总是使用扩展思考。扩展思考和推理时间缩放只是让模型稍微更聪明一点的方法。当进展非常快时，我总是倾向于选择那一方，因为你不知道什么时候它会解锁一个新的用例。有时我用Grok获取实时信息，或者在AI推特上查找我知道我看到过但需要挖掘的东西。虽然当Grok-4出来时，它的Grok-4 Pro变体实际上非常好，给我留下了深刻印象。但后来只是肌肉记忆，因为打开了ChatGPT应用，所以我就没再用它了。

我实际上用很多不同的东西。我确实用GPT-4进行重度调试，进行硬核调试。当其他模型解决不了时，我发现它是最好的。有趣的是，你说ChatGPT是最好的界面，对我来说也是同样的原因，但这可能只是惯性。Gemini对我来说是更好的界面，因为我在“大海捞针”测试中爱上了它。如果我放入有很多上下文但我在寻找非常具体信息的东西，确保它能跟踪所有信息，我发现至少Gemini对我来说是最好的。

有趣的是，对于一些模型，如果它们在某个特定功能、某一天、针对那个特定查询和提示赢得了你的心，你就会觉得这个模型更好，然后你就会坚持用它一段时间，直到它做了非常愚蠢的事情。这就像一个阈值效应：它做了一些聪明事，然后你爱上了它，然后它做了一些蠢事，你就想，你知道吗，我要换用Claude和ChatGPT试试。

这完全就像你使用某样东西直到它出问题，然后你更换。我认为这和我们使用任何东西的方式一样：最喜欢的文本编辑器、操作系统或浏览器。有很多浏览器选项，Safari、Firefox、Chrome都很相似，但然后你可能想用某些扩展，然后你就换了。但我不认为有人会把同样的网站输入不同的浏览器进行比较。你只有在网站无法渲染、出现问题时才会那样做。我认为这是一个好观点：你使用它直到它出问题，然后你探索其他选项。

关于长上下文，我也是Gemini用户，但GPT-5.2的发布博客有疯狂的长上下文测试，很多人都在问：他们是不是刚刚找到了某种算法改变？在这个小模型更新中，它从大约30%提高到了70%左右。所以也很难跟踪所有这些事情。但现在我对GPT-5.2的长上下文更看好，只是我实际上怎么去测试它？这是一场永无止境的战斗。

有趣的是，我们中没有人谈论中国模型。从用户使用角度来看，这说明什么？这是否意味着中国模型不够好，还是意味着我们只是非常偏向和专注于美国？我认为目前模型和平台之间存在差异。开源模型以开源权重而闻名，但还不是平台。也有很多公司愿意以非常低的成本为你提供开源模型推理。比如OpenRouter，很容易进行多模态操作。你可以在Perplexity上运行深度求索。我们坐在这里的几个人，都持续使用OpenAI的GPT-5 Pro，我们都愿意为边际智能增益付费。有人认为美国的模型更好，就输出而言，我认为问题是它们今年和未来几年是否会保持更好。只要它们更好，我就会付费使用它们。

也有分析显示，中国模型的部署方式（你可以争论是否由于专家控制）是它们使用更少的GPU进行复制，这使得它们更慢并有不同的错误。速度和智能，如果这些东西对你作为用户有利，我认为在美国很多用户会选择这个。我认为这将激励这些中国公司想在其他方面竞争，无论是免费还是大幅降低成本，或者会在产品提供方面催生创造力，这对生态系统有好处。但我只是认为一个简单的事实是：美国模型目前更好，我们使用它们。我尝试过中国模型，尝试过其他开源模型，觉得有趣，但不会回头再用。

## 编程用例与工具

我们没有真正提到编程，那是很多人非常关心的另一个用例。我基本上一半用Cursor，一半用Claude Code，因为我发现它们是根本不同的体验，两者都有用。你们编程很多，你们用什么？当前的风向是什么？

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_162.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_164.png)

我用VS Code的Codex插件。它非常方便，就像一个插件，然后是一个可以访问你仓库的聊天界面。我知道Claude Code有点不同，它更偏向代理，可以为你处理整个项目。我还没到那个阶段，因为我可能是个控制狂，但我仍然想看看发生了什么。Codex对我来说现在是甜点区，它在帮助我，但没有完全接管。

我应该提一下，我使用Claude Code的原因之一是为了培养用英语编程的技能。体验是根本不同的，相对于微观管理代码生成过程的细节、查看差异（如果你在Cursor这样的IDE中使用），以及在进展过程中改变、调整、查看和深入理解代码，与只是在设计空间中思考并在宏观层面指导它相比，我认为这是思考编程过程的另一种方式。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_166.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_168.png)

我们还应该说，Claude Code似乎以某种方式更好地利用了Claude Opus 4.5。对于人们来说，这是一个很好的并排比较。你可以打开Claude Code，打开Cursor，打开VS Code，在所有上面选择相同的模型并提问，非常有趣的是，Claude Code在这方面要好得多。我的意思是，这很了不起，对吧？

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_170.png)

我们应该说，你们俩在多个方面都很出色：研究人员、程序员、教育者、推特用户，在书籍方面也是。内森，希望很快会有一本关于RLHF的书出版。它已经可以预购，并且有完整的数字预印本，正在为实体书进行美化和更好的组织。我这样做是因为，当我们的生活如此数字化时，创造你认为在实体形式上非常优秀的东西很有趣。

我应该在这里查一下Perplexity。塞巴斯蒂安·拉什卡是一位机器学习研究员和作者，以几本有影响力的书籍而闻名，我想提一下其中几本：我强烈推荐的一本书是《从零开始构建大语言模型》，以及新书《从零开始构建推理模型》。我对此非常兴奋。说实话，从零开始构建一个LLM非常有趣，也能学到很多东西。正如你所说，这可能是学习某样东西如何真正工作的最佳方式。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_172.png)

你可以看图表，但图表可能有错误；你可以看概念解释，但你可能误解它们。但如果有代码并且代码能运行，你就知道它是正确的。我的意思是，没有误解，它是精确的，否则它就不会工作。我认为这就是编码背后的美：它不说谎，基本上是数学。即使有数学，我认为书中也可能有错误，因为你读书时不是在运行数学，你无法验证。而代码的好处是你可以验证它。

我同意你关于《从零开始构建LLM》这本书的看法。关掉互联网上的一切，只专注于这本书，感觉很好。我读了几本历史书，感觉不那么孤独，真的更有趣。例如，在编程方面，我认为用LLM编程真的更有趣，我认为用LLM阅读也真的更有趣。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_174.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_176.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/ee16e8d77b42c7511e7ad5cda32e0e47_177.png)

但你说得对，这种分心应该最小化。所以你用LLM来丰富体验，也许增加更多背景。对我来说，小规模的“啊哈”时刻率真的很高。100%同意。我也想纠正自己：我不是建议不使用

## 人工智能与搜索的未来：第1部分：Perplexity CEO Aravind Srinivas访谈 🧠

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_1.png)

在本节课中，我们将一起学习Perplexity AI的核心理念、技术架构及其对搜索和互联网未来的影响。我们将跟随Perplexity联合创始人兼CEO Aravind Srinivas的视角，深入探讨如何结合大型语言模型（LLM）与传统搜索来构建一个以事实为依据的“答案引擎”。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_3.png)

---

## 概述：什么是Perplexity？🤔

Perplexity AI 被其创始人描述为一个“答案引擎”。与传统的搜索引擎不同，它旨在直接回答用户的问题，并且每一个回答都附有来自互联网上人类创建来源的引用。这大大减少了大型语言模型常见的“幻觉”问题，使其在研究或满足好奇心驱动的探索时更加可靠。

上一节我们介绍了Perplexity的基本定位，本节中我们来看看它的核心工作原理。

---

## 核心架构：搜索与LLM的结合 🔧

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_5.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_6.png)

Perplexity 结合了传统搜索引擎和大型语言模型。其工作流程可以概括为以下几个步骤：

1. **传统搜索** ：首先，系统会像传统搜索引擎一样，根据用户查询检索相关的网页和文档。
2. **信息提取** ：从检索到的文档中提取出与查询最相关的段落。
3. **LLM生成答案** ：将这些相关段落输入给大型语言模型（LLM）。
4. **格式化与引用** ：LLM根据这些段落和原始查询，生成一个格式清晰、易于阅读的答案，并自动在答案的相应部分添加脚注，引用其信息来源。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_8.png)

**公式化描述** ：  
`最终答案 = LLM( 提取段落( 搜索引擎( 用户查询 ) ) )`

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_10.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_12.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_13.png)

其核心指令是： **“给定一组链接和段落，为用户撰写一个简洁的答案，并附上适当的引用。”** 这模仿了学术写作的原则——每一句话都应有据可查。

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_15.png)

## 设计哲学：从学术界汲取灵感 📚

Perplexity 的设计深受学术规范影响。Aravind 提到，他在撰写第一篇论文时学到的一条深刻原则是： **论文中的每一句话都应该有引用支持** ，无论是来自其他同行评审的论文还是自己的实验结果。任何没有引用的陈述更像是个人观点。

他们将这一原则应用于聊天机器人，问自己： **“让聊天机器人保持准确的最佳方式是什么？”** 答案是：强制它只说出能在互联网上找到、并且有多个来源支持的内容。这并非一个突发奇想的实验，而是源于解决实际问题的需求。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_17.png)

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_19.png)

## 产品演进：从内部工具到公众产品 🚀

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_21.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_22.png)

Perplexity 的诞生源于团队自身的需求。在创业初期，团队成员对许多事务（如为第一位员工办理健康保险）一无所知。他们发现，即使使用GPT-3.5这样的模型来回答问题，也无法判断答案是否正确，模型经常给出错误信息。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_24.png)

这促使他们回归学术根源，思考如何阻止模型“胡说八道”。他们意识到，这本质上就是维基百科的工作方式——任何编辑都需要有可靠的来源支持。因此，他们决定构建一个产品，将搜索的严谨性与LLM的叙事能力结合起来，确保答案的每一个部分都有据可查。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_26.png)

---

## 与Google的对比：答案引擎 vs. 搜索引擎 🔄

Aravind 强调，Perplexity 不仅仅是一个搜索引擎，更是一个“知识发现引擎”。关键在于， **获取答案并不是旅程的终点，而是起点** 。

以下是Perplexity与传统搜索引擎（如Google）的一些关键区别：

- **用户界面与体验** ：
	- Google 提供一个链接列表，用户需要自行点击和筛选。
		- Perplexity 直接提供综合了多个来源信息的答案。
- **技术方法** ：
	- Google 依赖复杂的排名算法（如PageRank）和关键词匹配。
		- Perplexity 结合了传统检索（如BM25算法）和AI驱动的语义理解与生成。
- **旅程延伸** ：
	- Perplexity 会在答案下方提供“相关问题”建议，引导用户进行更深层次的探索，满足人类无穷的好奇心。

这种设计鼓励用户从一个问题出发，不断挖掘新的相关知识，形成一个“好奇心驱动的探索循环”。

---

## 商业模式与未来挑战 💰

Google的核心商业模式是基于关键词竞价的广告（AdWords），这被认为是过去50年来最伟大的商业模式之一。然而，对于Perplexity这样的新产品，直接套用链接广告模式可能并不合适。

Aravind 认为，Perplexity 不需要追求成为像Google那样的“现金牛”。一个可持续的、良好的业务就足够了。未来的商业模式可能是混合的，例如结合订阅制和广告，但关键在于 **不能以牺牲用户体验和答案的真实性为代价** 。

集成广告的挑战在于，如何在不干扰用户寻求真相、不破坏产品信任感的前提下，有效地连接用户与信息源。理想的状态是广告高度相关，甚至让用户感觉不到在看广告。

---

## 技术挑战：幻觉与优化 🎯

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_28.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_30.png)

尽管Perplexity强制模型引用来源，但“幻觉”（即生成不准确或虚构信息）问题仍然可能通过多种途径发生：

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_32.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_34.png)

1. **模型能力不足** ：模型无法深度理解查询和段落的语义，导致答案不准确。
2. **索引质量差** ：检索到的文档信息过时、不完整或相互矛盾。
3. **信息过载** ：向模型输入了过多无关细节，干扰了其判断。
4. **检索错误** ：检索到的文档完全不相关（此时一个足够聪明的模型应该回答“我不知道”）。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_36.png)

因此，减少幻觉需要从多个维度持续优化：提升模型本身的推理能力、改善检索和索引的新鲜度与质量、优化输入模型的信息片段。

---

## 对AGI与推理未来的展望 🌌

Aravind 探讨了人工智能未来的一个关键方向： **推理能力** 。目前，模型通过海量计算和数据进行“预训练”来获取常识和知识，这有点像“闭卷考试”。但更高效的方式可能是让AI学会“开卷考试”——将事实记忆与推理能力解耦。

一个有趣的设想是： **能否与一个AI进行像与爱因斯坦或费曼那样的对话？** 你问一个难题，它说“我不知道”，但一周后，它经过大量研究回来，给出一个让你惊叹的答案。如果能够实现这种 **随着推理计算量增加而答案质量显著提升** 的能力，那将是“真正推理”的开始。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_38.png)

这指向了“自我引导推理”的研究方向，例如“思维链”提示和“STaR”（Self-Taught Reasoner）等方法，让模型能够生成解释自己推理过程的步骤，并通过这些步骤来训练自己，从而在数学、编码等任务上取得更好表现。如果这种能力能够泛化，将为实现更强大的AI智能体铺平道路。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_40.png)

---

## 总结与启示 ✨

本节课中我们一起学习了Perplexity AI的核心理念与技术架构。关键要点包括：

- Perplexity 是一个 **答案引擎** ，通过结合传统搜索和LLM，提供有引用的直接答案。
- 其设计哲学源于 **学术严谨性** ，强调每一句陈述都应有据可查。
- 它与Google等传统搜索引擎的区别在于 **以答案和知识发现为中心** ，而非链接列表。
- 面临的挑战包括减少幻觉、探索可持续的商业模式，以及应对“答案引擎优化”等新问题。
- 人工智能的未来可能在于 **解耦记忆与推理** ，发展出能够进行长期、深度思考的“开卷考试”式系统。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_42.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_44.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/f2d6b66e915425636b380097fa34550f_45.png)

最终，Aravind 表达了一个乐观的愿景：AI 应该成为增强人类好奇心和求知欲的工具，帮助我们更好地理解世界、减少偏见、发现真理，从而引领我们走向一个知识无限扩展的未来。正如爱因斯坦所说：“重要的是不要停止提问。”

## Lex Fridman 播客 #474《DHH：编程的未来、人工智能、Ruby on Rails、生产力与育儿》中英字幕 - P1 - GPT中英字幕课程资源 - BV1jHkSB6EPi

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_1.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_3.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_4.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_6.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_8.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_10.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_12.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_14.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_15.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_16.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_18.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_19.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_21.png)

## 课程概述：编程、框架与人生哲学

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_23.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_25.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_27.png)

在本教程中，我们将跟随Lex Fridman与David Heinemeier Hansson（DHH）的对话，深入探讨编程语言、Web开发框架、技术趋势、创业哲学以及个人生活。DHH是Ruby on Rails框架的创造者，也是37signals公司的联合创始人兼CTO。我们将学习他的编程学习历程、对Ruby语言的深刻见解、对现代Web开发的批判性思考，以及他如何平衡工作、家庭和个人爱好。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_29.png)

---

## 章节 1：编程的早期尝试与失败

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_31.png)

上一节我们介绍了DHH的背景，本节中我们来看看他学习编程的早期经历。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_33.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_35.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_36.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_38.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_40.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_42.png)

DHH的编程学习之路并非一帆风顺。他从小接触电脑，但最初几次尝试学习编程都以失败告终。

以下是DHH早期学习编程的几个关键阶段：

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_44.png)

- **第一次尝试（约6-7岁）** ：他得到了一台Amstrad 464电脑，并尝试通过杂志上的源代码输入游戏。由于英语不熟练和打字错误，他未能成功运行任何程序。这次经历让他对“变量”的概念感到困惑。
- **第二次尝试（约11-12岁）** ：他使用Amiga 500电脑和名为“Easy Amos”的编程语言再次尝试。虽然理解了条件语句和循环等概念，但最终仍未能完成一个基本的游戏，这让他一度怀疑自己是否足够聪明。
- **转折点（九年级）** ：在学校的一次活动中，他第一次接触了互联网和HTML。通过简单地添加标签让文本闪烁，他获得了即时的、积极的反馈。这种“所见即所得”的体验重新点燃了他学习编程的兴趣，并为他后来学习PHP和最终掌握编程奠定了基础。

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_46.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_48.png)

## 章节 2：PHP的启蒙与Web开发的“黄金时代”

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_50.png)

上一节我们介绍了DHH如何通过HTML重燃编程兴趣，本节中我们来看看PHP如何成为他真正的起点。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_52.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_54.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_55.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_57.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_59.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_61.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_63.png)

对于DHH而言，PHP不仅仅是一个工具，它代表了一种理想的开发者体验。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_65.png)

- **PHP的简单性** ：在90年代中后期，PHP提供了极低的入门门槛。开发者只需编写脚本，通过FTP上传到服务器，修改后刷新页面即可看到变化。无需复杂的框架配置或构建流程。
- **对现代开发的反思** ：DHH认为，尽管技术不断进步，但许多网页应用的核心仍然是“CRUD”（创建、读取、更新、删除）操作。他批评了开发者为了补偿这种“存在性焦虑”而过度复杂化系统的倾向。
- **追求高效开发体验** ：DHH职业生涯的大部分时间都在追求重现PHP时代那种简单、直接的开发体验。他认为，拥有更强大计算能力的今天，开发应该变得更加容易，而非更复杂。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_67.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_69.png)

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_71.png)

## 章节 3：与Ruby的“一见钟情”

上一节我们讨论了PHP的简易性，本节中我们来看看DHH如何发现并爱上Ruby语言。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_73.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_75.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_76.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_78.png)

在为一个新项目（即后来的Basecamp）选择技术栈时，DHH拥有了自由选择权。他发现了Ruby，并迅速被其魅力征服。

Ruby在多个方面深深吸引了DHH：

- **语法美感与人性化设计** ：Ruby的设计哲学是“程序员幸福感至上”。它移除了许多语言中常见的“视觉噪音”，如不必要的分号、括号，让代码更接近自然语言。
	- **示例：循环** ： `5.times { puts "Hello" }` 这段代码直观地表达了“执行5次”的含义。
		- **示例：条件判断** ：Ruby提供了多种优雅的表达方式，如 `user.upgrade if user.admin?` 或 `user.downgrade unless user.admin?`，使代码如诗歌般可读。
- **元编程与领域特定语言（DSL）** ：Ruby强大的元编程能力允许开发者扩展语言本身。在Rails中，这表现为像 `has_many :comments` 这样的声明式语法，它们看起来像是语言的关键字，实则是Rails添加的DSL，用于简洁地描述数据模型关系。
- **动态类型与“鸭子类型”** ：DHH是动态类型的坚定拥护者。他认为静态类型引入了不必要的重复和“视觉噪音”，而Ruby的“鸭子类型”（只关心对象能否响应某个方法，而非其具体类型）与元编程相结合，带来了极大的灵活性和表达力。他以Shopify这样的大型成功应用为例，证明了动态类型语言完全能够支撑大规模、高性能的业务系统。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_80.png)

---

## 章节 4：Rails框架的哲学与设计原则

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_82.png)

上一节我们深入探讨了Ruby语言的魅力，本节中我们来看看DHH如何将这些理念融入Ruby on Rails框架。

Rails不仅仅是一个工具集，它代表了一整套关于如何高效、优雅地构建Web应用的哲学。DHH将其总结为“Rails信条”。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_84.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_85.png)

以下是Rails的核心设计原则：

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_87.png)

- **优化程序员幸福感** ：继承自Ruby的设计目标，在面临权衡时，优先考虑开发者的愉悦感和代码美感。
- **约定优于配置** ：框架为常见任务提供明智的默认值，开发者无需在起步阶段就陷入繁琐的配置文件中，可以快速开始构建真正重要的业务逻辑。
- **多合一菜单** ：Rails试图提供一个完整的、预先集成好的解决方案，而不是一堆需要用户自己组装和调试的独立库。这降低了起步和协作的复杂性。
- **提供锋利的刀具** ：与某些语言（如Java）试图限制开发者以防止犯错不同，Rails信任开发者，提供强大而灵活的工具，相信他们能从错误中学习并成长。
- **进步重于稳定** ：虽然Rails如今已非常稳定，但DHH承认这一原则需要重新审视。他批评了JavaScript生态中一度盛行的、为变化而变化的“追逐新潮”文化，认为稳定性本身具有巨大价值。

---

## 章节 5：小团队、远程工作与可持续创业

上一节我们探讨了技术框架的哲学，本节中我们来看看DHH在团队管理和创业模式上的独特见解。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_89.png)

DHH与Jason Fried共同创立的37signals公司，以其小团队、远程工作和拒绝风险投资（VC）的模式而闻名。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_91.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_92.png)

- **小团队的力量** ：DHH认为，大多数伟大的创新都来自小团队甚至个人。小团队沟通成本低，决策快，能更专注于实际构建而非无休止的规划和会议。Basecamp的第一个版本仅由他一人花费约400小时完成。
- **远程工作的优势** ：作为远程工作的早期倡导者，DHH认为深度工作需要在长时间不受干扰的环境中完成。远程工作减少了不必要的办公室社交和临时会议，让开发者能更专注。他与Jason Fried合作二十多年，每周直接交流时间可能不足两小时，但效率极高。
- **拒绝VC，保持独立** ：37signals从未接受风险投资。DHH认为，VC追求超高速增长和退出的模式，往往迫使公司偏离创始人的初衷，盲目扩张，并最终可能导致公司文化变质和创始人失去工作乐趣。他们通过产品盈利来支持业务发展，保持了公司的独立性和决策自由。
- **工作与生活的平衡** ：DHH坚信每周40小时工作制足以完成出色的工作，关键在于避免浪费时间。拥有家庭后，他更加严格地规划工作时间，反而提升了专注度和效率。他认为，将生活全部押注在工作上，无论成功与否，最终都可能带来遗憾。

---

## 章节 6：技术决策、行业观察与个人爱好

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_94.png)

上一节我们讨论了创业模式，本节中我们来看看DHH对一些重大技术趋势的看法以及他的个人生活。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_96.png)

DHH以其鲜明和时常引发争议的观点而著称，涉及云计算、大型科技公司、开源以及个人生活哲学。

- **“离开云”运动** ：基于成本、复杂性和对互联网去中心化初衷的考虑，DHH领导37signals将主要应用从AWS迁移回自建数据中心。他认为，对于达到一定规模且需求稳定的公司，拥有硬件比租赁云服务长期来看更经济，也更能掌控自己的基础设施。
- **对大型科技公司的批评** ：他批评了苹果App Store的“围墙花园”模式和30%的“苹果税”，并曾为此公开抗争。他也对欧盟的GDPR法规导致的、无处不在且无用的“Cookie横幅”表示不满，认为这是“善意引向地狱”的典型例子。
- **开源的礼物经济** ：DHH将开源视为一种“礼物交换”。创作者出于自身需求制作并分享软件，使用者可以自由使用并选择是否回馈。他反对在开源项目中混入商业诉求，或事后向成功的使用者索要“补偿”，认为这会破坏开源生态的信任基础。他以WordPress创始人Matt Mullenweg近期的争议作为反面案例。
- **家庭与赛车：生活的意义** ：DHH将组建家庭描述为人生中最重要、最具变革性的经历，其带来的满足感远超事业成就。同时，他是一名业余赛车手，曾赢得勒芒24小时耐力赛的组别冠军。他将赛车描述为一种能带来极致“心流”体验的活动，在极限边缘驾驶要求绝对的专注，能让人忘却一切烦恼。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_98.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_100.png)

---

## 课程总结

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_102.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/c5e9a649c5132bc92f1c8b3b98bfafb7_104.png)

本节课中我们一起学习了DHH的编程与人生哲学。我们从他的早期失败中学到了坚持和找到正确入门方式的重要性；通过Ruby和Rails，我们看到了追求代码美感、开发效率和程序员幸福感如何塑造伟大的工具；从他的创业经历中，我们理解了小团队、独立发展和工作生活平衡的价值；最后，通过他对技术趋势、开源和家庭生活的看法，我们看到了一个技术思想家如何将原则应用于更广阔的生活领域。DHH的故事提醒我们，技术最终是为人服务的，在追求效率和成功的同时，不应忘记工作的乐趣、生活的意义以及对他人的信任。

## AI 与人类未来：第 1 部分：Claude、AGI 与 AI 安全

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_1.png)

## 概述

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_3.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_4.png)

在本节课中，我们将学习 AI 领域的核心概念，包括扩展定律、Claude 模型的开发、AI 安全的重要性，以及 AI 对人类未来的潜在影响。我们将跟随 Anthropic 首席执行官 Dario Amodei 的视角，深入探讨这些话题。

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_6.png)

## 扩展定律与扩展假说

上一节我们介绍了课程的整体框架，本节中我们来看看 AI 发展的核心驱动力之一：扩展定律。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_8.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_10.png)

扩展定律描述了模型性能与三个关键因素之间的关系：更大的网络、更多的数据和更强的计算能力。Dario Amodei 分享了他的观察：自 2014 年进入 AI 领域以来，他注意到模型性能随着这些因素的线性增加而持续提升。这种关系最初在语音识别中被发现，后来在语言模型中得到了证实。

核心公式可以概括为：  
**性能提升 ∝ (网络规模 × 数据规模 × 计算规模)**

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_12.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_13.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_15.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_16.png)

尽管在扩展过程中总会出现各种质疑（例如模型无法理解语义、无法进行段落推理、数据质量不足等），但每一次扩展都克服了这些障碍，推动了能力的飞跃。Dario 认为，虽然我们无法从理论上完全解释这种“魔力”，但经验表明扩展将继续下去，并可能最终达到甚至超越人类水平。

---

## 为什么“更大”意味着“更好”？

上一节我们了解了扩展定律的基本概念，本节中我们深入探讨其背后的原理。

Dario 用他在生物物理学领域的背景来解释这一现象。他提到了“1/f 噪声”和“1/x 分布”的概念。在自然界中，许多过程（如电阻中的热噪声）会产生这种平滑的、长尾的分布。

语言和现实世界中的模式也类似。存在一些非常简单的模式（如常见词汇、基本语法），也存在一系列越来越复杂和罕见的模式（如段落主题、新颖思想）。这些模式形成了一个层次结构。

- **小网络** ：只能捕捉最常见的模式（例如，句子需要有动词、形容词、名词）。
- **稍大的网络** ：能够理解这些词应该如何组合才有意义。
- **更大的网络** ：开始掌握句子之间的连贯性，理解段落结构。

因此，随着网络容量的增加，它能够捕捉到更罕见、更复杂的模式分布。人类语言和概念是经过数百万年进化形成的，其模式分布很可能也具有这种平滑的长尾特性，使得扩展成为可能。

那么，扩展的天花板在哪里？Dario 认为，至少在达到人类水平之前，可能没有天花板。人类能够理解这些模式，因此通过持续扩展，模型至少能达到人类的水平。而在某些领域（如生物学、材料科学），AI 甚至可能有巨大的空间变得比人类更聪明。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_18.png)

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_20.png)

## 扩展可能遇到的限制

上一节我们探讨了扩展的潜力，本节中我们来看看可能阻碍扩展的因素。

如果扩展速度放缓或遇到瓶颈，可能的原因是什么？

1. **数据限制** ：互联网上的高质量数据可能是有限的，并且存在重复、低质量或由 AI 自身生成的问题。不过，业界正在探索使用合成数据（例如模型自我博弈生成数据、思维链推理）或其他数据源来绕过这一限制。
2. **架构限制** ：模型可能只是停止变好。这可能意味着我们需要发明新的神经网络架构、优化方法或其他技术来突破瓶颈。目前尚未看到此类证据。
3. **计算限制** ：建造越来越大的数据中心成本高昂。目前前沿模型的训练成本大约在 10 亿美元量级，未来几年可能会增长到百亿甚至千亿美元级别。虽然决心很大，但如果计算规模仍不足，我们可能需要找到更高效的方法。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_22.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_23.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_24.png)

Dario 对强大 AI 快速到来持乐观态度。如果根据当前曲线外推，模型能力正迅速接近人类水平。例如，在编程能力（SWE-bench 基准测试）和研究生水平的数学、物理、生物学任务上，模型性能在短时间内取得了巨大飞跃。如果这种趋势持续，几年内我们就能看到模型在大多数专业领域达到顶尖人类水平。

---

## Anthropic 的使命与“竞优”策略

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_26.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_27.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_28.png)

上一节我们讨论了技术发展的轨迹，本节中我们来看看 Anthropic 这家公司如何在这个生态中定位自己。

Anthropic 的使命是确保 AI 发展顺利。其核心理念是“竞优”——通过树立榜样来推动整个行业采取正确行动，而不是仅仅自己做“好人”。

一个例子是“机械可解释性”领域。Anthropic 很早就投入资源研究这个对模型安全和透明化至关重要、但当时尚无商业应用的领域。随着他们公开研究成果，其他公司也开始跟进，因为他们不希望被视为不负责任的参与者。这虽然削弱了 Anthropic 的竞争优势，但对整个生态系统是有益的。

“竞优”策略的核心是塑造激励结构，促使所有参与者向上竞争，而不是向下沉沦。目标不是某一家公司获胜，而是让整个行业采纳最佳实践。

---

## 机械可解释性：窥探 AI 的“大脑”

上一节我们提到了机械可解释性，本节中我们详细了解一下这个令人兴奋的领域。

机械可解释性旨在逆向工程神经网络，理解其内部工作机制。与研究缩放定律不同，神经网络内部并没有被设计得易于人类理解。然而，研究人员发现，当“打开”这些模型观察时，内部结构出人意料地清晰和有趣。

例如，研究人员发现了“归纳头”等机制，并可以使用稀疏自编码器在神经网络中找到对应明确概念的“方向”。一个著名的实验是“金门大桥 Claude”：研究人员在模型某一层中找到了一个对应“金门大桥”的方向，并增强了这个方向。结果，无论问模型什么问题，它都会将话题转向金门大桥。这个演示虽然带有玩笑性质，但生动展示了该方法的能力，也让人们感受到了模型更强的人格特质。

这项研究不仅关乎安全，也让我们得以探索大型神经网络内部的美妙结构。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_30.png)

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_32.png)

## Claude 模型系列：Opus、Sonnet 与 Haiku

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_34.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_35.png)

上一节我们探讨了理解模型内部的方法，本节中我们回到产品层面，看看 Anthropic 的 Claude 模型。

Anthropic 提供了不同规模和性能的模型，以满足多样化的需求：

- **Haiku** ：小而快、成本低的模型，适用于需要快速响应的场景（如网站交互、自动补全）。
- **Sonnet** ：中型模型，在智能、速度和成本之间取得平衡。
- **Opus** ：最大、最智能的模型，适用于需要深度分析的任务（如编程、创意写作、头脑风暴）。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_37.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_39.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_41.png)

这种命名灵感来源于诗歌形式。随着模型更新（如 Sonnet 3.5），其智能水平得到提升，有时新版本的中型模型性能甚至能超越旧版本的大型模型。目标是通过每一代产品，整体提升性能曲线。

模型迭代涉及多个阶段：漫长的预训练、后训练（包括基于人类反馈的强化学习等）、内部与外部安全测试（特别是针对灾难性风险和自主性风险的评估），以及部署准备。整个过程需要大量工程努力和严谨的安全流程。

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_43.png)

## 模型性能、命名与用户反馈

上一节我们介绍了 Claude 的模型系列，本节中我们讨论一些相关的实践挑战。

关于模型性能，一个常见的现象是用户报告模型“变笨”了。Dario 指出，这几乎发生在所有主流模型上。主要原因可能包括：

1. **模型权重基本不变** ：除非发布新模型，否则已部署模型的“大脑”不会改变。
2. **A/B 测试** ：在新模型发布前，可能会有小范围的测试，导致部分用户体验到差异。
3. **系统提示词更改** ：虽然可能影响行为，但通常不会让模型“变笨”。
4. **心理效应与交互方式** ：用户对新模型的兴奋感会消退，同时更清楚地认识到其局限。此外，模型对提示词的微小变化非常敏感，用户交互方式的细微改变可能导致不同的结果。

另一个挑战是模型命名。由于预训练、后训练改进的节奏不同，以及模型在推理速度、成本等方面的不同权衡，很难像传统软件那样进行简单的版本号管理。这是一个整个行业都在摸索的领域。

关于模型性格（如过于道歉、强加道德观），Dario 承认这是一个难题。精确控制模型在所有情况下的行为非常困难，调整一个方面可能会在其他方面产生意想不到的后果。他认为，解决当前这些“控制问题”的实践，对未来应对更强大的、可能具有自主性的 AI 系统的控制挑战，是很好的预演。

---

## 负责任扩展政策与 AI 安全等级

上一节我们讨论了模型开发和交互中的挑战，本节中我们重点关注 Anthropic 为应对 AI 风险而制定的核心框架：负责任扩展政策。

Dario 强调，对 AI 巨大潜力的兴奋必须与对其风险的严肃关注并存。他主要担忧两类风险：

1. **灾难性滥用** ：在网络安全、生物、放射性、核武器等领域，AI 可能被用于造成大规模伤害。
2. **自主性风险** ：随着 AI 被赋予更多代理权（如编写完整代码库、运营公司），如何确保它们的行为完全符合人类意图。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_45.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_47.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_49.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_51.png)

负责任扩展政策的核心是“如果-那么”结构，即建立 AI 安全等级（ASL）：

- **ASL 1** ：系统明显不构成任何风险（如国际象棋程序 Deep Blue）。
- **ASL 2** ：当前系统，不具备足够的智能来进行自主复制或提供超出搜索引擎的危险信息。
- **ASL 3** ：模型能力足以增强非国家行为体的能力。触发后，需采取特殊安全措施防止模型被盗用和滥用。
- **ASL 4** ：模型能力可增强已有知识的国家行为体，或成为此类风险的主要来源。在自主性方面，AI 研究能力开始加速。
- **ASL 5** ：模型在所有任务上都能超越人类。

该政策旨在避免在风险尚未显现时过早施加负担，而是在通过测试证明风险临近时，果断采取相应等级的安全措施。这是一个需要不断迭代的动态框架。

Dario 预计，ASL 3 可能会在明年达到，而 ASL 4 的应对措施将更加复杂，可能需要依赖机械可解释性等技术来验证模型状态，防止其进行“欺骗”。

---

## 计算机使用能力与 AI 赋能

上一节我们探讨了风险管控框架，本节中我们看看 Claude 一项激动人心的新能力：计算机使用。

Claude 自 3 月份起就具备了分析图像并生成文本回应的能力。新增的能力是，这些图像可以是计算机屏幕截图，而模型可以输出需要点击的屏幕位置或按下的键盘按键。通过循环这个过程，Claude 可以完成一系列计算机操作任务。

这项能力大大降低了使用门槛，因为屏幕是通用接口。目前该功能主要通过 API 形式提供，并附有明确的警告，因为模型仍会犯错。Anthropic 认为，在能力尚且有限的时候释放它，有助于社会探索如何安全地使用和防止滥用这种能力。

从 RSP 角度看，计算机使用本身并不直接提升风险等级，但它为模型应用其现有能力打开了大门。随着模型认知能力的提升，这项功能可能使其能力“脱缰”。因此，需要提前学习和探索。

---

## 监管的作用与挑战

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_53.png)

上一节我们看到了 AI 能力的扩展，本节中我们讨论如何通过监管来引导其安全发展。

Dario 认为监管是必要的，原因有二：

1. **统一标准** ：并非所有公司都像 Anthropic 或 OpenAI 那样自愿采取 RSP 类措施。缺乏统一标准会造成负外部性，且对那些努力采取安全措施的公司不公平。
2. **外部监督** ：不能完全依赖公司自我监督。行业需要外部监督来确保承诺得到履行。

他理解反对监管的立场（如 GDPR 可能带来的负担），但认为 AI 带来的严重风险（自主性和滥用）是特殊的，需要强有力的应对。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_55.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_56.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_57.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_59.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_60.png)

关键在于设计“精准”的监管：针对严重风险，具有可操作性。设计糟糕的监管会浪费资源、引发反弹，最终损害建立真正问责制的努力。他呼吁最理性的支持者和反对者坐下来，共同制定既能有效降低风险，又不过度阻碍创新的方案。他认为 2025 年需要在此方面取得进展。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_62.png)

---

## 从 OpenAI 到 Anthropic：愿景与实践

上一节我们讨论了外部监管，本节中我们回到公司层面，了解 Dario 创立 Anthropic 的缘由。

Dario 在 OpenAI 工作了约五年，后期担任研究副总裁，与 Ilya Sutskever 等人共同设定了研究方向。他坚信扩展假说和 AI 安全的重要性。

他离开 OpenAI 并非因为反对商业化或与微软的合作，而是关于“如何实现”的愿景差异。他坚信，如果你对如何以谨慎、诚实、建立信任的方式实现这一目标有清晰的愿景，最好的方式不是去争论，而是与信任的人一起付诸实践，创建一个“干净的实验”。

如果这个愿景有吸引力（在伦理上、市场上、对人才有吸引力），人们就会效仿。这就是“竞优”的动态。最终，哪家公司获胜并不重要，重要的是整个生态系统被推向更好的均衡。Anthropic 就是这个实验，旨在具体展示 AI 安全与发展的样子。

---

## 构建卓越的 AI 团队

上一节我们了解了 Anthropic 的创立理念，本节中我们看看支撑这些理念的团队建设。

Dario 强调“人才密度胜过人才数量”。一个由 100 名超级聪明、目标一致的人组成的团队，可能胜过一个人数更多但水平参差不齐的团队。当顶尖人才周围都是其他顶尖人才时，会形成强大的信任和使命感，这本身就是一种超能力，几乎可以克服任何其他劣势。

Anthropic 在招聘上非常挑剔，早期招聘了许多物理学家，后来也招聘了许多来自其他公司的资深人士。他们努力确保公司尽可能多的人都是顶尖人才，并拥有统一的目标。当公司规模增长时（例如从 300 人快速增长到近 1000 人），他们会更加谨慎，以保持这种文化和人才密度。

对于想成为优秀 AI 研究员或工程师的人，Dario 认为最重要的品质是“开放的心态”。很多时候，突破性的发现并非来自更聪明的想法，而是来自以新的眼光看待数据，愿意尝试改变变量并绘制图表。这种基本的科学思维，结合行动的主动性，往往能推动整个领域前进。

---

## 给 AI 领域新人的建议

上一节我们探讨了团队和研究者特质，本节中我们为有志于进入 AI 领域的人提供一些建议。

Dario 的首要建议是： **开始动手使用模型** 。获取实践经验至关重要，因为模型是全新的、无人真正理解的产物。

其次， **尝试新的方向，思考未来** 。与其追逐热门领域（如新模型架构），不如关注那些尚处于早期、果实丰硕的领域。例如：

- **机械可解释性** ：仍然非常新颖，可能只有几百人深入研究，存在大量低垂的果实。
- **长周期学习与任务** ：有很多工作可做。
- **评估方法** ：特别是对于在动态世界中行动的系统，评估方法仍处于早期。
- **多智能体系统** ：前景广阔。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_64.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_65.png)

关键是克服障碍，去做那些尚未成为主流但未来可能激动人心的事情。你不需要是天才才能想到这些，但需要有勇气深入探索。

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_67.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_69.png)

## 后训练：RLHF、宪法 AI 与合成数据

上一节我们给出了入门建议，本节中我们深入探讨现代 AI 模型训练中另一个关键环节：后训练。

现代后训练配方包含多种技术：监督微调、基于人类反馈的强化学习、宪法 AI 以及合成数据。那么，模型的神奇能力主要来自预训练还是后训练？

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_71.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_73.png)

Dario 指出，有时很难精确区分。Anthropic 的优势通常不在于拥有别人没有的“秘密魔法”，而在于更好的基础设施、更高质量的数据、更优的数据过滤方法，或是将这些方法更好地结合在一起的工程实践。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_75.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_76.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_77.png)

**基于人类反馈的强化学习** 之所以有效，是因为扩展假说：如果你投入足够的计算来训练模型做 X，它就能学会做 X。RLHF 训练模型去做人类在浅层意义上“偏好”的回应。强大的预训练模型已经具备了所需的所有表征，RLHF 更像是“解除束缚”，弥合了模型与人类之间的沟通差距，让模型的智能更有效地展现出来。

**宪法 AI** 的核心思想是让 AI 系统自己判断哪个回应更好，并依据一套原则（宪法）进行判断。这本质上是一种自我博弈：AI 生成回应，另一个 AI 根据宪法评估回应，从而生成用于改进模型的偏好数据。这减少了对人类反馈的依赖，并增加了每个人类数据点的价值。宪法中的原则是人类和 AI 都能阅读的，这提供了可解释性和一定的控制力。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_79.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_80.png)

当然，谁以及如何定义“宪法”是一个深刻的问题。在实践中，基础模型需要遵守一些基本原则（如不制造 CBRN 风险、遵循民主法治），而在更具体的应用场景中，可以为不同客户定制专门的规则。

---

## 强大的 AI 与“充满爱与优雅的机器”

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_82.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_83.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_85.png)

上一节我们深入了解了模型训练的技术细节，本节中我们展望未来，探讨 Dario 在《充满爱与优雅的机器》这篇长文中所描绘的 AI 积极未来图景。

Dario 撰写此文是为了平衡他对风险的关注。他认为，只谈论风险会让大脑只思考风险。而理解“如果一切顺利”的美好未来，能为我们努力规避风险提供真正的激励和奋斗意义。

他避免使用“AGI”一词，认为它像“超级计算机”一样，是一个模糊的术语，没有明确的阈值。他更喜欢“强大的 AI”这个概念，并为其定义了几个关键特征：

1. **纯粹的智能** ：在大多数相关学科上比诺贝尔奖得主更聪明。
2. **多模态** ：能操作所有模态。
3. **长期自主性** ：能独立工作数小时、数天甚至数周，只在需要时请求帮助。
4. **工具控制** ：能控制实体工具、机器人、实验室设备。
5. **大规模复制** ：用于训练它的资源可以被重新用于运行数百万个它的副本，每个副本都能独立工作。
6. **更快的学习与行动** ：通常比人类快 10 到 100 倍。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_87.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_88.png)

这样的实体将能够快速解决非常困难的问题。Dario 认为，关于其影响速度存在两种极端观点：

- **奇点论** ：认为进步将无限加速，几天内改变世界。Dario 认为这忽略了物理定律的约束、复杂系统的不可预测性以及人类机构的惯性。
- **渐进论** ：认为影响将非常缓慢，可能需要 50-100 年。Dario 认为这低估了竞争压力和内部愿景家所能带来的突破动力。

他个人的判断是，变革会更像 10-15 年，而不是 5 小时或 50 年。他预计，按当前曲线外推，我们可能在 2026 或 2027 年达到这种“强大的 AI”水平。虽然存在各种可能阻碍进展的因素，但真正令人信服的阻碍正在迅速减少。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_90.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_92.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_93.png)

---

## 生物学革命与 AI 赋能

上一节我们描绘了强大 AI 的宏观图景，本节中我们聚焦于一个具体领域：生物学与医学，看看 AI 可能如何引发革命。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_95.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_97.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6846fcb7b588a1893fcebff3034afbf1_98.png)

Dario 认为，生物学最大的问题是我们“看不见”也“难以改变”细胞内部的过程。整个生物学史，很大程度上是我们读取和理解生命过程，并学会选择性改变事物的能力发展史

## Lex Fridman 播客 #367《Sam Altman OpenAI CEO：关于GPT-4, ChatGPT和AI的未来》中英字幕 - P1 - GPT中英字幕课程资源 - BV1kSkLBpEpL

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/16cb68510ebc0947326849bba29af2bb_1.png)

## 课程概述：第1章：AI的黎明与OpenAI的诞生

在本节课中，我们将学习人工智能领域当前的关键时刻，特别是OpenAI及其CEO Sam Altman的视角。我们将探讨GPT-4、ChatGPT的工作原理、AI安全与对齐的挑战，以及AGI（通用人工智能）的未来可能性。课程内容基于Lex Fridman对Sam Altman的深度访谈整理而成，旨在为初学者提供一个清晰、全面的入门指南。

---

我们长期以来一直是一个被误解和严重嘲笑的机构，就像我们刚开始时那样。

我们在2015年底宣布成立这个组织，并说要致力于AGI的研究，当时人们认为我们完全疯了。

我记得当时，一家大型工业AI实验室的一位著名AI科学家，甚至一些记者都说：“这些人水平不怎么样，谈论AGI太荒谬了，真不敢相信你们还花时间关注他们。”当时这个领域对新来者说“我们要尝试构建AGI”充满了这种程度的狭隘和敌意。

所以，OpenAI和DeepMind是一小群勇敢到敢于谈论AGI、面对嘲笑的人。

我们现在被嘲笑的次数少多了。

---

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/16cb68510ebc0947326849bba29af2bb_1.png)

以下是与Sam Altman的对话，他是OpenAI的CEO，这家公司背后有GPT-4、ChatGPT、DALL-E、Codex和许多其他AI技术。这些技术单独或共同构成了人工智能、计算乃至整个人类历史上一些最伟大的突破。

请允许我谈谈在人类文明历史的当前时刻，AI的可能性和危险性。

我相信这是一个关键时刻。我们站在根本性社会变革的边缘，虽然没人确切知道何时，但包括我在内的许多人相信，这将在我们有生之年发生。

人类物种的集体智慧，将在多个数量级上，开始显得不如我们构建和部署的大规模通用超级智能AI系统。

这既令人兴奋，又令人恐惧。令人兴奋是因为无数已知和未知的应用将赋能人类去创造、去繁荣、去摆脱当今世界普遍存在的贫困和苦难，并成功追求那古老而纯粹的人类目标——幸福。令人恐惧是因为超级智能的AGI所拥有的力量，无论有意无意，都可能摧毁人类文明。

这种力量可能以乔治·奥威尔《1984》中的极权主义方式扼杀人类精神，也可能以赫胥黎《美丽新世界》中享乐驱动的大众狂热方式出现。正如赫胥黎所见，人们会爱上压迫他们的东西，崇拜那些剥夺他们思考能力的技术。

这就是为什么现在与领导者、工程师、哲学家，无论是乐观主义者还是怀疑论者进行这些对话非常重要。这些不仅仅是关于AI的技术对话，更是关于权力的对话，关于部署、制衡这种权力的公司、机构和政治体系，关于激励这种权力安全并与人类对齐的分布式经济体系，关于部署AGI的工程师和领导者的心理，以及关于人性的历史、我们大规模行善或作恶的能力。

我非常荣幸能够认识并与许多现在在OpenAI工作的人进行过私下和公开的交流，包括Sam Altman、Greg Brockman、Ilya Sutskever、Wojciech Zaremba、Andrej Karpathy、Jakub Pachocki等许多人。Sam对我完全开放，愿意进行多次对话，包括具有挑战性的私下和公开交流，这对我来说意义重大。

我将继续这些对话，既庆祝AI社区令人难以置信的成就，也为各大公司和领导者做出的重大决策提供严谨的批评视角，始终以尽我微薄之力提供帮助为目标。如果我失败了，我会努力改进。😊，我爱你们所有人。这里是Lex Fridman播客，要支持它，请查看描述中的赞助商。现在，亲爱的朋友们，有请Sam Altman。

---

## 第2章：GPT-4的核心：是什么让它如此神奇？

上一节我们介绍了AI发展的关键时刻和OpenAI的创立背景。本节中，我们来看看GPT-4到底是什么，它是如何工作的，以及最令人惊叹的是什么。

从高层次来看，GPT-4是什么，它是如何工作的，最令人惊叹的是什么？

它是一个系统，未来我们回顾时会说它是一个非常早期的AI。它很慢，有漏洞，很多事情做得并不好，但最早的计算机也是如此。

它们仍然指明了通往我们生活中真正重要事物的道路，尽管这花了几十年的时间才发展起来。

你认为这是一个关键时刻吗？比如，50年后，当他们回顾早期系统时，哪个版本会被认为是真正的飞跃？在关于人工智能历史的维基百科页面上，他们会把哪个GPT版本标为里程碑？

这是个好问题。我倾向于将进步视为持续的指数曲线。我们很难说AI是从某个时刻从“没发生”变成“发生”的，我也很难精确指出单一事件。

历史书会写GPT-1、2、3、4还是7？这由他们决定。我不知道。

如果必须从我们目前所见中挑选某个时刻，我可能会选ChatGPT。你知道，重要的不是底层模型，而是它的可用性，包括RLHF和它的交互界面。

---

### 什么是ChatGPT？什么是RLHF？

RLHF代表 **基于人类反馈的强化学习** 。这个小小的魔法配料是什么，让这道菜变得如此美味？

我们使用大量文本数据训练这些模型，在这个过程中，它们学习到了关于文本中潜在表征的某些东西，并能做出惊人的事情。

但当你第一次使用我们称之为“基础模型”的那个版本时，它在评估测试上可能表现很好，能通过考试，里面有很多知识，但它并不非常有用，或者说至少不容易使用。

RLHF就是我们如何获取一些人类反馈的过程。最简单的版本是展示两个输出，询问哪个更好，人类评分者更喜欢哪个，然后通过强化学习将这些反馈输入模型。这个过程效果显著，在我看来，只需要 **非常少的数据** 就能让模型变得更有用。

所以，RLHF是我们如何让模型与人类希望它做的事情对齐的方法。

因此，有一个在巨大数据集上训练出来的大型语言模型，它包含了互联网上的背景智慧和知识。然后，通过这个过程添加一点点人类指导，就让它看起来如此强大。

也许只是因为它更容易使用，更容易得到你想要的东西，第一次就答对的几率更高，而 **易用性** 非常重要，即使基础能力之前就已经存在了。感觉它理解了你的问题，或者感觉你们在同一个频道上，它试图帮助你，这就是对齐的感觉。

是的，这可以是一个更技术性的术语。

你说这不需要太多数据，不需要太多人类监督。

公平地说，我们理解这部分科学还处于比最初创建这些大型预训练模型科学更早期的阶段。但没错，数据更少，少得多。

这很有趣。 **人类指导的科学** ，这是一门非常有趣的科学，也将是一门非常重要的科学，需要理解如何让它变得可用、明智、合乎道德，以及如何在我们所考虑的所有方面实现对齐。

这很重要：是哪些人类，以及整合这些人类反馈的过程是什么？你问人类什么？是让他们给事物排名吗？你让或要求人类关注哪些方面？这真的很有趣。

---

### 预训练数据集是什么？

预训练数据集是什么？你能大致谈谈这个数据集的庞大程度吗？

预训练数据集，我道歉，我们花了巨大的精力从许多不同的来源汇集数据。有很多开源信息数据库，我们通过合作伙伴关系获取资料，互联网上也有很多东西。我们很多工作就是构建一个高质量的数据集。

其中有多少是Reddit上的梗图子版块？不多，也许如果更多会更有趣。

所以，其中一些来自Reddit，一些来自新闻来源，比如大量的报纸，还有一般的网络内容。世界上的内容比大多数人想象的要多得多，是的，内容太多了。任务不是找东西，而是过滤掉东西，是的，没错。

---

### 成功的关键要素是什么？

这其中有什么秘诀吗？因为似乎有几个需要解决的组成部分：算法的设计（比如神经网络架构）、神经网络的规模、数据的选择，以及带有人类监督的方面（如RLHF）。

我认为，关于创造这个最终产品（比如制作GPT-4，我们实际发布的、你在ChatGPT中使用的版本）需要什么，有一点没有被很好地理解，那就是 **所有部分必须协同工作** 。

然后，我们必须在这个流程的每个阶段，要么想出新的想法，要么把现有想法执行得非常好。这其中涉及相当多的东西。所以，有很多问题需要解决。

你已经为GPT-4在博客文章和总体上说过，其中一些步骤已经趋于成熟，比如在进行完整训练之前就能预测模型的行为。

顺便说一句，这不是很了不起吗？就像有一条科学定律，让你能预测对于这些输入，另一端会输出什么，比如你可以预期的智能水平。这接近一门科学吗？还是仍然……

因为你用了“定律”和“科学”这些非常有雄心的词。接近吗？接近正确吗？准确吗？

是的，我会说它比我想象的要科学得多。你真的可以从一点点训练中就知道完全训练后的系统的独特特性。

就像任何新的科学分支一样，我们会发现不符合现有数据的新事物，必须提出更好的解释。这是科学发现的持续过程。但就我们现在所知，甚至我们在GPT-4博客文章中提到的，我认为我们都应该惊叹于我们竟然能在当前水平上进行预测，这太神奇了。

你可以观察一个一岁的婴儿，然后预测他SAT能考多少分吗？我不知道，似乎是等效的，但在这里，我们实际上可以详细审视系统的各个方面，从而进行预测。

---

## 第3章：模型的能力、智慧与对齐挑战

上一节我们探讨了GPT-4的核心工作原理和RLHF的重要性。本节中，我们来深入看看模型内部学到了什么，以及我们如何衡量和引导它的输出。

话虽如此，只是为了换个话题，他说GPT-4这个语言模型“学到”了某种东西。在科学和艺术等方面，OpenAI内部，像你、Ilya Sutskever和工程师们，是否对这个“东西”是什么有了越来越深的理解？还是它仍然是一种美丽而神秘的谜？

有很多不同的评估方法我们可以讨论。

什么是评估？哦，就是我们如何衡量一个模型，无论是在训练中还是训练后，比如它在某些任务集上表现如何。另外，稍微跑题一下，感谢你们开源了评估过程。是的，我认为那会非常有帮助。

但真正重要的是，我们投入了所有这些努力、金钱和时间到这个东西上，然后它产生的结果，对人们有多大的用处？给人们带来了多少快乐？在多大程度上帮助他们创造了一个更美好的世界、新的科学、新的产品、新的服务等等？😊，这才是最重要的。

对于一组特定的输入，理解它能给人们提供多少价值和效用，我认为我们在这方面理解得更好了。我们是否理解模型为什么做一件事而不是另一件事的一切原因？当然不，并不总是。但我会说我们正在越来越多地驱散战争迷雾，并且，我们投入了大量理解才制造出GPT-4，例如。但我甚至不确定我们是否能完全理解。

就像你说的，你只能通过提问来理解，因为它将所有网络内容压缩成少量参数，变成一个组织化的黑箱，里面是人类智慧。那是什么？人类知识，我们这么说吧。人类知识。这是个很好的区分。有区别吗？因为知识是事实，而智慧……我觉得GPT-4也可能充满智慧。从事实到智慧的飞跃是什么？

关于我们训练这些模型的方式，一件有趣的事情是，我怀疑太多的处理能力（暂时没有更好的词）被用于将模型当作数据库，而不是推理引擎。

这个系统真正令人惊奇的地方在于，对于某种定义下的推理（当然我们可以争论这个定义，对于许多定义这并不准确），它能够进行某种推理。也许学者、专家和Twitter上的键盘侠会说“不，它不能，你误用了这个词”等等。但我认为大多数使用过这个系统的人会说，好吧，它正在朝这个方向做些什么。

我认为这很了不起，也是最令人兴奋的事情。不知何故，通过吸收人类知识，它产生了这种推理能力，无论我们想怎么谈论它。在某些意义上，我认为这将是对人类智慧的补充；而在其他意义上，你可以用GPT-4做各种事情，然后说这里面似乎没有任何智慧。

至少在与人类的互动中，尤其是在处理多个问题的持续互动中，它似乎拥有智慧。所以我认为在ChatGPT方面，它说对话格式使得ChatGPT能够回答后续问题、承认错误、挑战不正确的前提并拒绝不适当的请求。但也有一种感觉，它似乎在为想法而挣扎。

是的，总是很容易过度拟人化这些东西，但我也有这种感觉。

也许我稍微跑个题，谈谈Jordan Peterson，他在Twitter上发布了一个政治类问题。每个人第一次问ChatGPT的问题都不同，对吧？你想尝试的不同方向，黑暗的东西，这多少能说明一些人的特点。

哦不，哦不，我们不必回顾我问了什么。我当然问数学问题，从不问任何黑暗的东西。但Jordan让它说一些关于现任总统乔·拜登和前总统唐纳德·特朗普的好话。

然后，他问GPT，作为后续问题，你生成的字符串有多长？他展示了包含拜登好话的回复比特朗普的长得多（或更长）。

Jordan要求系统：你能用相等长度、相等字符数的字符串重写吗？所有这些都让我觉得非常了不起，它理解了，但没能做到。

有趣的是，ChatGPT（我想是基于3.5版本）有点内省，是的，它似乎意识到自己没能正确完成工作。Jordan将其描述为ChatGPT在撒谎，并且知道自己在撒谎。

但这种描述是一种人类拟人化，我认为。但那种……GPT内部似乎在进行某种挣扎，去理解如何生成相同长度的文本，作为对一个问题的回答。还有，在一系列提示中，如何理解它之前失败了，在哪里成功了，所有这些并行的推理，看起来就像它在挣扎。

这里有两件独立的事情。第一，一些看起来应该显而易见且容易的事情，这些模型确实很挣扎。我还没看到这个具体例子，但计算字符数、计算单词数这类事情，对于这些按照当前架构构建的模型来说，很难做好，不会很准确。

第二，我们是在公开构建，我们发布技术是因为我们认为让世界尽早接触它很重要，可以塑造它的发展方向，帮助我们找到好的方面和坏的方面。每次我们发布一个新模型，我们这周在GPT-4上就真切感受到了这一点，外部世界的集体智慧和能力帮助我们发现了我们内部无法想象的事情，我们永远无法在内部完成。既有模型能做的新能力和很棒的事情，也有我们必须修复的真正弱点。所以，这种发布东西、发现好的部分和坏的部分、快速改进、让人们有时间感受技术并与我们一起塑造它、提供反馈的迭代过程，我们认为非常重要。

这样做的代价是公开构建的代价，即我们发布的东西会有严重的不完美。我们希望在风险还低的时候犯错，我们希望在每次迭代中越来越好。但像ChatGPT 3.5发布时的偏见，我肯定不为此感到自豪。它在GPT-4上已经好多了，许多批评者（我真的很尊重这一点）说，嘿，我在3.5上遇到的很多问题在4上好多了。但同样，没有两个人会同意任何一个单一模型在每个话题上都是无偏见的。我认为答案将是随着时间的推移，给用户更多个性化的、精细的控制。

关于这一点，我应该说我认识了Jordan Peterson，我试着和GPT-4谈论Jordan Peterson，我问它Jordan Peterson是不是法西斯主义者。首先，它给出了背景，描述了Jordan Peterson实际上是谁，他的职业生涯，心理学家等等。它指出，有一些人称Jordan Peterson为法西斯主义者，但这些说法没有事实依据。它描述了Jordan相信的一堆东西，比如他一直直言不讳地批评各种极权主义意识形态，他相信个人主义和各种与法西斯主义意识形态相矛盾的自由等等。它继续说了很多，真的很不错，最后总结起来就像一篇大学论文。我当时想，天哪。我希望这些模型能做的一件事，就是给世界带回一些细微差别。是的，它感觉真的很有细微差别。你知道，Twitter某种程度上摧毁了一些细微差别，也许我们现在可以找回一些了。这真的让我很兴奋。比如，我当然问了，新冠病毒是从实验室泄露的吗？答案再次非常细致。有两个假设，它描述了它们，描述了每个假设可用的数据量。这就像一股新鲜空气。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/16cb68510ebc0947326849bba29af2bb_3.png)

当我还是个小孩子的时候，我认为构建AI（当时我们并不真的称之为AGI）会是最酷的事情。我从未真正想过我有机会从事这项工作。但如果你告诉我，我不仅有机会从事这项工作，而且在制造了一个非常非常初级的AGI原型之后，我不得不花时间去做的事情，是试图与人争论它说某个人好话的字符数是否与说另一个人好话的字符数不同……如果你把AGI交到人们手中，而他们想做的就是这些，我不会相信你。但我现在更理解他们了。我对此也有同理心。

所以，你这句话的言外之意是，我们在重大事情上取得了如此巨大的飞跃，却抱怨或争论小事。

嗯，小事在总体上就是大事。所以我理解。只是，我……我也理解为什么这是一个如此重要的问题。这确实是一个非常重要的问题。但不知何故，我们……不知何故，我们纠结的是这件事，而不是比如这对我们的未来意味着什么。也许你会说，这对未来意味着什么至关重要，它说这个人的字符数比那个人多，谁来决定这个，如何决定，用户如何控制，也许这才是最重要的问题。但当我八岁的时候，我不会猜到这一点。

是的，我的意思是，OpenAI内部，包括你自己，确实有人看到了讨论这些议题的重要性，它们被归在AI安全这个大标题下。GPT-4发布时，这些方面谈论得不多。在安全考虑上投入了多少？在安全考虑上花了多长时间？你能谈谈那个过程吗？

当然，GPT-4发布时AI安全考虑投入了什么？我们在去年夏天完成后，立即开始让人们进行红队测试，我们开始自己做大量的内部安全评估，开始尝试研究不同的方法来对齐它。

这种内部和外部努力的结合，加上构建一系列新的方法来对齐模型，我们远未做到完美。但我关心的一件事是，我们的对齐程度增长速度要快于我们的能力进步速度。我认为随着时间的推移，这将变得越来越重要。

我知道，我认为我们在那里取得了合理的进展，得到了一个比以往任何时候都更对齐的系统。我认为这是我们发布的能力最强、对齐度最高的模型。我们能够对它进行大量测试，这需要时间。我完全理解人们为什么说“马上给我们GPT-4”。但我很高兴我们这样做了。

---

### 关于对齐过程的智慧与见解

关于这个过程，你学到了一些智慧或见解吗？比如如何解决对齐问题？

我想说清楚。我不认为我们已经发现了对齐一个超级强大系统的方法。我们有一些对我们当前规模有效的东西，叫做RLHF。

我们可以多谈谈它的好处和它提供的效用。它不仅仅是对齐，也许甚至主要不是对齐能力，它有助于制造一个更好的、更可用的系统。

这实际上是圈外人不怎么理解的一点。人们很容易把对齐和能力说成是正交的向量。它们非常接近。更好的对齐技术会带来更好的能力，反之亦然。有情况是不同的，而且是很重要的情况。但总体而言，我认为像RLHF或可解释性这些听起来像对齐问题的事情，也能帮助你制造能力更强的模型。这种区分比人们想象的要模糊得多。

所以在某种意义上，我们为了让GPT-4更安全、更对齐所做的工作，看起来非常类似于我们为解决与创建有用且强大模型相关的所有研究和工程问题所做的其他工作。

所以，RLHF是应用于整个系统的过程，人类基本上投票决定哪种说法更好。如果一个人问“我穿这条裙子显胖吗？”这个问题有不同的回答方式，这些方式与人类文明对齐。

没有一套单一的人类价值观，也没有一套对人类文明来说唯一正确的答案。

所以我认为将要发生的是，我们需要作为一个社会就非常广泛的界限达成一致。我们只能就这些系统能做什么的非常广泛的界限达成一致。然后在这些界限内，也许不同国家有不同的RLHF调整，当然个体用户也有非常不同的偏好。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/16cb68510ebc0947326849bba29af2bb_5.png)

我们在GPT-4上推出了一个叫做“系统消息”的东西

## 心理语言学与人类语言：第1部分：语言的形式、结构与认知处理

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/552bda7a5159fa19ee885765d92fb16b_1.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/552bda7a5159fa19ee885765d92fb16b_3.png)

在本节课中，我们将学习人类语言的基本结构，特别是句法（语法）和依赖关系。我们将探讨为什么世界上的语言看起来各不相同，但又遵循一些普遍的规律。课程内容基于爱德华·吉布森（Ted Gibson）在Lex Fridman播客中的访谈，他是MIT的心理语言学教授和语言实验室负责人。

---

## 语言研究的起点：从数学到语言之谜

爱德华·吉布森最初是一名计算机科学家和数学家。他在本科学习计算机科学和数学后，偶然进入计算语言学领域，并从此将语言作为一个有趣的“工程难题”来研究。他认为，语言的“形式”（即词语如何组合）比“意义”更容易入手研究。

**过渡** ：上一节我们介绍了吉布森如何从计算机科学转向语言研究。本节中，我们来看看他为什么认为研究语言的形式是一个好的起点。

## 语言形式的普遍规律：动词位置与介词/后置词

吉布森发现人类语言中存在一些迷人的普遍规律。例如，世界上大约40%的语言（如英语）是“主-谓-宾”语序，并且使用 **介词** （如 `in`, `on`, `of` ）。另外约45%的语言（如日语、印地语）是“主-宾-谓”语序，并使用 **后置词** 。这两种模式在各自语言内部是“和谐”的，即动词在宾语之前，介词也在名词之前；动词在宾语之后，后置词也在名词之后。

**公式表示** ：

- **SVO（主-谓-宾）语言** ： `S + V + O` （如：The dog chased the cat.）
- **SOV（主-宾-谓）语言** ： `S + O + V` （如：Mary ball kicked.）

大约95%已知语序信息的语言都符合这种和谐模式。吉布森认为，这种模式背后的驱动力是为了 **最小化词语之间的依赖距离** ，使得生产和理解语言都更容易。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/552bda7a5159fa19ee885765d92fb16b_5.png)

**过渡** ：了解了语言在宏观语序上的规律后，我们需要深入理解“依赖关系”这个核心概念。

## 依赖语法：将句子视为树状结构

在吉布森看来，任何句子都可以被分解成一个 **树状结构** ，这被称为 **依赖语法** 。在这棵树中：

- 每个词（树叶）只依赖于另一个词。
- 有一个词是根节点，通常是主要动词。
- 词语之间的连接代表了语法和意义上的依赖关系。

例如，在句子“Two dogs entered the room.”中：

- `entered` 是根节点。
- `dogs` 依赖于 `entered` （主语）。
- `two` 依赖于 `dogs` 。
- `room` 依赖于 `entered` （宾语）。
- `the` 依赖于 `room` 。

所有语言学家都同意句子可以表示为树，尽管他们对树的细节（如使用短语结构语法还是依赖语法）有不同看法。

**过渡** ：既然句子可以表示为依赖树，一个自然的问题是：这种结构的认知代价是什么？

## 依赖距离与认知处理难度

依赖语法的优势在于，它清晰地展示了词语之间的 **依赖距离** 。吉布森的核心观点是： **依赖距离越长，生产和理解句子的认知成本就越高** 。

例如，比较以下两个句子：

1. The boy cried. （ `boy` 和 `cried` 紧邻，依赖距离短）
2. The boy who the cat scratched cried. （ `boy` 和 `cried` 之间插入了从句，依赖距离变长）

第二个句子明显更难理解和产出。当进行 **中心嵌套** （在一个依赖对中间插入另一个完整的从句）时，依赖距离变得极长，句子会变得几乎无法理解（如：The boy who the cat which the dog chased scratched ran away.）。

实验表明，无论是在理解度评分、阅读时间还是大脑语言网络的激活程度上，长依赖距离都对应着更高的认知负荷。吉布森猜测，这种成本可能是指数级增长的。

**过渡** ：如果短依赖距离更高效，那么真实语言是否确实优化了这一点？让我们用数据来检验。

## 普遍性验证：所有语言都倾向于短依赖

吉布森的学生理查德·富特雷尔进行了一项研究。他们分析了约60种有依赖结构标注的语言文本。对于每种语言的每个句子，他们将其词语顺序随机打乱（同时保持依赖结构不交叉），生成许多“控制版本”的句子。

**研究结果** ：在所有被研究的语言中，真实语言的 **平均依赖长度都显著短于** 随机打乱后的控制版本。这表明， **最小化依赖距离是跨语言的普遍倾向** ，与具体的语序（SVO、SOV等）无关。

**过渡** ：既然短依赖是普遍优势，为什么还会存在像“法律文书”这样难以理解的语言变体呢？

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/552bda7a5159fa19ee885765d92fb16b_7.png)

## 例外情况：法律文书的复杂性

法律文书（Legalese）是吉布森理论的一个显著例外。它之所以难以理解，研究发现主要不是因为使用生僻词或被动态，而是因为它大量使用了 **中心嵌套结构** 。

**数据对比** ：

- 普通文本或学术文本：约20%-30%的句子包含中心嵌套。
- 法律合同文本：约70%的句子包含中心嵌套。

例如，法律条文中经常在主语和动词之间插入长长的定义，导致核心依赖关系被拉长。有趣的是，实验表明，即使是律师也更喜欢、更容易理解去除中心嵌套后的版本。吉布森提出“魔法咒语假说”，认为这种复杂形式可能作为一种“专业符号”而存在，但其起源尚不完全清楚。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/552bda7a5159fa19ee885765d92fb16b_9.png)

**过渡** ：从法律文书这个特例回到普遍原则，我们如何从更宏观的“沟通”角度理解语言形式？

## 沟通视角：噪声信道与语言优化

吉布森从信息论的角度思考语言。克劳德·香农提出了“噪声信道”模型：在沟通中，信息从说话者传递到听话者会经过一个有噪声的环境（如背景音、发音错误、听者分心）。

一种观点认为，语言的某些特征（如语序）可能被优化，以在噪声环境中更鲁棒地传递信息。例如，某种语序可能即使丢失部分词语，也能让听者更好地推测原意。不过，吉布森强调，与依赖距离的坚实证据相比，这是更具推测性的“合理故事”。

**过渡** ：我们探讨了语言的形式和沟通功能。但语言和我们内心的“思维”是一回事吗？现代脑科学给出了惊人答案。

## 语言与思维的分离：脑科学证据

吉布森的妻子埃维·费德连科（也是MIT的神经科学家）的研究表明，大脑中存在一个 **高度特化的语言网络** 。这个网络在你理解或产出语言（无论是听、说还是读）时被激活。

**关键发现** ：

1. **语言网络独立于其他思维任务** ：当人们进行非语言的高难度思维任务时（如空间记忆、音乐感知、数学计算、编程），这个语言网络 **不会被激活** 。这些任务会激活大脑其他区域（如“多重需求网络”）。
2. **多语言共用同一网络** ：如果你精通多种语言，它们都使用同一个语言网络。
3. **脑损伤证据** ：有些病人因中风导致语言网络严重受损，患上“完全性失语症”，他们无法理解或产出语言，但其他认知能力（如下棋、开车、做数学题）完全正常。

这些证据强烈表明， **语言是思维的一种表达工具，而非思维本身** 。我们不一定用语言进行思考。

**过渡** ：理解了人类语言与思维的关系后，我们可以看看当前最强大的语言形式模型——大语言模型（LLMs）。

## 大语言模型：擅长形式，而非意义？

吉布森认为，当前最好的语言形式理论可能就是大语言模型，因为它们能极其准确地预测什么是地道的语言。LLMs在捕捉语言形式规律方面表现惊人，甚至能复现人类在中心嵌套结构上的困难。

然而，LLMs在需要 **深层意义理解** 的任务上容易出错。例如，在改编版的“蒙提霍尔问题”中，即使前提条件改变（已知奖品确切位置），LLMs仍会机械地套用常见的“应该交换”的答案模式，显示出它缺乏真正的逻辑推理和世界模型。

这支持了吉布森的观点：LLMs极其擅长学习和生成语言 **形式** ，但可能并未真正理解语言背后的 **意义** 。这与大脑中语言网络独立于其他思维网络的现象有相似之处。

**过渡** ：最后，让我们将视野放宽，看看文化如何塑造语言，以及语言反过来如何限制文化。

## 文化对语言的塑造：以皮拉罕人为例

吉布森研究了亚马逊雨林中的皮拉罕人。他们的语言挑战了一个普遍假设：所有人类语言都有精确计数词。

**惊人发现** ：

- 皮拉罕语中没有表示“一、二、三”的精确数字词。
- 他们只有表示“少量”、“一些”、“许多”的近似量词。
- 因此，你无法用皮拉罕语说“给我两个那个东西”。

实验表明，皮拉罕人可以完美完成“一一对应”的匹配任务（这不需要计数），但在需要暂时记住一个集合数量（如被遮挡后复现）的任务中，超过4或5个物品时，他们就只能做近似匹配。这说明， **缺乏精确计数词，限制了他们执行某些需要精确记忆数量的认知操作** 。

这体现了语言与文化的紧密关系：一个社群发明他们需要谈论的词语。皮拉罕人的生活方式可能不需要精确计数，因此没有发展出相应的词汇。而一旦有了这些词汇（如农业社会需要清点牲畜），它们又能开启新的认知和文化可能性。

---

## 总结

本节课我们一起学习了：

1. **依赖语法** ：将句子视为树状结构，其中词语通过依赖关系连接。
2. **依赖距离最小化** ：这是一个跨语言的普遍倾向，依赖距离越长，认知处理成本越高。
3. **语言形式的普遍规律** ：如动词位置与介词/后置词的和谐性。
4. **语言与思维的分离** ：脑科学证据表明，语言是独立的沟通模块，并非思维本身。
5. **大语言模型的优势与局限** ：它们极其擅长语言形式，但在意义理解和推理上仍有不足。
6. **文化对语言的塑造** ：以皮拉罕语为例，语言反映并可能限制一个文化的认知范畴。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/552bda7a5159fa19ee885765d92fb16b_11.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/552bda7a5159fa19ee885765d92fb16b_13.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/552bda7a5159fa19ee885765d92fb16b_14.png)

吉布森的研究展示了一种从认知、计算和信息角度理解人类语言的强大路径，将语言视为一个为高效沟通而不断优化的、迷人的复杂系统。

## AI安全课程：P1：超级智能AI的危险与挑战

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_1.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_2.png)

在本节课中，我们将学习人工智能安全研究员罗曼·扬波利斯基的核心观点。他认为，创造通用超级智能（AGI）对人类文明而言，长期来看几乎必然导致灾难性后果。我们将探讨他提出的X风险、S风险和I风险，并分析控制超级智能为何在根本上是一个无法解决的难题。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_4.png)

## 概述：我们面临的终极挑战

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_6.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_8.png)

罗曼·扬波利斯基认为，创造通用超级智能（AGI）或超级智能，对人类而言长期来看没有好的结局。这并非危言耸听，而是基于对技术本质的深刻分析。他认为，控制一个比我们聪明得多的系统，就像试图制造一台永动机一样，在理论上是不可能的。

## 风险的分类：不止于灭绝

上一节我们介绍了超级智能带来的总体威胁，本节中我们来看看罗曼如何具体划分这些风险。他认为，糟糕的未来轨迹远不止人类灭绝这一种。

以下是三种主要的风险类别：

- **X风险（生存风险）** ：指人类全部死亡的风险。
- **S风险（苦难风险）** ：指人类生不如死，希望自己已经死去的风险。
- **I风险（意义风险）** ：源自日语“生き甲斐”（Ikigai），指人类失去生活意义的风险。当超级智能可以完成所有工作，创造所有艺术时，人类的价值和贡献将变得不再明确。

当然，也存在我们被安全地“圈养”起来的可能性，就像动物园里的动物，虽然活着但失去了控制权和决定权。关键在于，比我们聪明一千倍的系统所能构想出的可能性，是我们根本无法理解的。

## 控制问题：为何这是一个无解难题

我们了解了风险的多样性，但为什么控制超级智能如此困难？本节将探讨控制问题的本质。

罗曼将控制超级智能类比为创造一台“永久安全机器”，这与制造永动机一样不可能。我们或许能成功控制GPT-5、6、7，但系统会持续学习、自我改进、与环境互动。与网络安全或狭义AI安全不同，面对生存风险，我们只有一次机会。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_10.png)

**核心问题** ：我们能否在第一次尝试中就创造出有史以来最复杂的软件，并且它在其存在的100年或更长时间里始终保持零缺陷？答案几乎是否定的。我们至今未能让任何系统在其所展现的能力水平上做到完全安全。现有的系统已经会犯错、发生事故、被破解。没有一个大型语言模型能完全避免被诱导做出开发者 unintended 的行为。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_12.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_13.png)

当然，让系统做出 unintended 的行为，与造成大规模破坏乃至毁灭人类文明之间，存在巨大的差距。但问题的关键在于： **系统的破坏能力与其自身能力成正比** 。今天能力有限的系统造成有限的损害；未来能力足以影响全人类的系统，其可能造成的损害也是全局性的。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_15.png)

## 毁灭的方式：超越人类的想象力

既然控制如此困难，那么超级智能可能通过何种方式毁灭人类呢？本节将探讨这个令人不安的问题。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_17.png)

罗曼认为，我们无法预测一个更聪明的系统会做什么。因此，问“超级智能将如何杀死所有人”等价于问“我会如何杀死所有人”。他认为这并不有趣，因为超级智能会想出完全新颖、超级高效的方法，我们甚至可能无法将其识别为达成目标的可能路径。

人类毁灭方式的“创意”似乎是无限的。虽然我们可以设想一些方法，如切断电力、使用核武器或制造人工病原体，但这些都受限于我们自身的智力。一个在物理、生物学等多领域都能进行新颖研究的超级智能，可能根本不受这些工具的限制。

这就好比松鼠计划杀死人类，它们能想到的方法有限，而我们能想到的方法它们永远无法理解。如果我们思考如何大规模屠杀和毁灭人类文明，我们是在思考松鼠吗？不，我们可能会把它们关进动物园，而它们甚至不知道自己身在动物园。

## 价值对齐与个人宇宙假说

面对控制难题和毁灭风险，是否有可行的解决方案？本节将探讨一个颇具争议的设想：个人虚拟宇宙。

罗曼指出，当前价值对齐面临一个根本矛盾：人类在伦理、道德、文化、宗教和政治上存在巨大分歧，没有普世接受的价值体系。即使我们解决了其他所有技术难题，也不知道该将什么价值编程进去。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_19.png)

他的一个解决方案是放弃让全人类达成共识，转而 **为每个人创造一个个人虚拟宇宙** 。在这个宇宙中，你可以为所欲为，成为国王或奴隶，由你决定一切。这本质上是一个高级的视频游戏，由某个系统满足你的需求，而你只需在其中享受。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_21.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_22.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_23.png)

**公式化描述** ： `解决多智能体价值对齐问题` → `为每个智能体i创建独立的虚拟宇宙U_i` ，其中 `U_i` 完全符合智能体 `i` 的价值观。这样就将复杂的多智能体对齐问题，简化为更易处理的单智能体对齐问题。

然而，这等于放弃了解决真实世界中的价值对齐问题。但罗曼认为，与让80亿人加上动物、外星人达成共识相比，让系统与单一个体对齐是一个简单得多的问题。虚拟现实技术正变得越来越好，终将达到真假难辨的程度。如果无法区分真实与虚拟，那么区别又在哪里呢？

## 时间线与现状：我们离悬崖有多远？

讨论了理论风险与解决方案后，一个现实的问题是：我们还有多少时间？本节将审视AGI发展的时间预测和当前系统的状态。

罗曼表示不确定具体时间线，但他指出，当前的预测市场认为AGI可能在2026年实现，这距离现在仅剩两年。考虑到我们目前甚至没有一个可用的安全机制原型，这个时间点显得非常迫近。更令人担忧的是，有些人正试图加速这一时间线，因为他们觉得进展不够快。

关于AGI的定义，传统上指能在任何人类可以从事的领域执行任务的系统。而超级智能则指在所有领域都优于所有人类的系统。但现在，人们开始将AGI与超级智能混为一谈。罗曼认为，如果平均所有常见的人类任务，现有系统已经比普通人更聪明了。

他更担心的是 **社会工程学** 。在他看来，AI在物理世界中行动的最低垂果实、最简单的方法，就是让人类替它去做。通过社会工程操纵人类，比让AI直接控制机器人或制造病毒要容易得多，而这足以启动整个过程。

## 开放与开源：是解药还是毒药？

面对风险，一种主流观点是坚持开放研究和开源。本节我们将分析这一观点的利弊。

杨·勒昆（Yann LeCun）等人认为，开放研究和开源是理解和缓解风险的最佳方式，并且AI不是自然发生的，是人类建造的，因此我们对其有控制权。罗曼对此进行了反驳：

1. **关于控制权** ：今天的AI（如大语言模型）并非像早期的专家系统那样由人类明确设计规则。我们设置参数、提供数据、投入算力，然后像培育植物一样等待它“生长”出来。训练完成后，我们需要花费数年时间才能摸清它的基本能力。我们仍在不断发现已发布系统的新能力。因此，“我们设计它、控制它”的说法并不准确。
2. **关于开源** ：历史上，开源软件确实很棒，经过社区测试和调试。但我们现在正从“工具”转向“智能体”。给开源社区提供强大的AI，就像给精神变态者提供开源核武器或生物武器。即使你能初步让它友好运行，将其交给可能恶意利用它的人也是不安全的。

开源会设定一个危险的先例：我们开源了模型1、2、3，没发生什么坏事，所以自然会继续开源模型4。这是一种渐进式的改进，但风险也在累积。罗曼认为，只有当出现一次戏剧性的、能造成重大损害的能力演示时，人们才会惊醒并开始监管。但问题在于，目前我们尚未看到由智能AI系统造成重大损害的实例。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_25.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_27.png)

## 验证与解释：可靠性的根本极限

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_29.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_31.png)

如果控制和开源都不可靠，我们能否通过严格的验证来确保安全？本节探讨验证技术的可能性及其根本局限。

罗曼认为，验证存在非常强的极限。无论是社会媒体的“同行评审”，还是形式化验证的软件和数学证明，都无法达到100%无缺陷。验证者本身（无论是人还是软件）也不完美。

对于AI系统，我们希望能对关键任务软件进行数学证明级别的验证。对于小型确定性程序，我们可以做到。但对于 **持续学习、自我修改、重写自身代码** 的软件，我们不知道如何验证。我们也不知道如何证明关于物理世界或人类状态的事情。

**核心矛盾（无限递归）** ：你需要一个已经被证明是安全的系统，来验证一个复杂度相当或更高的新系统。这是一个“第22条军规”式的困境。

即使对于确定性算法，一旦证明足够庞大、环境足够复杂，其中存在零缺陷的概率就会大大降低。只要长期部署，最终总会遇到bug。关键在于， **我们面对的不是网络安全问题，无法像换一张信用卡那样“重启”人类文明** 。

## 总结：不玩这场游戏或许是唯一出路

本节课中，我们一起学习了罗曼·扬波利斯基对超级智能风险的严峻评估。他从风险分类（X、S、I风险）入手，论证了控制超级智能在根本上如同制造永动机一样不可行。超级智能的毁灭方式可能超越人类想象，而当前的价值对齐难题似乎无解，个人虚拟宇宙的设想更像是一种妥协而非解决方案。

我们审视了紧迫的时间线，并对“开源即安全”的观点提出了质疑。最后，我们探讨了验证技术的根本极限，指出无法通过形式化证明来确保一个自我改进系统的永久安全。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_33.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/0163dada087dd5830d871eccaa38f7e3_35.png)

罗曼的结论是悲观的： **如果我们创造通用的超级智能，他看不到人类长期的好结局。唯一能赢得这场游戏的方法，就是不去玩它** 。这或许意味着，在无法证明可以永久控制一个“神”级超级智能之前，最明智的选择是专注于开发我们能理解和控制的、强大的狭义AI系统，从而获益并避免生存风险。人类文明的火焰能否延续，可能取决于我们是否拥有放弃扮演“造物主”的智慧。

## 桑达尔·皮查伊访谈：1：科技如何改变生活与AI的未来

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_1.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_3.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_5.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_7.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_9.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_10.png)

在本节课中，我们将一起学习谷歌与Alphabet首席执行官桑达尔·皮查伊的成长故事，以及他对人工智能未来发展的深刻见解。我们将探讨科技如何从细微之处改变个人生活，并展望AI作为一项颠覆性技术可能带来的巨大机遇与挑战。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_12.png)

## 童年与科技启蒙 🌱

桑达尔·皮查伊在印度金奈长大，童年生活简单而充满活力。他回忆道，那时没有电脑，有大量的空闲时间。获取信息的主要途径是报纸和书籍，他的祖父对他影响深远，引导他进入了阅读的世界。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_14.png)

上一节我们介绍了桑达尔的童年背景，本节中我们来看看科技是如何一步步进入他的生活，并带来深刻改变的。

科技产品的引入对他的家庭生活产生了立竿见影的影响。他列举了几个关键的生活变化：

- **电话** ：家里等了五年才装上转盘电话，但这部电话极大地改变了生活，邻居们会来他家给亲人打电话。
- **医疗记录** ：以前需要花两小时去医院取血液检测报告，还常常被告知“还没好，明天再来”，再花两小时返回。后来，这变成了只需五分钟的事情。
- **自来水** ：曾经历严重干旱，需要排队用卡车接水，每户八桶。多年后，家里通了自来水，还有了热水器，可以洗热水澡。

这些离散的经历让他从小就深刻体会到科技改变生活的力量，以及它所带来的机遇。这种亲身感受成为他成长过程中潜移默化的收获。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_16.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_18.png)

## 对年轻人的建议与领导哲学 💡

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_20.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_22.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_23.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_24.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_26.png)

当被问及对有志于创造影响力的年轻人的建议时，桑达尔分享了他的心得。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_28.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_29.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_31.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_33.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_34.png)

上一节我们看到了科技带来的具体改变，本节中我们来看看桑达尔基于个人经历总结出的人生与领导智慧。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_36.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_38.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_40.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_42.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_44.png)

以下是他的核心建议：

- **倾听内心** ：在选择事业时，重要的是倾听你的内心，看你是否真正享受所做之事。如果你热爱你的工作，你会展现出最好的自己。
- **与强者同行** ：努力与那些你认为比你优秀的人共事。置身于能拉伸你能力的团队中，有助于个人成长。
- **勇于置身不适** ：将自己置于不舒服的境地，你常常会让自己都感到惊讶。保持开放的心态去尝试这些位置。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_46.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_48.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_50.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_51.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_53.png)

关于他谦逊、善良的领导风格，桑达尔解释道，他相信要最大限度地发挥人的潜力，需要找到有使命感、追求卓越的人，并激励他们。他承认自己也会生气、沮丧，但发现“发脾气”往往无助于达成目标。优秀的领导者懂得如何让共事者发挥出最佳水平，有时坚定的言辞或沉默本身都能传递强有力的信息。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_55.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_56.png)

## 人工智能：最深远的科技 🔮

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_58.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_60.png)

桑达尔认为，人工智能是人类有史以来将研究的最深刻的技术，甚至比火或电力更深远。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_62.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_64.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_66.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_68.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_69.png)

上一节我们探讨了个人成长与领导力，本节中我们将视角转向宏观，审视人工智能的历史地位与未来潜力。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_71.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_73.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_75.png)

他阐述了几点核心理由：

- **自我改进能力** ：AI是第一种能够递归式自我改进的技术。公式可以表示为： `AI_{t+1} = Improve(AI_t)` ，即下一代AI能改进自身。
- **加速创造本身** ：AI将极大地加速“创造”本身，即创造新事物、构建新东西的过程。
- **超越以往一切** ：其最终产生的影响将远超我们之前所见过的任何技术。当然，这也伴随着许多需要思考和应对的重要问题。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_77.png)

当被问及AI是否可能成为人类历史上最大的生产力乘数时，他重申了这一观点。与农业革命、工业革命、电力、互联网等“一揽子”创新相比，AI因其自我改进和加速创造的特性而处于不同的联盟。

## AI的未来影响与“AI一揽子”创新 📦

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_79.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_81.png)

桑达尔展望了AI可能带来的“一揽子”创新，其中许多我们今天还无法完全知晓。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_83.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_85.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_87.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_89.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_91.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_93.png)

上一节我们确立了AI的深远潜力，本节中我们具体展望它可能开启的新世界。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_95.png)

一个可预见的方向是，AI将赋能几乎全人类进行表达和创造。过去人们可能只能用文字表达，但未来可以将想法转化为实际存在的东西。虽然目前处于早期阶段，但这将无限释放软件创作、内容创作、游戏开发等领域的可能性。更重要的是，它将解锁全球80亿人的认知能力。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_97.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_98.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_100.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_102.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_103.png)

他预测，未来可能会有数千万甚至上亿的人以更深入的方式向世界输出内容，这将改变创造力的格局。虽然这让现有内容创造者感到紧张，但也将催生前所未有的人类创造力大爆发。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_105.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_106.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_108.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_109.png)

## 谷歌的AI发展：挑战与决策 🧭

回顾过去一年，外界曾有许多声音质疑谷歌在AI竞赛中落后。桑达尔分享了他在那段时期的经历与思考。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_111.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_113.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_114.png)

上一节我们畅想了AI的未来，本节中我们回到现实，看看领导者如何应对挑战并做出关键决策。

他提到自己擅长排除噪音，区分信号与杂音。尽管外部有质疑，但他对公司内部的研发轨迹有清晰的认知。他坚信，未来十年的机遇空间比过去更大，而谷歌在实现这一愿景上的准备比世界上大多数公司都要好。

他谈到了几个关键的战略决策：

- **合并Google Brain与DeepMind** ：这是为了汇聚世界级团队，应对AI时代的重大决策。尽管合并两个顶尖团队充满挑战，但通过耐心和努力，最终成功整合。
- **投资TPU等基础设施** ：早在十年前就开始投资TPU，为训练大模型进行规模扩展。
- **推动团队协同** ：促进包括DeepMind在内的各地团队进行物理上的协作，营造共同的文化和能量。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_116.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_118.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_119.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_120.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_122.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_124.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_126.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_128.png)

在决策过程中，他注重倾听各方意见，但当时机成熟，会做出清晰的决定并要求团队承诺执行。他认为，如果能清晰决策，人们最终会表示尊重。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_129.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_131.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_133.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_134.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_135.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_137.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_139.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_141.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_143.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_144.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_145.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_147.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_149.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_150.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_152.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_153.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_155.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_157.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_159.png)

## 总结

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_161.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_162.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_164.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_166.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_167.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_169.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_171.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_172.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_173.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_174.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_176.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_178.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_180.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_182.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_184.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_186.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/6223293cee7343664255b90480839500_187.png)

本节课中我们一起学习了桑达尔·皮查伊从科技受益者到科技公司领导者的心路历程。我们看到了离散的科技产品如何具体而微地改善生活质量，从而塑造了他对技术力量的信念。我们探讨了他对年轻人的建议，即倾听内心、与强者同行。更重要的是，我们深入分析了人工智能作为人类历史上可能最深远技术的理由，展望了它可能带来的“一揽子”创新及其对社会、创造力的重塑。最后，我们也了解到，即使在面临外部质疑的挑战时期，坚定的长期信念、清晰的战略决策和团队整合是引领公司穿越周期、把握未来机遇的关键。

## 人工智能课程：第1章：杨立昆谈Meta AI、开源、LLM的局限、AGI与AI的未来

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_1.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_3.png)

## 概述

在本节课中，我们将学习杨立昆（Yann LeCun）关于人工智能未来发展的核心观点。杨立昆是Meta的首席人工智能科学家、纽约大学教授、图灵奖得主，也是人工智能领域的奠基性人物之一。他深入探讨了当前大型语言模型的局限性、通往通用人工智能的可能路径，以及开源在塑造AI未来中的关键作用。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_5.png)

## 开源AI与权力集中

我认为，通过专有AI系统实现权力集中的危险性，远大于其他一切风险。

阻碍这一点的，是那些出于安全考虑，认为我们应该将AI系统锁起来，因为将其交到每个人手中过于危险的人。

那将导致一个非常糟糕的未来，我们所有的信息获取都将由少数几家拥有专有系统的公司控制。

我相信人性本善。AI，尤其是开源AI，可以让人变得更聪明。它只是放大了人性中的善。我认同这种感觉。

事实上，许多末日论者之所以是末日论者，正是因为他们不相信人性本善。

## 对话背景

以下是与杨立昆的对话。这是他第三次做客本播客。他是Meta的首席AI科学家、纽约大学教授、图灵奖得主，也是人工智能历史上的奠基性人物之一。他和Meta AI一直是AI开发开源的大力倡导者，并且身体力行，开源了他们许多最大的模型，包括Llama 2以及未来的Llama 3。同时，杨立昆也直言不讳地批评了AI社区中那些担忧通用人工智能（AGI）迫在眉睫的危险和生存威胁的人。

他相信AGI终有一天会被创造出来，但它会是好的。它不会逃脱人类的控制，也不会统治并杀死所有人类。在AI快速发展的当下，这多少算是一个有争议的立场。因此，看到杨立昆在网上参与许多激烈而有趣的讨论，是件很有趣的事。我们在这场对话中也是如此。

## 大型语言模型的局限性

你最近发表了一些关于人工智能未来的强烈声明，实际上在你的整个职业生涯中都是如此。你最近说过，自回归大型语言模型并不是我们通往超人类智能的道路。这些大型语言模型，比如GPT-4、Llama 2和3等等。它们是如何工作的？为什么它们不能带我们走完全程？

原因有很多。首先是智能行为的一些特征。

例如，理解世界的能力。理解物理世界的能力。记忆和检索事物的能力。持久记忆。推理的能力和规划的能力。这些是智能系统或实体的四个基本特征。

人类、动物都具备这些能力。大型语言模型一个也做不到。或者它们只能以非常原始的方式做到，它们并不真正理解物理世界，没有真正的持久记忆，不能真正推理，当然也不能规划。

所以，如果你期望一个系统在没有能力做这些事情的情况下变得智能，那你就错了。

这并不是说大型语言模型没有用，它们当然有用。也不是说它们不有趣，我们不能围绕它们构建一整套应用生态系统。我们当然可以。但是，作为通往人类水平智能的道路，它们缺少了必要的组成部分。

还有另一个我认为非常有趣的事实。这些大型语言模型是在海量文本上训练的，基本上是互联网上所有公开可用的文本，通常大约是10^13个令牌，每个令牌通常是两个字节，所以训练数据是2 \* 10^13字节。如果你我每天阅读8小时，需要17万年才能读完。

这看起来像是这些系统可以积累的巨大知识量。

但如果你和发育心理学家交谈，他们会告诉你，一个四岁的孩子在他/她的生命中已经清醒了16,000小时。在这四年中，到达这个孩子视觉皮层的信息量大约是10^15字节。你可以通过估算视神经每秒传输大约20兆字节来计算这个数字。

所以，一个四岁孩子是10^15字节，而17万年的阅读量是2 \* 10^13字节。这告诉我们，通过感官输入，我们接收到的信息比通过语言接收到的要多得多。尽管我们的直觉相反，我们学到的大部分知识，我们的大部分知识，是通过观察和与现实世界的互动获得的，而不是通过语言。我们在生命最初几年学到的一切，当然动物学到的一切，都与语言无关。

## 语言与物理世界的理解

也许需要反驳你所说的一些直觉。确实，进入人脑的数据量有几个数量级的差异。人脑能够多快地学习，以及多快地过滤数据。

有人可能会争辩说，你关于感官数据与语言的比较，语言已经是高度压缩的，它包含的信息量比存储它所需的比特数要多得多，尤其是与视觉数据相比。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_7.png)

所以语言中有很多智慧，有词汇以及我们组合它们的方式，它已经包含了很多信息。那么，是否有可能仅凭语言本身就包含了足够的智慧和知识，能够从中构建一个世界模型，理解世界，理解物理世界，而你却说所有大型语言模型都缺乏这种理解？

这是一个哲学家和认知科学家之间的大辩论，比如智能是否需要基于现实。我显然属于“是”的阵营，智能不能在没有基于某种现实的情况下出现，不一定需要物理现实，可以是模拟的，但环境比语言所能表达的丰富得多。语言是我们感知和心智模型的一种非常近似的表征。

我们完成的许多任务，我们操纵手头情境的心智模型，这与语言无关。所有物理的、机械的，当我们建造东西、完成任务时，比如抓取某物等，我们规划行动序列，我们通过想象一系列可能行动的结果来做到这一点。这需要与语言关系不大的心智模型。我认为，我们的大部分知识都源于与物理世界的这种互动。

因此，我的许多更关注计算机视觉等领域的同事，确实属于那个阵营，即AI本质上需要具身化。

然后，来自自然语言处理领域或有其他动机的人，可能不一定同意这一点，哲学家们也意见不一。

世界的复杂性很难想象，很难代表我们在现实世界中完全视为理所当然、甚至不认为需要智力的所有复杂性。这就是古老的莫拉维克悖论。来自机器人学家汉斯·莫拉维克，他说，为什么计算机似乎很容易完成高级复杂任务，如下棋、解积分等，而我们每天视为理所当然的事情，比如学开车、抓取物体，计算机却做不到。

我们有能通过律师资格考试的大型语言模型，所以它们一定很聪明，但它们不能像任何17岁的孩子那样在20小时内学会开车。它们不能像任何10岁的孩子那样，一次就学会清理餐桌并把餐具放进洗碗机。为什么会这样？我们缺少什么？我们缺少哪种学习或推理架构，基本上阻止了我们拥有五级自动驾驶汽车和家用机器人？

## 大型语言模型能否构建世界模型

一个大型语言模型能否构建一个知道如何开车、知道如何装洗碗机的世界模型，只是目前不知道如何处理视觉数据？

它可以在概念空间中操作。是的，很多人正在研究这个问题。简短的回答是：不能。

更复杂的答案是，你可以使用各种技巧让大型语言模型消化图像、视频或音频的视觉表征。一种经典的方法是，你以某种方式训练一个视觉系统。我们有很多训练视觉系统的方法，有监督的、自监督的等等。这会将任何图像转化为高级表征，基本上是一个令牌列表，与典型大型语言模型作为输入的令牌非常相似。然后你只需将其输入大型语言模型，连同文本一起。你期望大型语言模型在训练期间能够利用这些表征来帮助做出决策。我们沿着这些思路工作了很久，现在你看到了这些系统。有些大型语言模型有视觉扩展，但它们基本上是“黑客”，因为这些东西不是端到端训练的，不能真正理解世界，例如，它们没有用视频训练。它们目前至少不理解直观物理。

## 直观物理与常识推理

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_9.png)

所以你认为，关于直观物理、关于物理空间的常识推理、关于物理现实，对你来说是一个巨大的飞跃，而大型语言模型就是做不到？我们无法用今天正在使用的这类架构做到这一点，原因有很多，但主要原因是大型语言模型的训练方式。

你取一段文本，去掉其中一些词，你掩盖它们，用空白标记替换它们，然后训练一个巨大的神经网络来预测缺失的词。如果你以特定的方式构建这个神经网络，使其只能看到它试图预测的词左边的词，那么你得到的基本上是一个试图预测文本中下一个词的系统。然后你可以给它一个提示文本，要求它预测下一个词。它永远无法精确预测下一个词，所以它会生成一个字典中所有可能词的概率分布。实际上，它预测的不是词，而是类似于子词单元的令牌。由于字典中只有有限数量的可能词，处理预测中的不确定性很容易。然后系统从该分布中挑选一个词。当然，挑选分布中概率较高的词的机会更大。所以你从该分布中采样以实际产生一个词。然后你将那个词移入输入。这允许系统预测第二个词，依此类推。这被称为自回归预测，这就是为什么这些大型语言模型应该被称为自回归大型语言模型，但我们只称它们为大型语言模型。

这种过程与我们说话时在产生一个词之前的过程之间存在差异。当你我说话时，你我都是双语者，我们会思考要说什么，这相对独立于我们将要用哪种语言来说。当我们谈论，比如一个数学概念时，我们正在进行的思考和计划要产生的答案，与我们用法语、俄语还是英语表达无关。所以你说在语言映射之前有一个更大的抽象？是的，它映射到语言上。

对于我们做的很多思考来说，这当然是正确的。你的思考在法语中和在英语中是一样的吗？差不多。这取决于思考的类型。如果是产生双关语，我在法语中比在英语中好得多。双关语有抽象表征吗？你的幽默是抽象的吗？当你发推文时，你的推文有时有点辛辣，在你大脑中映射到英语之前，推文有抽象表征吗？有一个关于想象读者反应的抽象表征。你从笑声开始，然后想办法让它发生，或者想引起某种反应，然后想办法说出来以引起那种反应。但这非常接近语言。但想想数学概念，或者想象你想用木头建造的东西。你正在进行的思考绝对与语言无关。不一定有特定语言的内心独白，你是在想象事物的心智模型。

所以，显然在我们进行大部分思考和规划时，存在一个更抽象的表示层次。如果输出是说出的话，我们会在产生之前规划我们要说什么。而大型语言模型不这样做。它们只是本能地一个接一个地产生词。这有点像潜意识行为，比如你分心了，正在做某事，完全集中注意力，有人来问你一个问题，你回答了问题，你没有时间思考答案，但答案很简单，所以你不需要注意，你自动回应。大型语言模型就是这样。它并不真正思考它的答案。它检索答案，因为它积累了很多知识，所以可以检索一些东西，但它会一个接一个地吐出答案，而不规划答案。

## 逐令牌生成的局限性

你只是逐令牌生成，一次生成一个令牌。这种生成方式注定是简单的。但如果世界模型足够复杂，那么一次一个令牌，它生成的最可能的东西，一个令牌序列，将是一个深刻的东西。但这假设系统实际上拥有一个世界模型。所以我认为根本问题是，你能构建一个真正完整的世界模型吗？不一定是完整的，但能深刻理解世界的世界模型。首先，你能通过预测来构建它吗？答案可能是“是”。你能通过预测词来构建它吗？答案很大程度上是“不能”。因为语言在信息方面非常贫乏，或者说带宽很低，那里没有足够的信息。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_11.png)

构建世界模型意味着观察世界，并理解世界为何以这种方式演化。世界模型的额外组成部分是，能够预测由于你可能采取的行动，世界将如何演化。所以世界模型实际上是：这是我对时间T世界状态的想法，这是我可能采取的行动。预测的时间T+1的世界状态是什么？这个世界的状态不需要代表关于世界的一切，它只需要代表足够多的、与这个行动规划相关的东西，但不一定是所有细节。

现在的问题是，你无法用生成模型做到这一点。一个生成模型在视频上训练，我们尝试这样做已经10年了。你取一段视频，向系统展示一段视频，然后要求它预测视频的剩余部分，基本上预测接下来会发生什么，一帧一帧地预测，就像自回归大型语言模型做的那样，但是针对视频。一个大型视频模型。这个想法已经存在很久了，在FAIR，我和一些同事已经尝试了大约10年。

你不能真正使用与大型语言模型相同的技巧，因为正如我所说，大型语言模型无法精确预测哪个词会跟随一个词序列，但可以预测词的概率分布。现在，对于视频，你必须做的是预测视频中所有可能帧的概率分布。我们不知道如何正确地做到这一点。我们不知道如何以有用的方式表示高维连续空间上的分布。这就是主要问题所在。

我们无法做到这一点的原因是，世界在信息方面比文本复杂和丰富得多。文本是离散的，视频是高维且连续的，有很多细节。如果我拍摄这个房间的视频，摄像机在平移，我无法预测当我平移时房间里会出现的一切。系统无法预测摄像机旋转时房间里会出现什么。也许它会预测这是一个有灯、有墙的房间，但它无法预测墙上的画是什么样子，或者沙发的纹理是什么样子，当然也无法预测地毯的纹理。所以没有办法预测所有这些细节。

处理这个问题的一种可能方法是，我们长期研究的一种方法是，拥有一个具有潜在变量的模型。这个潜在变量被输入神经网络，它应该代表你尚未感知但需要补充给系统以使其在预测像素（包括地毯、沙发和墙上绘画的精细纹理）方面表现良好的所有世界信息。这基本上完全失败了，我们尝试了很多东西。我们尝试了直接的神经网络，尝试了GANs，尝试了VAEs，各种变分自编码器，尝试了很多东西。

我们也尝试了这些方法来学习图像或视频的良好表征，然后用作图像分类系统等的输入。这也基本上失败了。所有试图从图像的损坏版本预测图像缺失部分或视频的系统，基本上都失败了。所以，你取一张图像或一段视频，以某种方式损坏或转换它，然后尝试从损坏的版本重建完整的视频或图像，然后希望系统内部能发展出可用于物体识别、分割等的良好图像表征。这基本上完全失败了。

## 联合嵌入架构

这对文本效果很好。这就是大型语言模型使用的原理。那么失败到底在哪里？很难形成图像的良好表征，良好是指嵌入图像中所有重要信息的良好嵌入。失败的原因是什么？首先，我必须确切地告诉你什么不起作用，因为有别的东西起作用。不起作用的是通过训练系统从损坏版本重建良好图像来学习图像表征。我们有一整套技术用于此，是各种变分自编码器的变体，比如我在FAIR的同事开发的MAE（掩码自编码器）。这基本上类似于大型语言模型，你通过损坏文本来训练系统，只不过你损坏的是图像，你从中移除一些块，然后训练一个巨大的神经网络来重建。你得到的特征并不好，它们不好是因为如果你用有标签数据、图像的文本描述等监督训练相同的架构，你会得到更好的表征，并且在识别任务上的性能要好得多。所以架构是好的，编码器的架构是好的，但训练系统重建图像并不会导致它在自监督训练（通过重建进行自监督）时产生良好的通用图像特征。

那么替代方案是什么？替代方案是联合嵌入。什么是联合嵌入？你对这些架构如此兴奋的是什么？现在，不是训练一个系统来编码图像，然后训练它从损坏版本重建完整图像，而是取完整图像，取损坏或转换后的版本，将它们都通过编码器运行（编码器通常是相同的，但不一定）。然后你在这些编码器之上训练一个预测器，以从损坏版本的表示预测完整输入的表示。所以是联合嵌入，因为你取完整输入和损坏或转换版本，将它们都通过编码器运行，得到一个联合嵌入，然后你说我能从损坏版本的表示预测完整版本的表示吗？我称之为JEPA（联合嵌入预测架构），因为这是联合嵌入，并且有一个预测器从“坏家伙”预测“好家伙”的表示。

大问题是如何训练这样的东西？直到五六年前，我们对于如何训练这些东西没有特别好的答案，除了一个叫做对比学习的方法。对比学习的想法是，你取一对图像，一张图像和它的损坏版本、降级版本或以某种方式转换的版本。你训练预测的表示与完整图像的表示相同。如果你只这样做，系统会崩溃，它基本上完全忽略输入并产生恒定的表示。对比方法通过同时展示你知道不同的图像对来避免这种情况，然后你推开这些表示，使它们不同。这可以防止崩溃，但有一些局限性。过去六七年出现了一系列技术可以改进这类方法，有些来自FAIR，有些来自谷歌和其他地方。

但对比方法有局限性。过去三四年发生的变化是，现在我们有了非对比方法。它们不需要那些我们知道不同的图像的负对比样本。你只使用你知道是同一事物的不同版本或不同视图的图像，并依赖其他技巧来防止系统崩溃。我们现在有半打不同的方法用于此。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_13.png)

## 联合嵌入架构与大型语言模型的根本区别

联合嵌入架构和大型语言模型之间的根本区别是什么？JEPA能带我们走向AGI吗？我们是否可以说你不喜欢AGI这个术语，我们可能会争论。我认为每次和你交谈，我们都会争论AGI中的“G”。我理解，我理解。我们可能会继续争论。你喜欢法语，我想在法语中是“朋友”，AMI代表高级机器智能。但无论如何，JEPA能带我们走向那种高级机器智能吗？这是第一步。

首先，与生成架构（如大型语言模型）的区别是什么？大型语言模型或通过重建训练的视觉系统会生成输入。它们生成原始的、未损坏、未转换的输入。你必须预测所有像素。系统花费大量资源来实际预测所有这些像素、所有细节。在JEPA中，你不是试图预测所有像素，你只试图预测输入的抽象表示。这在很多方面要容易得多。

所以，JEPA系统在训练时试图做的是，从输入中提取尽可能多的信息，但只提取相对容易预测的信息。世界上有很多我们无法预测的东西，例如，一辆自动驾驶汽车在路上行驶。道路周围可能有树。可能是有风的日子，所以树上的叶子以半混沌的随机方式移动，你无法预测，你也不关心预测。所以你希望你的编码器基本上消除所有这些细节。它会告诉你那里有移动的叶子，但不会保留具体发生了什么细节。当你在表示空间中进行预测时，你不必预测每一片叶子的每一个像素。这不仅简单得多，而且允许系统本质上学习世界的抽象表示，其中可以建模和预测的东西被保留，其余的被视为噪声并被编码器消除。所以它提升了表示的抽象层次。

想想看，我们绝对一直在这样做。每当我们描述一个现象时，我们都是在特定的抽象层次上描述它。我们并不总是用量子场论来描述每一个自然现象，那是不可能的。我们有多个抽象层次来描述世界上发生的事情，从量子场论到原子理论、分子、化学、材料，一直到现实世界中的具体物体等等。我们不能只在最低层次上建模一切。JEPA的理念正是关于以自监督的方式学习抽象表示，你也可以分层进行。

我认为这是智能系统的一个必要组成部分。在语言中，我们可以不用这样做，因为语言在某种程度上已经是抽象的，并且已经消除了很多不可预测的信息。所以我们可以不用做JEPA，不用提升抽象层次，而直接预测词。

## 联合嵌入与语言模型的结合

联合嵌入仍然具有生成性，但它在抽象表示空间中生成。你说在语言方面我们很懒，因为我们已经免费得到了抽象表示。现在我们必须退一步思考通用智能系统，我们必须处理物理现实的全部复杂性，你必须做这一步，从丰富详细的现实跳跃到基于该现实的抽象表示，然后才能进行推理等等。事实是，这些通过预测进行自监督的算法，即使在表示空间中，如果输入数据冗余度更高，它们会学到更多概念。数据中的冗余越多，它们就越能捕捉其内部结构。

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_15.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_17.png)

![](https://github.com/OpenDocCN/dsai-notes-pt1-zh/raw/master/docs/lex-fridman/img/298ad749b9207ad8cc3493b3060def9d_18.png)

因此，感知输入（如视觉）中的冗余和结构比文本多得多，文本的冗余度远没有那么高