import { StacksTestnet } from '@stacks/network';
import { makeContractCall, broadcastTransaction, TxOptions } from '@stacks/transactions';
import { getAccount } from './utils'; // Assuming you have a utility to get account details

const network = new StacksTestnet();
const contractName = 'counter-contract';
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const adminAddress = 'YOUR_ADMIN_ADDRESS'; // Replace with the admin address
const initialCounterValue = 0; // Set the initial counter value
const maxCounterValue = 100; // Set the maximum counter value
const minCounterValue = 0; // Set the minimum counter value

async function deployContract() {
    const txOptions: TxOptions = {
        contractAddress,
        contractName,
        functionName: 'initialize',
        functionArgs: [initialCounterValue, maxCounterValue, minCounterValue, adminAddress],
        network,
        senderKey: getAccount().privateKey, // Replace with your private key
    };

    const transaction = await makeContractCall(txOptions);
    const txId = await broadcastTransaction(transaction, network);

    console.log(`Contract deployed with transaction ID: ${txId}`);
}

deployContract().catch((error) => {
    console.error('Error deploying contract:', error);
});