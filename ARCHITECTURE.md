# Architecture Setup & Guidelines

This document details the architectural decisions for the Cookidea project, adhering to the "Architecture Guardian" constraints.

## Principles
1. **Separation of Concerns**: Business logic and UI are completely separated.
2. **Feature Isolation**: We follow a feature-based folder structure located entirely inside `src/features/cookidea/`.
3. **Abstraction/Inversion of Control**: AI capabilities are abstracted behind interfaces, specifically `IRecipeGenerator`.

## Directory Structure
```
src/
├── core/                  # Global domain abstractions
│   └── interfaces/        # e.g., ai-service.interface.ts
├── features/
│   └── cookidea/          # The Recipe Generator Feature
│       ├── components/    # Dumb UI Components (Modular CSS)
│       ├── hooks/         # Smart Controllers (Business Logic bridges)
│       └── services/      # Injected Services (API Integrations, Mocks)
└── App.tsx                # Composition Root
```

## Adding Future Features
- Create a new directory under `src/features/`.
- Ensure new features define their required interfaces in `src/core/interfaces` if they must be shared, or within their feature directory if they are private.
- Do not add business logic to `.tsx` component files. Use hooks or services.
