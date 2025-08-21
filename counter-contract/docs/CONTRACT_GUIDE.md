# CONTRACT_GUIDE.md

# Counter Contract Guide

## Overview

The Counter Contract is a Clarity smart contract designed to manage a simple counter with permission controls. It allows designated users (admins) to increment or decrement the counter value while enforcing maximum and minimum limits. The contract also logs key actions for transparency and auditing purposes.

## Functions

### 1. `initialize()`
- **Description**: Initializes the contract with the starting counter value and sets the admin address.
- **Parameters**:
  - `initial_value`: The initial value of the counter (integer).
  - `admin_address`: The address of the admin user (principal).
- **Return Value**: None.

### 2. `increment()`
- **Description**: Increments the counter value by 1. Only the admin can call this function.
- **Parameters**: None.
- **Return Value**: The new counter value (integer).
- **Error Handling**: 
  - Throws an error if the caller is not the admin.
  - Throws an error if the counter exceeds the maximum limit.

### 3. `decrement()`
- **Description**: Decrements the counter value by 1. Only the admin can call this function.
- **Parameters**: None.
- **Return Value**: The new counter value (integer).
- **Error Handling**: 
  - Throws an error if the caller is not the admin.
  - Throws an error if the counter falls below the minimum limit.

### 4. `get_counter()`
- **Description**: Returns the current value of the counter.
- **Parameters**: None.
- **Return Value**: The current counter value (integer).

### 5. `set_admin()`
- **Description**: Changes the admin address to a new address. Only the current admin can call this function.
- **Parameters**:
  - `new_admin`: The new admin address (principal).
- **Return Value**: None.
- **Error Handling**: Throws an error if the caller is not the current admin.

### 6. `get_admin()`
- **Description**: Returns the current admin address.
- **Parameters**: None.
- **Return Value**: The current admin address (principal).

## Events

### 1. `CounterIncremented`
- **Description**: Emitted when the counter is incremented.
- **Parameters**:
  - `new_value`: The new value of the counter (integer).

### 2. `CounterDecremented`
- **Description**: Emitted when the counter is decremented.
- **Parameters**:
  - `new_value`: The new value of the counter (integer).

### 3. `AdminChanged`
- **Description**: Emitted when the admin address is changed.
- **Parameters**:
  - `old_admin`: The previous admin address (principal).
  - `new_admin`: The new admin address (principal).

## Security Considerations

- Ensure that only the designated admin can modify the counter value to prevent unauthorized access.
- Implement checks to prevent the counter from exceeding defined limits.
- Regularly audit the contract for potential vulnerabilities and ensure best practices are followed.

## Conclusion

This guide provides a comprehensive overview of the Counter Contract's functionality, including its methods, parameters, return values, and security considerations. For further details on deployment and testing, refer to the respective documentation files.