
# Security Specification for Kambas

## Data Invariants
1. A user profile cannot be created for someone else (`uid` must match `request.auth.uid`).
2. A user cannot mark themselves as `isVerified` (only admin or backend).
3. A gig must belong to the logged-in freelancer.
4. An order must involve at least the client who creates it.
5. `isVerified` is a gate for most operations (except onboarding and viewing pending status).

## The Dirty Dozen Payloads (Failures)

### Identity & Authentication
1. **The Identity Thief**: Try to create a profile with `uid: "attacker"` but `auth.uid: "victim"`. (Should fail)
2. **The Self-Verifier**: Try to update `isVerified: true` on own profile. (Should fail)
3. **The Shadow Account**: Create a user profile with extra fields not in schema like `isAdmin: true`. (Should fail)

### Resource Ownership
4. **The Gig Hijacker**: Update a gig's `freelancerId` to someone else's ID. (Should fail)
5. **The Ghost Gig**: Create a gig where `freelancerId` does not match the creator's UID. (Should fail)
6. **The Order Spoofer**: Create an order for a different `clientId`. (Should fail)

### Integrity & State
7. **The Negative Payout**: Create a gig with `price: -100`. (Should fail)
8. **The Timeless User**: Update a user profile without updating `updatedAt` (if we had it, but let's say immutability of `uid`).
9. **The Status Jump**: Update an order status from `pending` directly to `completed` bypassing `in_progress` (if we implement sequence checks).

### Denial of Wallet / Resource Exhaustion
10. **The ID Poisoner**: Try to create a document with a 2KB ID string. (Should fail via `isValidId()`)
11. **The Bio Bomber**: Update `bio` with a 1MB string. (Should fail via `.size()`)
12. **The Category Flooder**: Create a gig with an array of 500 categories. (Should fail via `.size()`)

## Test Runner (Mock)
Validated against `firestore.rules`.
