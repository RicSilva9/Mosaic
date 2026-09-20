# Prompt Customization System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Prompt Customization System** defines how users can adapt a published Prompt without needing to manually understand or rewrite every part of it.

A creator may identify meaningful parts of their Prompt that other users can easily modify.

For example:

```text
A {{character}} walking through {{environment}},
wearing {{clothing}},
filmed using {{camera_style}}.
```

Mosaic may transform these elements into an approachable customization experience:

```text
Character
[ Young explorer             ]

Environment
[ Ancient jungle             ]

Clothing
[ Expedition clothing        ]

Camera Style
[ Handheld documentary       ]
```

The resulting values are then applied to the Prompt.

Customization does **not** modify the original Creation.

It creates a customized working state that belongs to the user performing the customization.

---

# Why This System Exists

Prompts can become complex.

An experienced creator may understand exactly which words control:

* the subject;
* the environment;
* the camera;
* the lighting;
* movement;
* visual style;
* dialogue;
* model behavior.

Another user may see the same Prompt and have difficulty understanding what can safely be changed.

Mosaic can bridge this gap.

Instead of requiring the user to understand the entire Prompt:

```text
Read Prompt
     ↓
Understand structure
     ↓
Find what can change
     ↓
Rewrite manually
```

the creator may provide guidance:

```text
Open Creation
      ↓
Customize Prompt
      ↓
Change meaningful elements
      ↓
Receive customized Prompt
```

The goal is not to remove creative freedom.

The goal is to make existing creative knowledge easier to explore.

---

# Customization Is Optional

✅ **Decided**

Not every Prompt needs customizable elements.

A valid Mosaic Creation may contain:

```text
Plain Prompt
```

or:

```text
Prompt
+
Customizable Elements
```

Creators should not be required to structure every Prompt into variables before publishing.

This keeps Mosaic accessible to both casual and advanced creators.

---

# Creator-Defined Customization

✅ **Decided**

The creator determines which parts of their Prompt should be highlighted as customizable.

Example:

```text
A {{character}} enters a {{location}}
during {{time_of_day}}.
```

The creator may decide that:

```text
character
location
time_of_day
```

are useful customization points.

Another Prompt may expose completely different concepts.

Mosaic should not assume that every Prompt contains the same variables.

---

# Customization Variable

A **Customization Variable** represents a part of a Prompt that can be changed through Mosaic's customization interface.

Conceptually:

```text
VARIABLE
│
├── Identifier
├── Label
├── Description
├── Current/Default Value
├── Input Behavior
└── Optional Suggestions
```

This is a product concept rather than a final database structure.

---

# Variable Identifier

Internally, a variable needs a stable way to identify where it belongs.

A conceptual syntax may look like:

```text
{{character}}
{{environment}}
{{camera}}
```

However:

🟡 **Open Decision**

This exact syntax is **not yet finalized**.

The final representation depends on:

* Prompt parsing;
* escaping;
* internationalization;
* editor behavior;
* validation;
* technical implementation.

The user-facing interface should not require creators to understand implementation syntax if Mosaic can provide a better editing experience.

---

# Variable Label

A variable should have a human-readable name.

Example:

```text
Identifier:
camera_style

Label:
Camera Style
```

The label exists for people.

The identifier exists for the system.

These concepts should not necessarily be treated as the same value.

---

# Variable Description

Creators may provide additional guidance explaining what a variable controls.

Example:

```text
Camera Style

Controls how the camera follows the subject.

Examples:
- handheld
- tracking shot
- static wide shot
```

This allows customization to become educational rather than merely mechanical.

---

# Default Value

A customizable element may contain the value used by the original Creation.

Example:

```text
{{weather}}

Original value:
heavy rain
```

When another user opens the customization interface, the original value can provide context and a starting point.

---

# Suggested Values

Creators may optionally provide suggested alternatives.

Example:

```text
Lighting

Original:
Soft sunrise

Suggestions:
- Neon night
- Golden hour
- Moonlight
- Overcast daylight
```

Suggestions can help users experiment without requiring the creator to restrict what they are allowed to enter.

---

# Suggestions Are Not Restrictions

✅ **Decided — Principle**

Suggested values should normally represent **guidance**, not a closed list of allowed possibilities.

For example:

```text
Camera Style

Suggestions:
[ Tracking Shot ]
[ Handheld ]
[ Static ]

Custom:
[ __________________ ]
```

This preserves Mosaic's principle of creative freedom.

A creator may show what works well without claiming those are the only valid possibilities.

---

# Variable Input Types

Different customization elements may benefit from different interfaces.

Potential examples include:

```text
Free text
Suggestion list
Single selection
Multiple selection
Number
Boolean
Structured value
```

However:

🟡 **Open Decision**

Mosaic should not define a large permanent collection of input types before actual Prompt requirements justify them.

The first implementation should support the smallest useful set while allowing future extension.

---

# Required and Optional Variables

A creator may eventually indicate whether a customizable element should contain a value.

Conceptually:

```text
Character
Required

Secondary Detail
Optional
```

