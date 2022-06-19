export async function getChainId () {
    return new Promise((resolve, reject) => {
        const chainCall = async () => {
            try {
                const chainId = await window.ethereum.request({ method: 'eth_chainId' });
                resolve(chainId as string);
                return chainId;
            } catch (err) {
                reject(err);
                console.error(err);
            }
        }
        chainCall();
    });
}

export async function getNetworkId () {
    return new Promise((resolve, reject) => {
        const networkCall = async () => {
            try {
                const networkId = await window.ethereum.request({ method: 'net_version' });
                resolve(networkId as string);
            } catch (err) {
                reject(err);
                console.error(err)
            }
        }
        networkCall();
    });
}

export async function connectWallet () {
    return new Promise((resolve, reject) => {
        const walletCall = async () => {
            try {
                const accounts: any = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (typeof accounts !== "undefined" && accounts.length === 0) {
                    // MetaMask is locked or the user has not connected any accounts
                    reject("MetaMask is locked or no account setup yet.");
                }
                resolve(accounts[0] as string);
            } catch (err) {
                reject(err);
            }
        }
        walletCall();
    });
}

