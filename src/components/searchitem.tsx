interface SearchItem {
    id: string
    name: string
}
function SearchItem(props: SearchItem) {

    let olink = /officer/ + props.id;
    return ( 
      <>
        <div key={ 'div_' + props.id }>
            <button key={ 'link_' + props.id } id={olink}>
                <span key={ 'span_' + props.id }> - {props.name}</span>
            </button>
            <br key={ 'br_' + props.id }/>
        </div>
      </>
    )
}

export default SearchItem;