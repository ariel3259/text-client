import React, {useState} from "react";
import { Modal } from "react-bootstrap";
import { faPlus, faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import axios from "axios";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/btn-add.css";  


const BtnAdd = () => {
    const [title, UseTitle] = useState("");
    const [show, UseShow] = useState(false);

    const OnClickOpenModal = () => UseShow(true);
    const OnClickCloseModal = () => UseShow(false);
    const OnChangeTitle = e => UseTitle(e.target.value);
    const OnClickCreate = async () => {
        if(!title) return Swal.fire("Error", "incomplete data", "error");
        try{    
            const response = await axios.post("http://localhost:8000/api/notes_block",{
                title,
                id : localStorage.id_user
            },{
                headers : {
                    "authorization" : localStorage.token
                }
            });
            Swal.fire("Congratulations", response.data, "success").then( () => window.location.reload());
        }catch(err){
            console.log(err);
        }
    }

    return (
    <>
        <button className = "btn-add" onClick ={OnClickOpenModal}><FontAwesomeIcon icon = {faPlus} /></button>
        <Modal show = {show}>
                <Modal.Header>
                    <h2>Add a text  block</h2>
                    <button className = "btn btn-secondary" onClick = {OnClickCloseModal}><FontAwesomeIcon icon = {faWindowClose} /></button>
                </Modal.Header>
                <Modal.Body>
                        <div className="mb-2">
                            <label className="form-label">Title: </label>
                            <input type="text" className="form-control" onChange = {OnChangeTitle} />
                        </div>
                </Modal.Body>
                <Modal.Footer>
                        <button className="btn btn-primary" onClick = {OnClickCreate}>Create</button>
                        <button className="btn btn-secondary" onClick = {OnClickCloseModal}>Cancel</button>
                </Modal.Footer>
        </Modal>
    </>
    );
}


export default BtnAdd;