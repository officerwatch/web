import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useStore } from "./appState";
import NavBar from "./components/navbar";
import Footer from "./components/footer";



function App() {
  // app initial data load state, false = not done yet
  const appInitStatus = useStore(state => state.coreAppInit);
  const appInitToggle = useStore(state => state.coreInitToggle);

  useEffect(() => {
    const appInitFetch = async () => {
      const req = await fetch("https://graphql.officer.watch/graphql/", {
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
      }).then(function(response) {
        response.json().then(function(data)	{
          console.log(data.data.objectInit);
        });
      })  
      .catch(function(err) {
        //console.log('Error :', err);
      });
    };

    // once init is complete, toggle ui state
    appInitFetch().then(data => {
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