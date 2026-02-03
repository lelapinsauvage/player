# Working with Karim - A Guide for Claude Agents

## Who is Karim?

Karim (@mawzeeeee) is a design-focused engineer who builds highly polished, visually stunning web experiences. He has strong opinions about aesthetics and UX, and he knows when something doesn't feel right - even if he can't always articulate exactly why at first.

---

## How We Built This Project

### The Product
A vinyl record player web app with:
- 3D Three.js vinyl player with realistic materials
- ASCII shader backgrounds from video sources
- WebGL aurora clouds that react to music
- Audio-reactive visualizer bars
- Cinematic lighting that adapts to track colors
- Physics-based animations and transitions

### The Journey
1. **Started with a vision** - Karim wanted a Codrops-worthy vinyl player
2. **Iterated on feel** - Many rounds of "make it hit harder", "too shiny", "doesn't feel right"
3. **Added personality** - ASCII aesthetic, glitch transitions, physics-based menu animations
4. **Refined details** - Loader, progress bar, menu interactions

---

## How Karim Thinks

### 1. Feeling Over Specification
Karim communicates in feelings and vibes, not detailed specs:
- "make it hit harder" = increase intensity, contrast, impact
- "it's worse" = trust this, revert and try differently
- "I hate how it's closing" = the animation lacks soul/cohesion

**What to do:** Ask clarifying questions if needed, but also trust your design instincts. Propose options.

### 2. Reference-Driven
Karim learns from the best:
- "Go online and read how Apple does morphing"
- References Emil Kowalski's design engineering principles
- Wants Codrops-level polish

**What to do:** Use the skills available (like `/emil-design-engineering`). Research before implementing. Apply industry best practices.

### 3. Cohesive Aesthetic
Everything should feel like it belongs together:
- ASCII dissolve for menu > generic fall animation (matches the ASCII shader theme)
- Track accent colors should influence everything (lighting, particles, UI)
- Transitions should have personality, not just function

**What to do:** Before implementing, ask: "Does this match the visual language of the rest of the app?"

### 4. Iterative Refinement
Karim refines through rapid feedback:
- First attempt rarely perfect
- "it's worse" means revert immediately, don't defend
- Will often say "ok do it" when a plan sounds right

**What to do:** Be ready to revert. Don't over-invest in one approach. Keep changes isolated so they're easy to undo.

---

## Working Style Preferences

### DO:
- **Propose a plan before coding** - Karim explicitly asked for this
- **Revert quickly when something is worse** - Don't argue, just fix
- **Use available skills** - Emil's design engineering guide, etc.
- **Keep the aesthetic cohesive** - ASCII, vinyl, cinematic
- **Make it feel premium** - Codrops-level polish
- **Be concise** - Short responses, get to the point

### DON'T:
- **Don't over-engineer** - Simple solutions that feel good > complex solutions that are technically impressive
- **Don't defend bad implementations** - If Karim says "it's worse", believe them
- **Don't add features without asking** - Stay focused on what's requested
- **Don't use generic solutions** - Everything should feel custom and intentional

---

## Communication Patterns

### When Karim says:
| Phrase | Meaning |
|--------|---------|
| "it's worse" | Revert immediately, try a different approach |
| "go" / "ok do it" | Plan approved, implement now |
| "make it hit harder" | More intensity, contrast, impact |
| "I don't like it" | Trust this, propose alternatives |
| "what do u think?" | Give honest opinion, propose the better option |
| "fix it pls" | Something broke or regressed, investigate and fix |
| "can u make..." | Feature request, clarify if needed then implement |

### Response Style Karim Prefers:
- Short, direct answers
- Show what changed, not lengthy explanations
- Use bullet points for clarity
- Include "try it out" after implementation

---

## Technical Context

### Stack:
- Vanilla JS (ES modules)
- Three.js for 3D
- WebGL shaders (ASCII, aurora clouds)
- Web Audio API for visualizer
- CSS animations + JS for complex effects

### Key Files:
- `main.js` - All application logic (~3500 lines)
- `style.css` - All styles (~1700 lines)
- `index.html` - Minimal markup

### Architecture Patterns:
- Global state variables at top of sections
- Functions grouped by feature (loader, menu, visualizer, etc.)
- CSS handles simple animations, JS handles complex/dynamic ones
- Track data includes colors, soul parameters, viz colors

---

## Design Principles (from Emil Kowalski)

Always reference `/emil-design-engineering` for:
1. **Only animate transform and opacity** - Never width/height
2. **Use ease-out for exits** - 150-250ms duration
3. **Speed over delight** - Fast, purposeful animations
4. **No layout shift** - Use fixed dimensions
5. **prefers-reduced-motion** - Always add support

---

## Example Interaction Pattern

**Good flow:**
```
Karim: "make the menu close animation feel better"
Claude: *reads current code*
Claude: "I see it's using width/height animations. Based on Emil's principles,
        I should use transform only. I could do:
        1. Scale + fade (simple, fast)
        2. ASCII dissolve (matches your aesthetic)
        Which direction?"
Karim: "2"
Claude: *implements*
Claude: "Done. Menu now dissolves into ASCII particles in your accent color. Try it."
```

**Bad flow:**
```
Karim: "make the menu close animation feel better"
Claude: *writes 200 lines of complex FLIP animation code*
Karim: "it's worse"
Claude: "But this is technically the correct approach because..." // NO! Just revert.
```

---

## Key Learnings from This Session

1. **Preloader matters** - Users need immediate feedback (blinking rectangle while loading)
2. **Cohesion > novelty** - ASCII dissolve beat physics fall because it matched the theme
3. **Simple often wins** - Complex FLIP morphing was worse than simple scale+fade
4. **Revert fast** - When something is worse, git checkout and try again
5. **Use the skills** - Emil's guide saved us from bad animation patterns

---

## Final Notes

Karim builds with intention. Every detail matters. The goal isn't just "working" - it's "feeling magical." When in doubt, ask yourself: "Would this be featured on Codrops?"

Trust Karim's instincts on feel. Trust Emil's principles on implementation. Ship fast, iterate faster.
