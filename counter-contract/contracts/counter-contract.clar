(define-counter-contract)

(define-data-var counter int 0)

(define-data-var admin principal (contract-call? .admin))

(define-constant MAX_VALUE 100)
(define-constant MIN_VALUE 0)

(define-public (set-admin (new-admin principal))
  (begin
    (if (is-eq (var-get admin) (contract-caller))
      (begin
        (var-set admin new-admin)
        (print (concat "Admin changed to: " (as-coerce new-admin principal)))
      )
      (err "Only the current admin can change the admin"))
  )
)

(define-public (increment)
  (begin
    (if (is-eq (var-get admin) (contract-caller))
      (begin
        (if (< (var-get counter) MAX_VALUE)
          (begin
            (var-set counter (+ (var-get counter) 1))
            (print (concat "Counter incremented to: " (as-coerce (var-get counter) int)))
          )
          (err "Counter has reached its maximum value"))
      )
      (err "Only the admin can increment the counter"))
  )
)

(define-public (decrement)
  (begin
    (if (is-eq (var-get admin) (contract-caller))
      (begin
        (if (> (var-get counter) MIN_VALUE)
          (begin
            (var-set counter (- (var-get counter) 1))
            (print (concat "Counter decremented to: " (as-coerce (var-get counter) int)))
          )
          (err "Counter has reached its minimum value"))
      )
      (err "Only the admin can decrement the counter"))
  )
)

(define-public (get-counter)
  (var-get counter)
)

(define-public (initialize (initial-admin principal))
  (begin
    (var-set admin initial-admin)
    (print (concat "Admin initialized to: " (as-coerce initial-admin principal)))
  )
)

(define-public (get-admin)
  (var-get admin)
)

(define-event counter-updated (counter-value int))
(define-event admin-changed (new-admin principal))

(define-public (increment-with-event)
  (begin
    (increment)
    (emit counter-updated (var-get counter))
  )
)

(define-public (decrement-with-event)
  (begin
    (decrement)
    (emit counter-updated (var-get counter))
  )
)