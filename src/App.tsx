import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStore } from "./appState";
import NavBar from "./components/navbar";
import Footer from "./components/footer";
import { stateClear, stateLoad, stateMutate } from "./db";

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
        console.log(obj);
      }

      // fetch ipfs data for offline storage
      // also move object into data store
      // for its corrisponding objType
      for (const obj of objects) {
        await stateMutate(obj);
        console.log(obj);
      }
    };

    // once init is complete, toggle ui state
    appInitFetch().then((response) => {
        console.log('app initial state loaded');
        appInitToggle();
    });

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