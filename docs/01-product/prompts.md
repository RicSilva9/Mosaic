# Prompt System

> **Section:** Product
> **Status:** Active Specification
> **Audience:** Everyone
> **Last updated:** September 2026

---

## Overview

The **Prompt System** defines how Mosaic represents, preserves, presents, and understands the instructions behind AI-generated creations.

Prompts are one of the fundamental components of Mosaic.

However, Mosaic should not treat a prompt merely as a text field.

A prompt may contain:

* natural-language instructions;
* structured sections;
* customizable elements;
* references;
* model-specific instructions;
* parameters;
* generation context;
* multiple parts or stages;
* information that may change as AI generation technologies evolve.

The Prompt System must therefore balance two needs:

```text
SIMPLE ENOUGH
for creators to publish prompts easily

        +

FLEXIBLE ENOUGH
to evolve with generative AI
```

Mosaic should support how prompts work today without assuming they will always work the same way.

---

# Why This System Exists

A traditional social platform primarily stores the final result:

```text
Video
Image
Post
```

Mosaic is interested in both:

```text
RESULT
   ↕
CREATIVE INSTRUCTIONS
```

The prompt provides knowledge about how the result was produced.

Preserving this information allows users to:

* understand how a Creation was made;
* learn prompting techniques;
* reuse ideas;
* customize existing instructions;
* compare approaches;
* create Remixes;
* observe how prompting techniques evolve through new Creations.

The Prompt System therefore acts as one of Mosaic's primary knowledge layers.

---

# Prompt as a Creative Artifact

✅ **Decided**

Mosaic considers a Prompt a **creative artifact**, not merely a string of text.

At the simplest level, a Prompt may still be plain text:

```text
A medieval city at sunrise, cinematic lighting...
```

But Mosaic should not architect the product around the assumption that every Prompt will always be represented this way.

A more sophisticated Prompt could conceptually contain:

```text
PROMPT
│
├── Instructions
├── Components
├── Customizable Elements
├── References
├── Parameters
└── Generation Context
```

Not every Prompt needs every component.

---

# Simple Prompts

Mosaic must remain easy to use.

A creator should be able to publish a straightforward prompt without manually defining complex structures.

Example:

```text
A lone astronaut walking through an abandoned city,
cinematic lighting, slow camera movement, fog,
realistic visual style.
```

This should remain a perfectly valid Mosaic Prompt.

Structured capabilities should enhance advanced prompts rather than make simple prompts difficult to publish.

---

# Structured Prompts

More advanced creators may want to document prompts in a more organized way.

Conceptually, a prompt might contain recognizable parts such as:

```text
Subject
Environment
Action
Camera
Lighting
Style
Audio
Constraints
```

For example:

```text
Subject:
A lone astronaut

Environment:
An abandoned futuristic city covered in fog

Action:
Walking slowly through the street

Camera:
Low-angle tracking shot

Lighting:
Soft cinematic sunrise

Style:
Photorealistic science-fiction film
```

Mosaic may allow creators to identify or organize these elements when useful.

However:

✅ **Decided — Principle**

Mosaic must **not require every Prompt to follow one universal structure**.

Different AI tools, models, workflows, and future technologies may require different forms of instruction.

---

# Prompt Components

A **Prompt Component** represents a meaningful part of a Prompt.

Examples may include:

```text
Character
Environment
Action
Camera
Lighting
Style
Dialogue
Audio
Motion
Constraints
```

These are examples rather than a fixed Mosaic vocabulary.

Prompt Components may eventually support:

* organization;
* explanation;
* customization;
* comparison;
* Remixing;
* advanced search.

The exact representation will be defined alongside Prompt Customization and the Data Model.

---

# Customizable Elements

A creator may identify certain parts of a Prompt as particularly suitable for modification.

Example:

```text
A {{character}} walking through {{environment}},
wearing {{clothing}}, filmed using {{camera_style}}.
```

Possible values:

