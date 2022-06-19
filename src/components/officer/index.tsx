import { useEffect } from "react";

function OfficerPage (data: any) {
    var obj = data.data;
    obj.badge = "";
    obj.gender = "";
    useEffect(() => {
        let obj = data.data;
        obj.badge = "";
        obj.gender = "";
    }, []);
    return (
        <div className="card" style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-96x96">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4" style={{marginBottom: '10px'}}>{obj.name}</p>
                            {obj.agency !== "" ? 
                                ( <span className="subtitle is-6">Agency: <strong>{obj.agency}</strong></span> ) 
                                :
                                ( <span className="subtitle is-6">Agency: <strong>Unknown</strong></span> ) 
                            }
                            <br />
                            {obj.title !== "" ? 
                                ( <span className="subtitle is-6">Rank: <strong>{obj.title}</strong></span> ) 
                            :
                                ( <span className="subtitle is-6">Rank: <strong>Unknown</strong></span> ) 
                            }
                            <br />
                            {obj.race !== "" ? 
                                ( <span className="subtitle is-6">Race: <strong>{obj.race}</strong></span> ) 
                            :
                                ( <span className="subtitle is-6">Race: <strong>Unknown</strong></span> ) 
                            }
                            <br />
                            {obj.gender !== "" ? 
                                ( <span className="subtitle is-6">Gender: <strong>{obj.gender}</strong></span> ) 
                            :
                                ( <span className="subtitle is-6">Gender: <strong>Unknown</strong></span> ) 
                            }
                            <br />
                            {obj.badge !== "" ? 
                                ( <span className="subtitle is-6">Badge #: <strong>{obj.badge}</strong></span> ) 
                            :
                                ( <span className="subtitle is-6">Badge #: <strong>Unknown</strong></span> ) 
                            }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OfficerPage;