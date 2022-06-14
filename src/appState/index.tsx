import create from 'zustand'

interface appState {

    // ***
    // state values
    // ***

    // core
    coreVersion: string
    coreAppInit: boolean

    // site ui
    uiTheme: string
    uiMenuMore: boolean // toggle open state, true = open
    uiFooterMenu: boolean // toggle open state
    uiSidebar: boolean // toggle open state
    uiSearchSuggest: boolean // toggle open state
    uiSearchTerm: string

    // web 3
    web3HasMetamask: boolean
    web3UserHash: string
    web3HasWallet: boolean
    web3CurrentNetwork: string
    web3CurrentChainId: string
    web3ContractAddr: string
    web3CorrectNetwork: string
    web3CorrectChainId: string
    
    // ***
    // state modifiers
    // ***
    
    // core
    coreInitToggle: () => void

    // ui
    uimodSearchToggle: () => void
    uimodFooterToggle: () => void
    uimodMoreMenuToggle: () => void
    uimodSidebarToggle: () => void

    // web3
    web3modInitialize: (status: boolean) => void
    web3modSetChain: (chainId: string) => void
    web3modSetNetwork: (networkId: string) => void
    web3modSetUserHash: (userHash: string) => void
    /*
    initEthereum: () => string
    connect: () => boolean
    checkNetwork: () => string
    getNetworkAndChain: () => string
    handleChainChanged: () => string
    handleNewChain: () => string
    handleNewNetwork: () => string
    addNetwork: () => string
    */
}
  
// export state, initialize to safe default values, methods for modifying state
export const useStore = create<appState>()((set) => ({

    // ***
    // state values
    // ***

    // core
    coreVersion: "1.2.3",
    coreAppInit: false,

    // ui
    uiTheme: "light",
    uiMenuMore: false,
    uiFooterMenu: false,
    uiSidebar: false,
    uiSearchSuggest: false,
    uiSearchTerm: "",

    // web3
    web3HasMetamask: false,
    web3UserHash: "",
    web3ContractAddr: "0x426211b9960FE62bbB2Bd16E73d904bAb3d0136D",
    web3HasWallet: false,
    web3CurrentNetwork: "",
    web3CurrentChainId: "",
    web3CorrectNetwork: "8001",
    web3CorrectChainId: "0x13881",
    
    // ***
    // state modifiers
    // ***

    // core
    coreInitToggle: () => set((state) => ({ 
        coreAppInit: (state.coreAppInit ? false : true) 
    })),

    // ui
    uimodSearchToggle: () => set((state) => ({ uiSearchSuggest: (state.uiSearchSuggest ? false : true) })),
    uimodFooterToggle: () => set((state) => ({ uiFooterMenu: (state.uiFooterMenu ? false : true) })),
    uimodMoreMenuToggle: () => set((state) => ({ uiMenuMore: (state.uiMenuMore ? false : true) })),
    uimodSidebarToggle: () => set((state) => ({ uiSidebar: (state.uiSidebar ? false : true) })),

    // web3
    web3modInitialize: (status: boolean) => set((state) => ({ 
        web3HasMetamask: (state.web3HasMetamask ? false : true) 
    })),
    web3modSetChain: (chainId: string) => set((state) => ({ web3CurrentChainId: chainId })),
    web3modSetNetwork: (networkId: string) => set((state) => ({ web3CurrentNetwork: networkId })),
    web3modSetUserHash: (userHash: string) => set((state) => ({ web3UserHash: userHash }))
}))