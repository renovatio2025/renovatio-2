# Public Housing & Shin-hui-ta Strategy Analyzer Blueprint

## Overview
A strategic analysis tool for South Korea's public housing (3rd New Cities) and Shin-hui-ta (Newlywed Hope Town) subscription systems. It helps users understand supply ratios, check qualifications, and calculate scores for special supplies.

## Features
- **Supply Ratio Visualization:** Doughnut chart showing the 80:20 Special/General supply split.
- **Qualification Checklist:** Interactive breakdown of savings, housing status, and asset limits.
- **Special Supply Calculators:** Tabbed interface with custom calculators for:
    - Multi-child Families (100pt scale)
    - Newlyweds (13pt scale)
    - First-life Buyers (Qualification summary)
    - Newborn Special Supply (10pt scale)
- **Shin-hui-ta Simulator:** Profit-sharing mortgage simulator with LTV, duration, and child count variables.

## Technical Stack
- **Styling:** Tailwind CSS (for layout) + Custom Vanilla CSS (for components).
- **Visualization:** Chart.js for data representation.
- **Interactivity:** Vanilla JavaScript for calculation logic and tab management.
- **Typography:** Noto Sans KR for professional readability.

## Design
- **Palette:** Warm Neutrals & Sage Green (#F9F9F7 background, Navy primary, Amber accent).
- **Feel:** Trustworthy, analytical, and modern.
- **Responsiveness:** Mobile-first approach with optimized chart containers.

## Implementation Steps
1. **Update index.html:** Implement the structure and link dependencies.
2. **Update style.css:** Add custom slider and tab styles.
3. **Update main.js:** Implement calculation logic and Chart.js initialization.