🟡 **Open Decision**

The exact semantics of optional variables require further design.

Removing an optional variable may require changing surrounding Prompt text, punctuation, or structure.

This becomes more complicated than simply replacing text.

The system should therefore not promise advanced conditional Prompt construction until the technical model supports it correctly.

---

# Customization Experience

A typical customization flow may look like:

```text
User opens Creation
        ↓
Selects "Customize Prompt"
        ↓
Mosaic displays creator-defined elements
        ↓
User modifies values
        ↓
Mosaic builds customized Prompt
        ↓
User reviews result
```

The exact interface is intentionally not specified here.

The product requirement is the behavior, not a particular visual design.

---

# Live Prompt Preview

A customization experience may show how changes affect the final Prompt.

Example:

```text
Character
[ Medieval knight ]

Environment
[ Frozen forest ]

               ↓

A medieval knight walking through a frozen forest...
```

✅ **Decided — Principle**

Users should be able to understand the resulting Prompt before using it.

Whether updates happen instantly or through an explicit preview action is a UX implementation decision.

---

# Customized Prompt

A **Customized Prompt** is the result produced after applying the user's selected values.

Conceptually:

```text
Original Prompt
      +
Customization Values
      =
Customized Prompt
```

The customized result does not automatically become public content.

---

# Customization Is Not Publication

✅ **Decided**

Changing Prompt values inside the customization interface does **not** create a new Mosaic Creation.

It is initially a private working state.

```text
Creation A
    ↓
Customize
    ↓
Customized Prompt
    ↓
Use / Copy / Continue Editing
```

Nothing new enters Mosaic's public lineage until the user intentionally publishes a new Creation.

---

# Customization Is Not Remix Yet

This distinction is important.

```text
CUSTOMIZATION
Private preparation

REMIX
Published derived Creation
```

A user may customize a Prompt and never publish anything.

Therefore, simply opening or changing customization fields should not create lineage relationships.

---

# From Customization to Remix

After customizing a Prompt, a user may use it with an external generation tool.

If they obtain a result they want to share, they may return to Mosaic and publish it as a new derived Creation.

Conceptually:

```text
Creation A
      ↓
Customize Prompt
      ↓
Customized Prompt
      ↓
Generate externally
      ↓
Generated Result
      ↓
Publish on Mosaic
      ↓
Creation B
derived from Creation A
```

At that moment, the creative lineage becomes persistent.

---

# Lineage Context During Customization

✅ **Decided — Principle**

When customization begins from an existing Creation, Mosaic should retain enough temporary context to know where the process originated.

This makes it possible to preserve attribution if the user later publishes the result through the intended flow.

The exact duration and technical persistence of this context will be defined later.

---

# Manual Prompt Editing

Users should not be limited to creator-defined variables.

A user may want to change something that the original creator did not mark as customizable.

Therefore:

✅ **Decided — Principle**

Customization features should assist Prompt modification without unnecessarily preventing manual creative changes.

For example:

```text
Creator exposed:

Character
Environment
Camera

User also wants to change:
Lighting
```

Mosaic should not treat the creator-defined variables as ownership boundaries over the Prompt.

They are guidance.

---

# Structured Customization and Raw Editing

Mosaic may eventually support two complementary approaches:

```text
Guided Customization
        +
Advanced / Raw Prompt Editing
```

Guided customization helps users understand the Prompt.

Raw editing preserves freedom.

The exact interface between these modes will be defined during UX planning.

---

# Original Creation Integrity

✅ **Decided**

Customization performed by another user must never modify the source Creation.

Example:

```text
Creation A
Prompt:
"A knight in a forest"

Carlos customizes:
"A robot in a city"
```

Creation A remains:

```text
"A knight in a forest"
```

Carlos' changes belong only to his customization state unless he intentionally publishes a new Creation.

---

# Creator Updates

If the original creator later discovers a better Prompt technique, they should not silently replace the historical creative meaning of the existing Creation.

Instead, meaningful evolution should be published as another derived Creation.

Example:

```text
Creation A — @Ana
Original Prompt
       │
       └── Creation B — @Ana
           Improved approach
```

This follows the same historical model used for community evolution.

---

# Customizing a Remix

A Remix is itself a Creation.

Therefore, if Creation B was derived from Creation A:

```text
Creation A
    ↓
Creation B
```

another user may customize B:

```text
Creation A
    ↓
Creation B
    ↓
Customization
    ↓
Creation C
```

If C is published, its direct source is B.

The full lineage still allows Mosaic to trace the idea back through A.

---

# Nested Customization Does Not Flatten Lineage

✅ **Decided**

Mosaic should preserve direct creative relationships rather than connecting every descendant directly to the original.

Correct:

```text
A
↓
B
↓
C
```

Not:

```text
A
├── B
└── C
```

when C was actually derived from B.

This preserves how the idea truly evolved.

---

# Copying the Customized Prompt

Users should be able to copy the resulting Prompt for use in external AI generation tools.

Conceptually:

