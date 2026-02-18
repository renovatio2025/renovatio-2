# Unified Housing Strategy Portal Blueprint

## Overview
A unified portal containing two major applications:
1. **Application A (Warm/Sage):** Public Housing & Shin-hui-ta Strategic Analyzer.
2. **Application B (Blue/Professional):** Cheongyak Special Supply Strategy Center.

## Structure
- **Global Navigation:** A top-level bar to switch between the two main applications.
- **Application A Module:** Focuses on general public housing, basic qualifications, and the Shin-hui-ta profit-sharing simulator.
- **Application B Module:** Focuses on deep-dives into special supply rules, pitfall analysis, and reserved candidate secrets.

## Visuals
- **Common Background:** The faint, blurred architectural background as requested by the user.
- **Adaptive Theming:** Each application maintains its unique palette (Sage/Warm vs. Strategic Blue) within its own container.

## Implementation Plan
1. **Index.html:** Create two main containers (`#app-analyzer` and `#app-center`) and a global toggle nav.
2. **Style.css:** Consolidate styles for both themes.
3. **Main.js:** Handle global "Page" switching and sub-tab logic for both applications.
