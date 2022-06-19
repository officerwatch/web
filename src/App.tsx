import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStore } from "./appState";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { db, stateClear, stateLoad, stateMutate, stateCachify } from "./db";
import * as web3 from "./appState/web3";

function App() {
  // app initial data load state, false = not done yet
  const appInitStatus = useStore(state => state.coreAppInit);
  const appInitToggle = useStore(state => state.coreInitToggle);

  // web3 state
  const web3HasMetamask = useStore(state => state.web3HasMetamask);
  const web3modInitialize = useStore(state => state.web3modInitialize);
  const web3SetNetwork = useStore(state => state.web3modSetNetwork);
  const web3SetChain = useStore(state => state.web3modSetChain);

  useEffect(() => {
    const appInitFetch = async () => {
      const response = await fetch("https://graphql.officer.watch/graphql/", {
                                method: 'POST',
                                headers: {
                                  'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                  query: `query {
                                            objectInit {
                                              id
                                              objType
                                              name
                                              ipfsHash
                                              parent
                                              children
                                            }
                                          }`,
                                  variables: {
                                    now: new Date().toISOString(),
                                  },
                                }),
                              });
      
      const returnJson = await response.json();

      const objects = returnJson.data.objectInit;

      // clear offline storage
      await stateClear();

      // load offline storage
      for (const obj of objects) {
        await stateLoad(obj);
      }

      // fetch ipfs data for offline storage
      // also move object into data store
      // for its corrisponding objType
      for (const obj of objects) {
        const insert = await stateMutate(obj);
      }

      // fetch ipfs cache, load it into offline storage
      let stateCache: any = await stateCachify();

      // must transform var to align with graphql return data
      stateCache = stateCache.data.objectGetIpfs;

      // convert from string
      let p = JSON.parse(stateCache);

      // iterate over ipfs cache
      for (const ch of Object.keys(p)) {
        if (p.hasOwnProperty(ch)) {
            console.log("updated offline storage record for " + ch);

            // add ipfs cache data into db
            let dbStatus = db.officers.update(ch, {
              "name": p[ch].name,
              "age": p[ch].age,
              "agency": p[ch].agency,
              "photo": p[ch].photo,
              "race": p[ch].race,
              "tags": p[ch].tags,
              "title": p[ch].title
            });
        }
      }
    };


    let objCounter = async () => { let c = await db.objects.count(); return Number(c); }
    objCounter().then((response) => {

      // TODO: do a better check than "if not zero"
      if (response === 0) {
        // once init is complete, toggle ui state
        appInitFetch().then((response) => {
            console.log('App initial state loaded');
            appInitToggle();
        });
      } else {
        console.log('App initial state loaded');
        appInitToggle();
      }
    });
    
    // web3 stuff
    if (window.ethereum) {
      console.log("Ethereum detected");

      if (window.ethereum.isMetaMask) {
          web3modInitialize(true);
          console.log('Metamask initialized');

          // set current network into appState from metamask
          web3.getNetworkId().then((response) => {
            web3SetNetwork(response as string);
            console.log('Detected EVM Network: ' + response);
            return response;
          });

          // set current chainid into appState from metamask
          web3.getChainId().then((response) => {
            web3SetChain(response as string);
            console.log('Detected EVM Chain: ' + response);
            return response;
          });

        } else {
            web3modInitialize(false);
            console.log('Please install MetaMask!');
        }
    } else {
        web3modInitialize(false);
        console.log("Ethereum NOT detected");
    }
  }, []);

  //const state = useStore();
  //console.log(state)

  return (
    <div>
      {appInitStatus ? (
          <>
            <NavBar />
              <div style={{ paddingTop: '4.5em' }}></div>
            <Outlet />
            <Footer />
          </>
           ) : (
          <span>loading dot gif</span>
      )}
    </div>
  );
}

export default App;