# KALNET CRM — FS-5 Internal CRM + Client Onboarding

**System 3 · Full Stack · April 2026**

Issued by: Rishav Raj, CTO & Co-Founder | KALNET

---

## Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Frontend  | Next.js 14 (App Router)             |
| Styling   | Tailwind CSS                        |
| Drag & Drop | @hello-pangea/dnd                 |
| ORM       | Prisma 5                            |
| Database  | MySQL 8                             |
| Language  | TypeScript                          |

---

## Project Structure

```
kalnet-crm/
├── app/
│   ├── (dashboard)/                  # Route group — all pages with Sidebar
│   │   ├── layout.tsx                # Dashboard shell: Sidebar + main
│   │   ├── page.tsx                  # /  → Kanban pipeline board
│   │   ├── settings/page.tsx         # /settings
│   │   └── admin/crm/analytics/
│   │       └── page.tsx              # /admin/crm/analytics
│   ├── api/
│   │   ├── prospects/
│   │   │   ├── route.ts              # GET all | POST create
│   │   │   └── [id]/
│   │   │       ├── route.ts          # GET one | PATCH update/stage
│   │   │       ├── notes/route.ts    # POST append note
│   │   │       └── checklist/
│   │   │           └── [checklistId]/route.ts  # PATCH toggle status
│   │   └── analytics/route.ts        # GET analytics summary
│   ├── globals.css
│   └── layout.tsx                    # Root HTML shell
├── components/
│   ├── kanban/
│   │   ├── KanbanBoard.tsx           # DragDropContext, orchestrates board
│   │   ├── KanbanColumn.tsx          # Droppable column
│   │   ├── KanbanHeader.tsx          # Overdue/due-today summary bar
│   │   └── ProspectCard.tsx          # Draggable prospect card
│   ├── drawers/
│   │   ├── ProspectDrawer.tsx        # Slide-over detail drawer
│   │   └── OnboardingChecklist.tsx   # 10-step checklist UI
│   ├── analytics/
│   │   └── AnalyticsDashboard.tsx    # KPIs + funnel chart
│   ├── layout/
│   │   ├── Sidebar.tsx               # Left nav
│   │   └── Topbar.tsx                # Page header
│   └── ui/
│       ├── Avatar.tsx
│       ├── Badge.tsx
│       ├── Button.tsx
│       └── Input.tsx
├── hooks/
│   ├── useProspects.ts               # Fetch, optimistic updates, CRUD
│   └── useDrawer.ts                  # Drawer open/close state
├── lib/
│   ├── db.ts                         # Prisma singleton
│   ├── onboarding.ts                 # 10 onboarding step definitions
│   └── utils.ts                      # cn(), date helpers
├── prisma/
│   ├── schema.prisma                 # Prospect, ProspectNote, OnboardingChecklist
│   └── seed.ts                       # 10 seed prospects across all stages
├── types/
│   └── index.ts                      # Shared TS types + STAGE_CONFIG
├── .env.example
├── next.config.js
├── tailwind.config.ts
└── package.json
```

---

## Quick Start

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env — set your MySQL DATABASE_URL
```

### 3. Set up database
```bash
npm run db:push      # Create tables
npm run db:seed      # Seed 10 demo prospects
```

### 4. Run development server
```bash
npm run dev
# Open http://localhost:3000
```

---

## Features by Week

| Week | Feature |
|------|---------|
| Week 2 | ✅ Static Kanban board (6 columns, card layout) |
| Week 3 | ✅ Drag-and-drop with API PATCH — stage persists |
| Week 4 | ✅ Notes (append-only), follow-up date picker, overdue detection |
| Week 5 | ✅ 10-step onboarding checklist auto-creates on Pilot Closed; Analytics page |

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET    | `/api/prospects` | All prospects with notes + checklist |
| POST   | `/api/prospects` | Create new prospect |
| GET    | `/api/prospects/:id` | Single prospect |
| PATCH  | `/api/prospects/:id` | Update fields or stage |
| POST   | `/api/prospects/:id/notes` | Append note (never delete) |
| PATCH  | `/api/prospects/:id/checklist/:cid` | Toggle checklist item status |
| GET    | `/api/analytics` | Pipeline analytics summary |

---

## Team

| Name | Role |
|------|------|
| Md Allauddin (Group Leader) | Architecture, PR review, standup |
| YELLU NANDINI | UI Developer 1 — Kanban UI |
| Sathwika Akkala | API Developer |
| Daasaa Sri Krishna Kaushik | DB Developer |
| Rohan Reddy | UI Developer 2 — Drawer, Checklist |
| Prince Janiya | QA + Analytics |

---

*KALNET · FS-5 Internal CRM · April 2026 · Confidential*
"# FS5-KALNET" 
