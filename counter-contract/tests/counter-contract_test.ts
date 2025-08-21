import { assert, describe, it } from 'mocha';
import { StacksTestnet, StacksMainnet } from '@hirosystems/stacks-testnet-sdk';
import { callReadOnlyFunction, makeContractCall, broadcastTransaction } from '@stacks/transactions';
import { getAccount } from '@stacks/transactions';

const contractAddress = 'YOUR_CONTRACT_ADDRESS';
const contractName = 'counter-contract';
const adminAddress = 'YOUR_ADMIN_ADDRESS';
const userAddress = 'YOUR_USER_ADDRESS';

describe('Counter Contract Tests', () => {
    it('should initialize the counter to zero', async () => {
        const result = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-counter',
            functionArgs: [],
        });
        assert.equal(result.value, 0);
    });

    it('should allow admin to increment the counter', async () => {
        const tx = await makeContractCall({
            contractAddress,
            contractName,
            functionName: 'increment',
            functionArgs: [],
            senderAddress: adminAddress,
        });
        const result = await broadcastTransaction(tx);
        assert.isTrue(result.success);
    });

    it('should allow admin to decrement the counter', async () => {
        const tx = await makeContractCall({
            contractAddress,
            contractName,
            functionName: 'decrement',
            functionArgs: [],
            senderAddress: adminAddress,
        });
        const result = await broadcastTransaction(tx);
        assert.isTrue(result.success);
    });

    it('should not allow non-admin to increment the counter', async () => {
        const tx = await makeContractCall({
            contractAddress,
            contractName,
            functionName: 'increment',
            functionArgs: [],
            senderAddress: userAddress,
        });
        const result = await broadcastTransaction(tx);
        assert.isFalse(result.success);
    });

    it('should not allow non-admin to decrement the counter', async () => {
        const tx = await makeContractCall({
            contractAddress,
            contractName,
            functionName: 'decrement',
            functionArgs: [],
            senderAddress: userAddress,
        });
        const result = await broadcastTransaction(tx);
        assert.isFalse(result.success);
    });

    it('should not allow counter to exceed maximum value', async () => {
        // Assuming maximum value is 10
        for (let i = 0; i < 11; i++) {
            const tx = await makeContractCall({
                contractAddress,
                contractName,
                functionName: 'increment',
                functionArgs: [],
                senderAddress: adminAddress,
            });
            await broadcastTransaction(tx);
        }
        const result = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-counter',
            functionArgs: [],
        });
        assert.equal(result.value, 10);
    });

    it('should not allow counter to go below minimum value', async () => {
        // Assuming minimum value is 0
        for (let i = 0; i < 11; i++) {
            const tx = await makeContractCall({
                contractAddress,
                contractName,
                functionName: 'decrement',
                functionArgs: [],
                senderAddress: adminAddress,
            });
            await broadcastTransaction(tx);
        }
        const result = await callReadOnlyFunction({
            contractAddress,
            contractName,
            functionName: 'get-counter',
            functionArgs: [],
        });
        assert.equal(result.value, 0);
    });

    it('should allow admin to transfer admin role', async () => {
        const tx = await makeContractCall({
            contractAddress,
            contractName,
            functionName: 'transfer-admin',
            functionArgs: [userAddress],
            senderAddress: adminAddress,
        });
        const result = await broadcastTransaction(tx);
        assert.isTrue(result.success);
    });

    it('should allow new admin to increment the counter', async () => {
        const tx = await makeContractCall({
            contractAddress,
            contractName,
            functionName: 'increment',
            functionArgs: [],
            senderAddress: userAddress,
        });
        const result = await broadcastTransaction(tx);
        assert.isTrue(result.success);
    });
});