# UrbanClutch

**A full-stack e-commerce MVP for a small clothing brand.**

- Live URL : https://urbanclutch.in/

- Github : https://github.com/Tazer-Face/UrbanClutch

- Instagram : https://www.instagram.com/urbanclutch_/



UrbanClutch started as a way to build a working online store for a small clothing brand. I wanted to build more than just a storefront, so I worked on the complete flow — from browsing products and managing a cart to reserving inventory, processing payments, and handling orders.

The project gave me a chance to work through some of the challenges that come with building an e-commerce application, especially around checkout, inventory consistency, and payment failures.

## What it does

- **Product browsing:** View available clothing products, product details, and sizes.
- **Cart and wishlist:** Add products, choose sizes, and manage shopping preferences.
- **User authentication:** Sign up, log in, and manage user-specific cart data.
- **Checkout and payments:** Calculate order totals and integrate Razorpay for payment processing.
- **Inventory management:** Check stock availability and reserve inventory during checkout.
- **Order management:** Verify payments and maintain order records.
- **Responsive interface:** Browse and interact with the store across different screen sizes.

## Tech stack

**Frontend:** React, React Router, React Bootstrap, Axios

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** Firebase Authentication

**Payments:** Razorpay

## How the checkout flow works

Checkout was one of the more interesting parts of this project because creating a payment order is only one piece of the process.

1. The backend validates the cart and calculates the order total using server-side product and inventory data.
2. A MongoDB transaction checks stock availability and reserves the requested quantities. If the stock updates cannot all be completed, the transaction is rolled back.
3. A reservation is created with an expiry time, and a Razorpay order is generated for the payment.
4. After payment, the backend verifies the payment signature before finalizing the order.
5. If order or payment processing fails, the backend follows the appropriate recovery path for the reservation and inventory.

## Engineering decisions

### Preventing duplicate checkout requests

A user might click the checkout button more than once, or retry a request after a slow response. I implemented an idempotency mechanism using a unique checkout key.

The reservation collection uses a compound unique index on the user's Firebase UID and checkout key, scoped to reservations with a `Created` order-creation status. This helps prevent duplicate reservations for the same checkout attempt.

The key idea is that retries of the same attempt should reuse the same key, while a genuinely new checkout should use a new one.

### Keeping inventory consistent

Inventory is updated using conditional database operations that only decrement stock when enough units are available. These operations run inside a MongoDB transaction so that partial inventory updates can be rolled back if the reservation cannot be completed.

### Handling payment failures

The payment workflow accounts for failures during order creation and payment verification. Inventory reservations have an expiry time, and the backend includes recovery logic for unsuccessful or interrupted checkout attempts.

### Separating application responsibilities

The backend separates routes and controllers from business logic, services, and repository implementations. This keeps HTTP handling separate from operations such as reserving stock, creating payment orders, and updating order records.

## Running locally

### Prerequisites

- Node.js and npm
- MongoDB configured for transaction support
- A Firebase project with Authentication configured
- Razorpay API credentials

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd UrbanClutch-main
```

### 2. Start the backend

```bash
cd BackEnd
npm install
```

Create a `.env` file with the environment variables required by your backend configuration, then start the server using the appropriate command for your setup.

### 3. Start the frontend

Open another terminal:

```bash
cd FrontEnd
npm install
npm run dev
```

Configure the frontend Firebase settings and backend API URL for your local environment.

**Note:** The exact environment variable names and backend start command should match the configuration in the repository.

## What I learned

Building UrbanClutch helped me understand how different parts of a full-stack application fit together. In particular, I gained hands-on experience with MongoDB transactions, inventory reservations, idempotent checkout requests, payment verification, and recovering from failures across a multi-step workflow.

It also taught me that a checkout flow needs to account for more than the successful path - retries, unavailable stock, expired reservations, and unsuccessful payments all need to be considered.

---

*UrbanClutch is a learning and MVP project built around the needs of a small clothing brand.*

<img width="1917" height="807" alt="image" src="https://github.com/user-attachments/assets/d1b4e55b-daee-43f3-adff-d78fb662f86f" />
<img width="1912" height="802" alt="image" src="https://github.com/user-attachments/assets/908f276b-bffb-41ab-b376-d53b4f9d699d" />
<img width="1912" height="856" alt="image" src="https://github.com/user-attachments/assets/276c6688-61d4-47e4-b587-a822c6794948" />
<img width="1917" height="860" alt="image" src="https://github.com/user-attachments/assets/17985b76-00a9-4b10-aec5-5ef19b545e0e" />
<img width="1917" height="862" alt="image" src="https://github.com/user-attachments/assets/9806e6f8-3184-4abd-8a50-0ebfba7b2d93" />
<img width="1917" height="857" alt="image" src="https://github.com/user-attachments/assets/91075307-9b68-47f3-a2ff-f22b663edacc" />



