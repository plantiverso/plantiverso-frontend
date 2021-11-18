import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import swal from 'sweetalert';

function ViewForum(){

    const [loading, setLoading] = useState(true);
    const [forumList, setForumList] = useState([]);
    useEffect(() => {
        axios.get(`/api/view-forum`).then(res => {
            if(res.status === 200){
                setForumList(res.data.forum);
            }
            setLoading(false);
        });

    }, []);

    const deleteForum = (e, id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Excluindo";

        axios.delete(`/api/delete-forum/${id}`).then(res => {
            if(res.status === 200){
                swal("Success", res.data.message, "success");
                thisClicked.closest("tr").remove();
            }else if( res.status === 404){
                swal("Warnig", res.data.message, "Warning");
                thisClicked.innerText = "Excluir";
            }
        });
    }

    var ViewForum_HTML = "";
    if(loading){
        return <h4>Loading forum...</h4>
    }else{
        ViewForum_HTML = forumList.map((item) => {
            return (
                <tr>
                <div>
                <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                    <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1">{item.title}</h5>
                    <small>20/05/1999</small>
                    <Link to={`open-forum/${item.id}`}> <button className="btn btn-primary">Acessar</button> </Link>
                    <Link to={`edit-forum/${item.id}`}> <button className="btn btn-warning">Editar</button> </Link>
                    <td> <button onClick={ (e) => deleteForum(e, item.id)} className="btn btn-danger">Excluir</button></td>
                    </div>
                    <br></br>
                    <p class="mb-1">{item.description}</p>
                </a>
                <br></br>
                </div>
                </tr>
            )   
        });
    }
    
    return(
        <div>
            <div className="container py-5">
                <h1>Meus tópicos</h1>
                <div class="list-group">
                    <table>
                    {ViewForum_HTML}
                    </table>
                </div>
            </div>
        </div>
    );
}

export default ViewForum;