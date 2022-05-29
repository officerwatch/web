function SearchAutoComplete (props: any) {

    let term = props.term
    let searchContext = ""

    if (typeof term === 'string' && term.trim().length === 0) {
        return (
          <div>
            <span className="is-small">Suggestions</span>
          </div>
        )
      } else {
        return (<h1>{ props.term }</h1>)
      }
}

export default SearchAutoComplete;