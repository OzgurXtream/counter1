# Deployment Guide for Counter Contract

This document provides a step-by-step guide for deploying the Counter Contract on both the Stacks testnet and mainnet. It includes the necessary configurations and parameters for successful deployment.

## Prerequisites

1. **Stacks CLI**: Ensure you have the Stacks CLI installed. You can install it using npm:
   ```
   npm install -g @stacks/cli
   ```

2. **Stacks Wallet**: You need a Stacks wallet with sufficient STX for deployment fees.

3. **Node.js**: Make sure you have Node.js installed to run the deployment scripts.

## Deployment Steps

### 1. Deploying to Testnet

To deploy the Counter Contract to the Stacks testnet, follow these steps:

- Navigate to the `scripts` directory:
  ```
  cd scripts
  ```

- Run the deployment script for testnet:
  ```
  ts-node deploy-testnet.ts
  ```

- The script will prompt you for your wallet address and the necessary parameters for deployment. Ensure you provide the correct admin address and initial counter value.

### 2. Deploying to Mainnet

To deploy the Counter Contract to the Stacks mainnet, follow these steps:

- Navigate to the `scripts` directory:
  ```
  cd scripts
  ```

- Run the deployment script for mainnet:
  ```
  ts-node deploy-mainnet.ts
  ```

- Similar to the testnet deployment, the script will ask for your wallet address and other required parameters. Make sure to double-check the values as mainnet transactions are irreversible.

## Contract Initialization

After deploying the contract, you may need to initialize it with specific parameters. This can be done using the `initialize-contracts.ts` script.

- To initialize the contract, run:
  ```
  ts-node initialize-contracts.ts
  ```

- Provide the necessary initialization parameters, such as the initial counter value and the admin address.

## Verification

After deployment, you can verify the contract on the Stacks Explorer:

- For testnet: [Stacks Testnet Explorer](https://explorer.testnet.stacks.co/)
- For mainnet: [Stacks Mainnet Explorer](https://explorer.stacks.co/)

Search for your contract address to ensure it has been deployed successfully.

## Conclusion

You have now successfully deployed the Counter Contract on both the Stacks testnet and mainnet. Ensure to keep your wallet credentials secure and monitor the contract for any necessary updates or changes.