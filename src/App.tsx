import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStore } from "./appState";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { db, stateClear, stateLoad, stateMutate, stateCachify } from "./db";

function App() {
  // app initial data load state, false = not done yet
  const appInitStatus = useStore(state => state.coreAppInit);
  const appInitToggle = useStore(state => state.coreInitToggle);

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

            //console.log(dbStatus);
        }
      }
    };


    let objCounter = async () => { let c = await db.objects.count(); return Number(c); }
    objCounter().then((response) => {

      // TODO: do a better check than "if not zero"
      if (response == 0) {
        // once init is complete, toggle ui state
        appInitFetch().then((response) => {
            console.log('app initial state loaded');
            appInitToggle();
        });
      } else {
        console.log('app initial state loaded');
        appInitToggle();
      }
    });
    

    if (window.ethereum) {
      console.log("ethereum detected");
      // Check if network is correct
      //getNetworkAndChainId()
    } else {
        console.log("ethereum NOT detected");
        //  window.addEventListener('ethereum#initialized', handleEthereum, { once: true });

      // If the event is not dispatched by the end of the timeout,
      // the user probably doesn't have MetaMask installed.
      //setTimeout(handleEthereum, 3000); // 3 seconds
    }

  }, []);

  return (
    <div>
      <NavBar />
      {appInitStatus ? (
          <Outlet />
          ) : (
          <span>loading dot gif</span>
      )}
      <Footer />
    </div>
  );
}

export default App;