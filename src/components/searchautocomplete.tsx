import { db } from "../db";
import { matchSorter } from 'match-sorter';
import { Object } from "../db/Object";
import { useState, useEffect } from "react";
import SearchItem from "./searchitem";
import { useNavigate } from "react-router-dom";
import { useStore } from "../appState";

async function searchContent (term: string): Promise<Object[]> {
    try {
      let results = await db.objects.toArray();
      let returnData = matchSorter(results, term, {keys: ['name']});
      return Promise.resolve (returnData);
    } catch (e) {
      return Promise.reject(e);
    }
}

function SearchAutoComplete (props: any) {
  const [resultList, SetResultList] = useState<Object[]>();
  const [resultLoading, SetResultLoading] = useState(true);
  const [resultError, SetResultError] = useState("");
  const menuToggle = useStore(state => state.uimodSearchToggle);
  let navigate = useNavigate();
  
  useEffect(() => {
    searchContent(props.term).then((response) => {
      SetResultList(response);
      SetResultLoading(false)
    });
  }, [props]);

    if (typeof props.term === 'string' && props.term.trim().length === 0) {
      return (
        <div>
          <span className="is-small">Suggestions</span>
        </div>
      )
    } else {
      if (typeof resultList !== 'undefined' && resultList.length > 0) {
        return (
                  <>
                  {resultList.map(({id, name}) => {
                      return ( <div key={id} onClick={(e) => { menuToggle(); navigate("/officer/" + id, { replace: true }); }}><SearchItem key={id} id={id} name={name} /></div> )
                  })}
                  </>
              )
      } else {
        return (
          <>
            <h1>no results</h1>
          </>
        )
      }
    }
}

export default SearchAutoComplete;