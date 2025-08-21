;; Counter Contract: Increment/decrement counter with permission controls

;; Define a map data structure to store individual counts
(define-map counters
  principal
  uint
)

;; Define a map for authorized counting
(define-map allowances
  (tuple (owner principal) (spender principal))
  bool
)

;; Define a data variable to store the total count of all users
(define-data-var total-count uint u0)

;; Define constants for error codes
(define-constant 'ERR_UNAUTHORIZED u100)
(define-constant 'ERR_ZERO_COUNT u1)
(define-constant 'ERR_BELOW_MIN_COUNT u2)
(define-constant 'MIN_COUNT u5)

;; Function to retrieve the count for a given individual
(define-read-only (get-count (who principal))
  (default-to u0 (map-get? counters who))
)

;; Function to get the total count
(define-read-only (get-total-count)
  (ok (var-get total-count))
)

;; Function to retrieve the allowance status
(define-read-only (get-allowance (owner principal) (spender principal))
  (default-to false (map-get? allowances { owner: owner, spender: spender }))
)

---

;; Public Functions

;; Function to increment the count for the caller
(define-public (count-up)
  (begin
    (ok (map-set counters tx-sender (+ (get-count tx-sender) u1)))
    (var-set total-count (+ (var-get total-count) u1))
  )
)

;; Function to decrement the count for the caller
(define-public (count-down)
  (let
    ((current-count (get-count tx-sender)))
    (asserts! (> current-count u0) (err ERR_ZERO_COUNT))
    (begin
      (ok (map-set counters tx-sender (- current-count u1)))
      (var-set total-count (- (var-get total-count) u1))
    )
  )
)

;; Function to set a user's count (for contract owner)
(define-public (set-count (who principal) (new-count uint))
  ;; TODO: Implement a proper owner check
  (asserts! (is-eq tx-sender .<contract-owner-address>) (err ERR_UNAUTHORIZED))
  (ok (map-set counters who new-count))
)

;; Function to give permission to another principal to count on your behalf
(define-public (approve (spender principal))
  (ok (map-set allowances { owner: tx-sender, spender: spender } true))
)

;; Function for an approved principal to increment the owner's count
(define-public (count-up-on-behalf-of (owner principal))
  (asserts! (is-eq (get-allowance owner tx-sender) true) (err ERR_UNAUTHORIZED))
  (begin
    (ok (map-set counters owner (+ (get-count owner) u1)))
    (var-set total-count (+ (var-get total-count) u1))
  )
)

;; Function to check if the count meets a minimum value and then increment
(define-public (check-and-count-up)
  (let
    ((current-count (get-count tx-sender)))
    (asserts! (>= current-count MIN_COUNT) (err ERR_BELOW_MIN_COUNT))
    (begin
      (ok (map-set counters tx-sender (+ current-count u1)))
      (var-set total-count (+ (var-get total-count) u1))
    )
  )
)