```text
character:
young explorer

environment:
ancient jungle

clothing:
weathered expedition clothing

camera_style:
handheld documentary camera
```

This allows another user to understand what can be changed without manually analyzing the entire Prompt.

Detailed behavior belongs to:

[Prompt Customization](./customization.md)

---

# Raw Prompt Preservation

✅ **Decided — Principle**

Mosaic should preserve the Prompt associated with a published Creation.

Structured features should not unnecessarily destroy or rewrite the creator-provided instructions.

Conceptually:

```text
Published Prompt
      │
      ├── Structured information
      ├── Customizable elements
      └── Platform metadata
```

This is important for:

* historical accuracy;
* Remixing;
* lineage;
* model compatibility;
* future migrations.

A published Creation represents the creative state that existed when it was published.

---

# Prompt and Generation Context

The same Prompt may produce different results depending on the generation environment.

For example:

```text
Same Prompt
   │
   ├── Model A → Result A
   ├── Model B → Result B
   └── Model C → Result C
```

Therefore, the Prompt should not be treated as the only information necessary to understand a Creation.

Mosaic should associate relevant generation context with the Creation.

---

# Provider

A **Provider** represents the platform, service, or system involved in generation.

Mosaic should avoid designing its domain around a specific provider.

Conceptually:

```text
Generation Context
│
├── Provider
├── Model
├── Model Version
└── Parameters
```

This allows the platform to evolve as generation technologies change.

---

# Model

Creators should be able to identify the model used when that information is known and relevant.

The model should not be assumed to belong permanently to a predefined fixed list.

New models will appear, existing models may disappear, and providers may rename or replace them.

Therefore:

✅ **Decided — Principle**

The Prompt System must not require Mosaic's core architecture to be rewritten whenever a new AI model appears.

---

# Model Versions

Where relevant, creators may identify the model version used.

This can be important because the same Prompt may behave differently between versions of the same model.

Example:

```text
Prompt P
│
├── Model v1 → Result A
└── Model v2 → Result B
```

The model version describes the generation environment.

It is **not a version of the Mosaic Creation itself**.

---

# Generation Parameters

AI generation systems may expose parameters beyond the Prompt itself.

Examples could include:

```text
Duration
Aspect ratio
Seed
Resolution
Motion settings
Style settings
Reference strength
```

These parameters vary significantly between models and providers.

For this reason:

✅ **Decided — Principle**

Mosaic should not assume that every generation system exposes the same parameter schema.

The technical architecture should support flexible provider/model-specific parameters without sacrificing validation or usability.

---

# Unknown or Unsupported Models

A creator should not necessarily be prevented from documenting a Creation simply because Mosaic does not yet recognize the generation model they used.

This is particularly important in a rapidly evolving ecosystem.

Conceptually, Mosaic should be able to distinguish:

```text
Known model
     vs.
Creator-provided model information
```

The exact trust, validation, and display behavior will be defined later.

---

# Prompt Evolution Through New Creations

✅ **Decided**

A published Creation does not need to evolve internally when its creator discovers a better way to use the Prompt.

Instead, the creator may publish a **new Creation derived from the previous one**.

Example:

```text
Creation A — @Ana
Original technique
        │
        ├── Creation B — @Ana
        │   Updated technique
        │
        └── Creation C — @Carlos
            Different interpretation
```

Both B and C represent new creative developments originating from A.

This allows Mosaic to preserve the history of the idea rather than silently replacing it.

---

# Creator Republishing

A creator may build upon their own previous Creation.

For example:

```text
@Ana publishes Creation A

Later...

@Ana discovers:
- a better camera instruction;
- improved model compatibility;
- a better Prompt structure;
- more effective parameters.

@Ana publishes Creation B
based on Creation A.
```

Creation A remains historically intact.

Creation B becomes another Creation in the lineage.

This means the community can see not only the latest technique, but also **how the creator's own approach evolved**.

---

# Republishing vs Remixing by Another Creator

The underlying relationship is similar:

