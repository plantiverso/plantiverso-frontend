import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';

function ViewGeneralForum(){

    const [loading, setLoading] = useState(true);
    const [forumList, setForumList] = useState([]);
    useEffect(() => {
        axios.get(`/api/view-general-forum`).then(res => {
            console.log(res.data)
            if(res.status === 200){
                setForumList(res.data.forum);
            }
            setLoading(false);
        });

    }, []);

    var ViewForum_HTML = "";
    if(loading){
        return <h4>Loading forum...</h4>
    }else{
        ViewForum_HTML = forumList.map((item) => {
            return (
                <div>
                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{item.title}</h5>
                    <small>20/05/1999</small>
                    <Link to={`open-forum/${item.id}`}> <button className="btn btn-primary">Acessar</button> </Link>
                    </div>
                    <br></br>
                    <p class="mb-1">{item.description}</p>
                </a>
                <br></br>
                </div>
            )   
        });
    }
    

    return(
        <div>
            <div className="container py-5">
                <h1>Forum - Tópicos</h1>
                <div class="list-group">
                    {ViewForum_HTML}
                </div>
            </div>
        </div>
    );
}

export default ViewGeneralForum;