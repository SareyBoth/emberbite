# Graph Report - EmberBite  (2026-11-10)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 32 nodes · 49 edges · 7 communities (3 shown, 4 thin omitted)
- Extraction: 88% EXTRACTED · 12% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- pil
- re
- addItemToCart
- openCustomizer
- data.js

## God Nodes (most connected - your core abstractions)
1. `updateCartUI()` - 7 edges
2. `getCart()` - 6 edges
3. `saveCart()` - 5 edges
4. `addItemToCart()` - 5 edges
5. `calculateTotals()` - 4 edges
6. `removeItemFromCart()` - 4 edges
7. `updateItemQuantity()` - 4 edges
8. `openCustomizer()` - 3 edges
9. `getAppliedPromo()` - 2 edges
10. `savePromo()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `calculateTotals()` --calls--> `getAppliedPromo()`  [EXTRACTED]
  js/app.js → js/app.js  _Bridges community 1 → community 2_
- `addItemToCart()` --calls--> `getCart()`  [EXTRACTED]
  js/app.js → js/app.js  _Bridges community 1 → community 4_

## Import Cycles
- None detected.

## Communities (7 total, 4 thin omitted)

### Community 1 - "pil"
Cohesion: 0.67
Nodes (6): calculateTotals(), getCart(), removeItemFromCart(), saveCart(), updateCartUI(), updateItemQuantity()

### Community 4 - "addItemToCart"
Cohesion: 0.67
Nodes (3): addItemToCart(), openCartDrawer(), showToast()

### Community 5 - "openCustomizer"
Cohesion: 0.67
Nodes (3): bindCustomizerTriggers(), openCustomizer(), updateModalPrice()

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `updateCartUI()` connect `pil` to `re`?**
  _High betweenness centrality (0.009) - this node is a cross-community bridge._
- **Why does `addItemToCart()` connect `addItemToCart` to `pil`, `re`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Why does `getCart()` connect `pil` to `re`, `addItemToCart`?**
  _High betweenness centrality (0.005) - this node is a cross-community bridge._