```text
Creation A — @Ana
│
├── Creation B — @Ana
│   Updated approach
│
├── Creation C — @Carlos
│   Carlos' interpretation
│
└── Creation D — @Maria
    Maria's interpretation
```

All are new Creations derived from A.

The author relationship provides additional context, but the historical lineage remains based on derivation between Creations.

The exact terminology and UI presentation for self-republication versus community Remixing will be finalized in:

[Remix & Lineage](./remix-lineage.md)

---

# Edit vs New Creation

Mosaic should distinguish between **correcting a Creation** and **evolving the creative work**.

### Edit

An Edit preserves the meaning of the existing Creation.

Examples may include:

```text
Typo correction
Description formatting
Metadata correction
Tag adjustment
```

### New Derived Creation

A new Creation represents a meaningful creative change.

Examples may include:

```text
Substantially improved Prompt
New prompting technique
Different generated result
Adaptation to a new model
Important generation changes
Different creative approach
```

Therefore:

> **Corrections may edit the existing Creation. Creative evolution produces another Creation.**

Detailed boundaries will be formalized later in Business Rules.

---

# Why Republishing Matters

This model allows Mosaic to preserve creative history naturally.

Instead of:

```text
Creation A
v1
v2
v3
v4
```

Mosaic represents evolution as:

```text
Creation A
│
├── Creation B
│   └── Creation D
│
└── Creation C
```

This is much closer to Mosaic's core philosophy.

Each evolution becomes another **piece of the mosaic**.

---

# Prompt Adaptation for Different Models

A creator may adapt an existing Prompt to work better with another AI model.

Instead of overwriting the previous Creation, they may publish another derived Creation.

Example:

```text
Creation A
Model X
    │
    └── Creation B
        Adapted for Model Y
```

Both approaches remain discoverable and historically connected.

---

# Multi-Part Prompts

Some generation workflows may require more than one instruction.

Conceptually:

```text
Generation Workflow
│
├── System instruction
├── Scene description
├── Camera instruction
├── Audio instruction
└── Additional generation data
```

🔮 **Future-Compatible Principle**

Mosaic's architecture should avoid assuming that one Creation can only ever contain one flat text instruction.

This does not mean the first implementation must provide a complex workflow editor.

It means the data model should avoid making future evolution unnecessarily difficult.

---

# References

Some AI generation systems may use additional references such as:

* images;
* video;
* audio;
* style references;
* character references;
* other generated assets.

🔮 **Future Possibility**

Mosaic may eventually allow creators to document these references as part of the generation process.

The initial scope will be determined later.

---

# Prompt Visibility

✅ **Decided**

The Prompt associated with a publicly published Creation should normally be visible to other users.

This is fundamental to Mosaic's purpose as a platform for creative knowledge, customization, and Remixing.

A public Creation whose Prompt is permanently hidden would undermine the core discovery model of Mosaic.

---

# Copying Prompts

Users should be able to conveniently use published Prompts outside Mosaic.

This may include a direct **Copy Prompt** action.

Copying a Prompt does not create a new Mosaic Creation by itself.

Conceptually:

```text
Copy Prompt
    ↓
Use externally
    ↓
No new Mosaic Creation exists yet
```

If the user later publishes their result as a derived Creation, Mosaic can preserve its relationship with the source.

---

# Attribution Outside Mosaic

Mosaic can preserve attribution and lineage inside the platform.

It cannot guarantee that users who copy content to external systems will preserve those relationships.

The platform may encourage responsible attribution, but technical guarantees end at Mosaic's boundaries.

---

# Prompt Search

Prompt information may eventually contribute to discovery.

Potential searchable information includes:

* prompt text;
* components;
* model;
* provider;
* tags;
* categories;
* customizable elements.

Detailed search behavior belongs to:

[Discovery & Search](./discovery.md)

---

# Prompt Safety

Prompts are user-generated content and therefore fall under Mosaic's community and moderation rules.

Prompt content may be analyzed or restricted when necessary for:

