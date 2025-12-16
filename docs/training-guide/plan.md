The Gold Standard: A Layered Training System (Not One Guide)

1. Role-Based Learning Paths (Top Layer)

Start outside the product, not inside it.

Each role gets a clear path:
	•	Content Editors
	•	Developers
	•	Architects
	•	Admins / Power Users

Each path answers:
	•	What do I need to do?
	•	What do I need to understand?
	•	What do I need to ignore?

Format
	•	Short overview page
	•	5–10 core tasks per role
	•	Clear “you’re done when you can do X” outcomes

Devil’s advocate:
If you can’t describe a role’s success in 5–10 concrete actions, your product mental model is already too fuzzy.

⸻

2. Task-First Guides (Core Training Content)

This is where most SaaS training should live.

Each guide is:
	•	One task
	•	One outcome
	•	One mental model

Example:

"Create a reusable content component used across multiple pages"

Recommended structure
	1.	What you’re accomplishing (business + product context)
	2.	Why it works this way (mental model, not implementation)
	3.	Steps (numbered, skimmable)
	4.	Common mistakes (this is huge for complex SaaS)
	5.	What to do next

Format
	•	Text + annotated screenshots
	•	Short embedded video (optional, <3 min)
	•	Copy-paste examples for dev workflows

Devil’s advocate:
If a task guide needs a 10-minute video, it’s compensating for product complexity or unclear concepts.

⸻

3. Concept Guides (Mental Models Layer)

This is where complex SaaS usually fails.

AgilityCMS-style products need explicit explanations of:
	•	Content modeling philosophy
	•	Separation of content vs presentation
	•	API-first / headless thinking
	•	Reusability vs page-centric CMS thinking

Format
	•	Concept → analogy → concrete example
	•	Diagrams over screenshots
	•	No step-by-step here

These should answer:
	•	“Why is this designed this way?”
	•	“How should I think about this long-term?”

Devil’s advocate:
If customers keep asking “why can’t I just…”, your concept docs are either missing or buried.

⸻

4. In-Product Micro Guidance (Just-in-Time)

This is not your main training—but it’s critical.

Examples:
	•	Inline tooltips
	•	Empty-state explanations
	•	“Learn more” links to task guides
	•	Contextual warnings

Rule of thumb
	•	Teach what this is
	•	Never teach everything in-product

Devil’s advocate:
If users need external docs just to understand a blank screen, the UI is doing too much thinking for itself.

⸻

5. Reference Docs (Bottom Layer)

This is what devs expect—but shouldn’t start with.

Includes:
	•	API reference
	•	Field definitions
	•	Configuration options
	•	Limits and edge cases

Format
	•	Highly scannable
	•	No storytelling
	•	Linked from task guides, never standalone

Devil’s advocate:
If someone’s first success depends on reference docs, onboarding is already broken.

⸻

The Recommended “Training Stack” for Complex SaaS

If I had to lock this into a concrete setup:
	•	Docs Site
	•	Role-based learning paths
	•	Task-oriented guides
	•	Concept explanations
	•	Short Videos
	•	Optional reinforcement, not primary teaching
	•	In-Product Links
	•	Always deep-link to a specific task or concept
	•	Sample Projects
	•	Realistic, not “Hello World”

⸻

The Most Common Mistakes (Especially for Dev-Led Products)
	1.	Organizing by features instead of outcomes
	2.	Assuming users want to “learn the product”
	3.	Overusing video
	4.	Explaining how without explaining why
	5.	One giant guide instead of composable pieces

⸻

A Useful Litmus Test

Ask this for every guide:

“Could a motivated but unfamiliar user complete this task without already understanding our product philosophy?”

If the answer is no, you need a concept guide—or a simpler product abstraction.