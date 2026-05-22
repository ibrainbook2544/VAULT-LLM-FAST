
> 🌐 Chinese version: [[FAST（Full Area Stack Tree）.zh-CN]]

## FAST 6+1 Dimensional Expansion — Molecularization & Synthesis Process

> This is the most critical step! It is the **core step** of **LLM-FAST**. It determines whether the entire FAST molecular notebook achieves **authenticity, correctness, and completeness**.

### Why Is This Step the Most Critical?

In the entire LLM-FAST workflow, AI Learning handles "breadth collection," human Thinking handles "depth judgment," and the **6+1 Dimensional Expansion** is the sole pivot that integrates both into a structured knowledge network.

Skip this step, and you get a pile of high-quality fragments. Complete this step, and you get a knowledge palace that can grow indefinitely.

**Three risks are eliminated at this step:**

| Risk | How 6+1 Eliminates It |
|---|---|
| **Falsity** (AI hallucination) | Backward + Opposite dimensions force tracing back to sources and boundaries, exposing ungrounded assertions |
| **Partiality** (tunnel vision) | Superior + Lateral dimensions force establishment of a global coordinate system, eliminating perspective blind spots |
| **Obsolescence** (ossified knowledge) | Forward dimension forces inquiry into successors and evolutionary direction, preventing knowledge calcification |

### The Essence of FAST 6+1 Dimensions

The 6+1 dimensions are not a checklist — they are a **spatial positioning system**.

Any knowledge node can be precisely located in this three-dimensional coordinate system:

```
              Superior (Up)
                   ↑
    Backward ←  Knowledge Node  → Forward
    (Behind)         ↓            (Ahead)
              Inferior (Down)

    Lateral (Left)  ↔  Knowledge Node  ↔  Opposite (Right)

    + Associated Connections: cross-domain roaming
```

Without coordinates there is no position; without position there is no mapping; without mapping there is no **knowledge network (FAST-LLM-Wiki)**.

### Detailed Molecularization Operations for the Seven Dimensions

#### ① Upward — Superior: Tracing Origins · Attribution · Big Picture

**Core Question**: Where does it belong? What parent domain does it fall under? What class of problems does it solve?

**Molecularization Operations**:

- Find the **direct parent node** (belonging discipline/domain/paradigm)
- Continue tracing upward until reaching **first principles or a universal paradigm**
- Mark the node's **hierarchical position** in the entire knowledge tree

**Synthesis Judgment**: If a knowledge point has no parent node, it is either a pseudo-concept, or your understanding of the macro-structure of the field is insufficient — this in itself is a high-value signal.

**Example** (using "Transformer Attention Mechanism"):

```
Attention Mechanism
  → Parent: Sequence Modeling Architectures
    → Parent: Deep Learning
      → Parent: Machine Learning
        → Parent: Artificial Intelligence
```

#### ② Downward — Inferior: Decomposition · Composition · 80/20 Rule

**Core Question**: What is it composed of? Which 20% of sub-structures carry 80% of the functionality?

**Molecularization Operations**:

- List all **first-level sub-components** (do not rush into recursive deep-diving)
- Apply the 80/20 rule to annotate: which sub-components are **core skeleton**, which are **optional extensions**
- Perform a second-layer decomposition on core sub-components, forming a **two-layer molecular structure**

**Synthesis Judgment**: The biggest pitfall of the Inferior dimension is "infinite deep-diving" — the deeper you go, the sharper the drop in ROI. The correct approach is to lay out the full first layer, then selectively explore the most critical sub-nodes.

**Example**:

```
Attention Mechanism
  ├── ★ Query/Key/Value Matrices (core skeleton)
  ├── ★ Scaled Dot-Product (core skeleton)
  ├── ★ Multi-Head Mechanism (core skeleton)
  ├── Positional Encoding (important extension)
  └── Masking Strategies (context-dependent)
```

#### ③ Forward: Trends · Evolution · Successors

**Core Question**: Who might replace it? In which direction is it evolving? Will it still exist in 5 years?

**Molecularization Operations**:

- Search the **latest papers/technical reports** in the field (delegate to AI Learning)
- Identify **emerging competitive replacement technologies**
- Mark the current node's **lifecycle stage**: Emerging / Growing / Mature / Declining

**Synthesis Judgment**: The Forward dimension is the most direct weapon against "knowledge obsolescence." A learner who never asks Forward questions is forever learning yesterday's world.

**Example**:

```
Attention Mechanism → Forward Evolution Paths
  ├── Sparse Attention (cost optimization direction)
  ├── Linear Attention (efficiency replacement direction)
  ├── State Space Models / Mamba (architecture-level replacement candidate)
  └── Hybrid Architectures (Attention + SSM convergence trend)
```

#### ④ Backward: History · Origins · Pain Points

**Core Question**: What knowledge did it evolve from? What pain points was it born to solve?

**Molecularization Operations**:

- Trace the node's **direct historical predecessor** (previous-generation technology/theory)
- Clarify the **core pain points or failure scenarios** it was created to address
- Outline the **key evolutionary event timeline** (no more than 5 nodes)

**Synthesis Judgment**: Without understanding Backward, you cannot truly understand why a concept "grew into this shape." Historical context is the strongest comprehension accelerator, and an important reference system for judging the authenticity of AI output.

**Example**:

```
Attention Mechanism ← Backward Tracing
  ← RNN/LSTM long-range dependency vanishing problem (pain point)
    ← Seq2Seq model information bottleneck (pain point)
      ← 2015 Bahdanau Attention paper (direct predecessor)
        ← 2017 "Attention Is All You Need" (key evolutionary event)
```

#### ⑤ Lateral: Comparison · Competitors · Moat