* platform safety;
* abuse prevention;
* legal compliance;
* moderation.

Detailed behavior belongs to:

[Moderation & Trust](./moderation.md)

---

# Extensibility Principle

✅ **Decided**

The Prompt System should follow:

> **Build for evolution, not speculation.**

Mosaic should support current prompting workflows while avoiding unnecessary assumptions about how generative AI will work permanently.

This means:

```text
Stable Core
│
├── Creation
├── Prompt
├── Author
└── Lineage

Evolvable Context
│
├── Providers
├── Models
├── Parameters
├── Prompt structures
└── Generation techniques
```

The stable concepts should remain understandable even as the surrounding technology changes.

---

# Provider Independence

✅ **Decided — Principle**

Mosaic should remain independent from any single AI generation provider whenever reasonably possible.

Provider-specific capabilities may be supported without becoming assumptions of the entire product.

This allows Mosaic to integrate with new technologies while preserving its core product model.

---

# Backward Compatibility

✅ **Decided — Principle**

New Prompt capabilities should not unnecessarily invalidate older Creations.

When Mosaic introduces new structures, models, parameters, or Prompt capabilities, existing published Creations should remain understandable whenever reasonably possible.

Technical mechanisms may include:

* migrations;
* compatibility layers;
* preserved historical representations;
* extensible schemas.

Exact strategies belong to Technical Design.

---

# Important Product Decisions

| Decision                                                            | Status    |
| ------------------------------------------------------------------- | --------- |
| Prompts are creative artifacts, not merely text fields              | ✅ Decided |
| Simple plain-text Prompts remain supported                          | ✅ Decided |
| Structured Prompt capabilities are optional                         | ✅ Decided |
| No universal Prompt structure is required                           | ✅ Decided |
| Published Prompt information should preserve its historical meaning | ✅ Decided |
| Prompts may contain customizable elements                           | ✅ Decided |
| Generation context is distinct from the Prompt itself               | ✅ Decided |
| Mosaic should remain provider-independent where reasonable          | ✅ Decided |
| New AI models should not require redesigning Mosaic's core          | ✅ Decided |
| Generation parameters must allow model-specific variation           | ✅ Decided |
| Creative Prompt evolution produces a new derived Creation           | ✅ Decided |
| Creators may republish improved approaches to their own Creations   | ✅ Decided |
| Previous Creations remain historically intact                       | ✅ Decided |
| Self-republication participates in creative lineage                 | ✅ Decided |
| Public Creation Prompts are normally visible                        | ✅ Decided |
| Older Creations should remain compatible as Mosaic evolves          | ✅ Decided |
| Exact Edit vs New Creation boundaries                               | 🟡 Open   |
| Exact terminology for self-republication                            | 🟡 Open   |
| Reference asset support                                             | 🔮 Future |
| Advanced multi-stage workflows                                      | 🔮 Future |

---

# Future Possibilities

🔮 Mosaic may eventually support:

* model-specific Prompt editors;
* visual Prompt builders;
* Prompt comparison;
* automatic Prompt structure detection;
* AI-assisted Prompt analysis;
* Prompt optimization suggestions;
* model conversion assistance;
* reusable Prompt components;
* multi-stage generation workflows;
* reference assets;
* advanced parameter schemas;
* Prompt compatibility indicators;
* integrations with generation providers.

These possibilities are **not current requirements**.

They represent capabilities the platform may explore as generative technology and user needs evolve.

---

# Related Documentation

* [Product Vision](./product-vision.md)
* [Publications](./publications.md)
* [Prompt Customization](./customization.md)
* [Remix & Lineage](./remix-lineage.md)
* [Discovery & Search](./discovery.md)
* [Moderation & Trust](./moderation.md)
* [Business Rules](../02-specification/business-rules.md)
* [Data Model](../03-technical/data-model.md)
* [API](../03-technical/api.md)

---

**Previous:** [← Publications](./publications.md) · [Documentation Home](../README.md) · **Next:** [Prompt Customization →](./customization.md)
