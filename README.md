# 🏗️ Microservices Portfolio System v4.0

A production-grade, distributed system architected to showcase career evolution through the lens of modern backend engineering. This project isn't just a portfolio; it's a live, monitored environment demonstrating scalability, resilience, and system design.

---

## 📐 System Architecture

The portfolio is designed as a service-oriented architecture, where each section represents a distinct service within a managed mesh.

### 🔌 Core Services
- **System Boot Sequence (Home)**: An initialization animation sequence showing services coming online with real-time health indicators.
- **Architectural Overview (About)**: An interactive 3D visualization of the system's design, mapping career growth to architectural milestones.
- **Service Mesh (Skills)**: Skills organized as service endpoints with versioning (proficiency) and dependency mapping.
- **Deployment History (Experience)**: Internships and roles presented as production deployments with associated impact metrics and performance logs.
- **Project Repositories**: Live-linked project cards featuring GitHub telemetry, architecture diagrams, and production status.
- **Telemetry Dashboard (Monitoring)**: Real-time system metrics including visitor counts, request rates, and global traffic distribution via WebSockets.
- **Contact API Protocol**: A contact interface styled as an interactive API playground (POST /api/v1/contact).

---

## 🛠️ Technical Stack

### **Frontend & Visualization**
- **Core**: [Next.js 16](https://nextjs.org/) (App Router), [React](https://react.dev/)
- **Visuals**: [Three.js](https://threejs.org/) / [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/getting-started/introduction) (3D Architecture)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- **Charts**: [Recharts](https://recharts.org/) / [D3.js](https://d3js.org/)

### **Backend & Infrastructure**
- **Architecture**: Serverless Microservices (Node.js/Go/Python)
- **Database**: [PostgreSQL](https://www.postgresql.org/) (Main State), [Redis](https://redis.io/) (Caching & Rate Limiting)
- **Real-time**: [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) for live telemetry
- **Monitoring**: [Grafana](https://grafana.com/), [Prometheus](https://prometheus.io/), [Sentry](https://sentry.io/)
- **Infrastructure**: Infrastructure as Code (Terraform/Pulumi), GitHub Actions CI/CD

---

## 🚀 Advanced Features

- **Terminal CLI**: A hidden power-user interface (accessible via `Ctrl + ~`) for navigating the system via command line.
- **Chaos Engineering Mode**: A toggleable state to demonstrate system resilience and graceful error handling under injected latency.
- **Version Rollback (Time Travel)**: A feature allowing users to view the portfolio's state at different stages of career evolution (v1.0 to v4.0).
- **API Playground**: Fully documented OpenAPI/Swagger endpoints for the portfolio's underlying data services.

---

## 📈 Performance & Reliability
- **Uptime**: 99.9% Target
- **Optimization**: SSR/SSG for sub-second page loads
- **Security**: Rate limiting, schema validation (Zod), and secure endpoint protocols
