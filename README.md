# 🎮 Lugx Gaming Platform - Microservices Architecture

The **Lugx Gaming Platform** is a cloud-native application built using a **microservices architecture**, deployed on **AWS EKS** with a **Blue-Green deployment** strategy and full CI/CD automation.  
It includes multiple backend services, a frontend application, and an observability stack for monitoring.

---

## 📦 Services Overview

| Service          | Description                                                                 | Tech Stack | Repository |
|------------------|-----------------------------------------------------------------------------|------------|------------|
| **Game Service** | Manages game data (list games, add games).                                  | Node.js, Express, PostgreSQL, Prisma | [🔗 GitHub - Game Service](https://github.com/yasithWimukthi/game-service-LUGX) |
| **Order Service**| Handles order creation and retrieval for purchased games.                   | Node.js, Express, PostgreSQL, Prisma | [🔗 GitHub - Order Service](https://github.com/yasithWimukthi/order-service-LUGX) |
| **Frontend**     | Web application for the Lugx Gaming Platform.                               | React.js, TypeScript | [🔗 GitHub - Frontend](https://github.com/yasithWimukthi/lugx-frontend) |
| **Analytics Service** | Collects and stores web analytics data in ClickHouse for visualization. | Node.js, ClickHouse | [🔗 GitHub - Analytics Service](https://github.com/yasithWimukthi/analytic-service) |

---

## 🚀 Key Features

- **Microservices Architecture** with independent deployments.
- **Blue-Green Deployment** strategy for zero-downtime updates.
- **AWS EKS** for orchestration with managed node groups.
- **PostgreSQL** databases for services.
- **Prisma ORM** for database access and schema management.
- **CI/CD Pipelines** using GitHub Actions with:
  - Docker image build and push
  - Kubernetes deployment
  - Automated integration testing
- **Observability Stack** (Prometheus & Grafana).
- **ClickHouse Analytics** with AWS QuickSight dashboard.
- **Security Best Practices** with secrets in Kubernetes.

---

## 🏗 Architecture Overview

### Solution Architecture
- **Frontend** communicates with backend services via public LoadBalancer endpoints.
- **Game Service** and **Order Service** manage their own PostgreSQL databases.
- **Analytics Service** stores web analytics data in ClickHouse.
- Requests flow from the frontend → API endpoints (LoadBalancers) → microservices → databases.

### Deployment Architecture
- All services run in **Kubernetes pods**.
- Separate deployments for `blue` and `green` versions.
- **Service objects** in Kubernetes direct traffic to the active version.
- **AWS LoadBalancers** expose services to the internet.

---

## 🔐 Security & Ethics Considerations
- Use of **Kubernetes secrets** for database credentials (no hardcoded values in manifests).
- Restricting public access where not required.
- Ensuring **data privacy** for analytics collection.
- Ethical handling of user data (opt-in tracking, anonymization for analytics).

---

## 🛠 CI/CD Pipeline
- **Trigger**: Push to `main` branch of each service repo.
- **Steps**:
  1. Checkout source code.
  2. Configure AWS and Kubernetes.
  3. Build Docker image and push to Docker Hub.
  4. Deploy `green` version of service to EKS.
  5. Run **integration tests** against the `green` environment.
  6. Switch Kubernetes service selector from `blue` to `green`.
  7. Remove old version.
- **Blue-Green Switch** ensures no downtime during deployment.

---

## 📡 API Examples

### Game Service
#### Get All Games
```http
GET /api/games
```

### Order Service
#### Get All Orders
```http
GET /api/orders
```

#### Create New Order
```http
POST /api/orders
Content-Type: application/json

{
  "gameIds": [1, 2],
  "totalPrice": 49.98
}
```