**Core Question**: Who is similar to it? What is its core competitive advantage? Where is its moat?

**Molecularization Operations**:

- List **same-level competitors/alternatives** (at least 3)
- Use a **comparison matrix** to annotate key differentiating dimensions
- Distill the node's **irreplaceability** relative to competitors (moat)

**Synthesis Judgment**: Lateral is the antidote to "when all you have is a hammer, everything looks like a nail." When you clearly know "when to use this instead of that," you truly own the knowledge.

**Example**:

```
Attention Mechanism vs Competitors
  ┌──────────────────┬──────────┬──────────┬──────────┐
  │                  │Attention │ RNN/LSTM │   CNN    │
  ├──────────────────┼──────────┼──────────┼──────────┤
  │ Long-range deps  │ ★★★★★ │   ★★★  │   ★★   │
  │ Parallel compute │ ★★★★★ │   ★     │  ★★★★ │
  │ Compute cost     │ O(n²) high│  O(n) low│  O(n) low│
  │ Interpretability │   High   │   Low    │  Medium  │
  └──────────────────┴──────────┴──────────┴──────────┘
  Moat: Global context awareness + parallel training efficiency
```

#### ⑥ Opposite: Boundaries · Prohibitions · The Reverse

**Core Question**: What is it NOT? In what scenarios is using it wrong? What are its failure conditions?

**Molecularization Operations**:

- Clarify the node's **applicable boundary conditions**
- List **negative examples**: common misuse/overuse scenarios
- Annotate **knowledge firewalls**: which similar concepts are easily confused

> **The dividing line between experts and mediocrity**: "Knowing what something is NOT is more important than knowing what it IS."

**Synthesis Judgment**: Opposite is the most likely to be skipped in 6+1, yet has the highest value density. AI-generated content almost never proactively tells you "when NOT to use it" — this is precisely one of the most irreplaceable contributions of human Thinking.

**Example**:

```
Attention Mechanism ← Opposite Boundaries
  ✗ Not applicable: ultra-long sequences (O(n²) cost makes it infeasible)
  ✗ Not applicable: real-time edge inference (excessive memory footprint)
  ✗ Common misuse: equating "attention mechanism" with "Transformer" (the latter is a larger architecture)
  ✗ Common confusion: Self-Attention vs Cross-Attention (different target objects)
  Firewall: attention weights ≠ causal explanation; correlation ≠ interpretability
```

#### ⑦ Associated Connections: Cross-domain Mapping · Metaphors · Random Walk

**Core Question**: What completely different domains can this knowledge connect to? What metaphors can help understand or communicate it?

**Molecularization Operations**:

- Force at least **2 cross-domain associations** (jump outside the current domain)
- Find **concrete metaphors** that significantly lower the barrier to understanding
- Explore cross-domain application directions that may produce **innovative transfer**

**Synthesis Judgment**: This is the "entropy increase" moment of the FAST model — uncertain, non-linear, but precisely the core moat of humans relative to AI. AI excels at intra-domain precise retrieval; the human brain excels at cross-domain random roaming. Combined, genuine insights emerge.

**Example**:

```
Attention Mechanism ← Cross-domain Connections
  → Cognitive Science: "Limited attention resource allocation" — how humans focus is also scarce resource scheduling
  → Economics: Attention economy — the allocation logic of attention as scarce capital in the age of information overload
  → Metaphor: Spotlight model — the attention mechanism is like a movable spotlight, not uniformly illuminating the entire stage
  → Transfer Application: User-item Cross-Attention architecture in recommendation systems
```

### 6+1 Synthesis Process: The Execution Rhythm of Molecularization

```
Input: A knowledge node (atom)
         ↓
  [Step 1] Superior: Find parent node, complete anchoring
         ↓
  [Step 2] Inferior: Lay out first-layer sub-structure (filter with 80/20 rule)
         ↓
  [Step 3] Backward: Trace historical predecessors and pain points
         ↓
  [Step 4] Forward: Mark evolutionary direction and replacement candidates
         ↓
  [Step 5] Lateral: Compare competitors, distill the moat
         ↓
  [Step 6] Opposite: Define boundaries, set firewalls
         ↓
  [Step 7] Associated: Cross-domain roaming, spark insights
         ↓
Output: A complete FAST molecular note (knowledge network node)
```

**Key Rhythm Principles**:

- **No parallelism**: traverse in order, complete each dimension before moving to the next
- **No skipping**: even if a dimension "temporarily has no answer," explicitly annotate `[TBD]` — the blank itself is valuable meta-information
- **No over-depth**: keep each dimension within **5–10 information nodes**; anything beyond that should become a separate child molecular note
- **Human Review Checkpoints**: The Backward and Opposite dimensions must be led by human Thinking, with AI only assisting — these are the last lines of defense for authenticity and correctness

### Acceptance Criteria for Completed Molecularization

After completing the 6+1 molecularization of a knowledge node, use the following three questions to self-assess:

| Assessment Question | Corresponding Dimensions | Pass Criteria |
|---|---|---|
| Can I explain its position within the entire knowledge system in 30 seconds? | Superior + Inferior | Can clearly describe the parent node and core sub-structure |
| Can I give 2 examples of "when NOT to use it"? | Opposite | Can specifically state failure conditions, not just vague generalizations |
| Can I explain it with a metaphor from outside the domain? | Associated | Can give a complete newcomer an intuitive grasp within 1 minute |

**All three criteria passed → Molecularization complete, ready to enter the cognitive collapse stage.**

> The quality ceiling of a FAST note is determined by the completeness of the 6+1 traversal. The time invested in this step has the highest ROI in the entire workflow.