```text
Customize
    ↓
Review
    ↓
Copy Prompt
    ↓
Use externally
```

Copying alone does not publish anything to Mosaic.

---

# External Generation

✅ **Decided — Current Scope**

Mosaic initially organizes and supports the creative process but does not need to generate the AI video itself.

The generation process may happen in external tools.

This keeps Mosaic focused on:

* discovery;
* Prompt knowledge;
* customization;
* community;
* creative evolution;
* lineage.

Future integrations may change the experience without requiring Mosaic to become an AI model provider.

---

# Generation Integrations

🔮 **Future Possibility**

Mosaic may eventually integrate directly with external generation providers.

A future flow could potentially become:

```text
Customize
    ↓
Generate
    ↓
Review Result
    ↓
Publish
```

without requiring the user to manually leave Mosaic.

However, this is not an initial product requirement.

Such integrations may involve:

* provider APIs;
* authentication;
* credits;
* billing;
* provider-specific restrictions;
* asynchronous generation;
* moderation;
* storage;
* failure handling.

They should be evaluated independently.

---

# AI-Assisted Customization

🔮 **Future Possibility**

Mosaic may eventually help users understand or modify Prompts using AI.

Potential examples include:

* identifying possible customizable elements;
* explaining what a Prompt section does;
* suggesting alternatives;
* helping restructure a Prompt;
* adapting instructions for another model.

These capabilities should assist users rather than silently rewrite creator content.

---

# Customization Compatibility

Different Prompt formats may support different levels of customization.

For example:

```text
Plain Prompt
→ manual editing

Structured Prompt
→ guided customization + manual editing

Future workflow format
→ format-specific customization
```

Mosaic should degrade gracefully.

A Prompt should remain useful even when advanced customization features are unavailable.

---

# Extensibility

✅ **Decided — Principle**

The Customization System must be designed so that future Prompt structures can introduce new customization capabilities without requiring Mosaic's core creative model to be replaced.

This follows the broader Mosaic principle:

> **Build for evolution, not speculation.**

The initial system should solve current needs well while keeping reasonable extension points for future Prompt technologies.

---

# Validation

Customization values may require validation depending on their type or purpose.

For example:

```text
Duration → number/range
Text → text
Selection → known option
```

Validation should protect system integrity without unnecessarily restricting creative expression.

Detailed validation rules will be defined after the technical representation of customization variables is selected.

---

# Safety and Moderation

Customized Prompt values may contain user-generated content.

Private customization should therefore still be treated as potentially untrusted input from a security perspective.

If a customized Prompt becomes a published Creation, the resulting content enters Mosaic's normal publication and moderation processes.

Detailed moderation behavior belongs to:

[Moderation & Trust](./moderation.md)

---

# Important Product Decisions

| Decision                                                         | Status    |
| ---------------------------------------------------------------- | --------- |
| Prompt customization is optional                                 | ✅ Decided |
| Creators choose which elements to highlight as customizable      | ✅ Decided |
| Customization variables are not universal across all Prompts     | ✅ Decided |
| Variables may include human-readable guidance                    | ✅ Decided |
| Suggested values normally guide rather than restrict users       | ✅ Decided |
| Users should understand the resulting Prompt before using it     | ✅ Decided |
| Customization does not modify the original Creation              | ✅ Decided |
| Customization alone does not create a Remix                      | ✅ Decided |
| Customization is initially a private working state               | ✅ Decided |
| Publication creates the persistent derived Creation              | ✅ Decided |
| Manual Prompt modification should remain possible                | ✅ Decided |
| Creator-defined variables are guidance, not ownership boundaries | ✅ Decided |
| Derived Creations preserve their direct parent relationship      | ✅ Decided |
| AI generation initially happens outside Mosaic                   | ✅ Decided |
| Exact variable syntax                                            | 🟡 Open   |
| Initial variable input types                                     | 🟡 Open   |
| Optional/conditional variable behavior                           | 🟡 Open   |
| Persistence duration of unfinished customization                 | 🟡 Open   |
| Direct AI generation integrations                                | 🔮 Future |
| AI-assisted customization                                        | 🔮 Future |

---

# Future Possibilities

🔮 Mosaic may eventually support:

* visual Prompt builders;
* conditional Prompt sections;
* reusable customization components;
* model-specific customization interfaces;
* automatic variable detection;
* AI-assisted customization;
* Prompt explanations;
* direct AI generation integrations;
* saved customization sessions;
* comparison between customization results;
* collaborative customization;
* advanced validation;
* reusable personal presets.

These are possibilities rather than current implementation requirements.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [Publications](./publications.md)
* [Prompt System](./prompts.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Social System](./social.md)
* [Moderation & Trust](./moderation.md)
* [Business Rules](../02-specification/business-rules.md)
* [User Flows](../02-specification/user-flows.md)
* [Data Model](../03-technical/data-model.md)

---

**Previous:** [← Prompt System](./prompts.md) · [Documentation Home](../README.md) · **Next:** [Remix & Lineage →](./remix-lineage.md)
