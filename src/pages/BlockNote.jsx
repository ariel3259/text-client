import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import axios from "axios";
import Swal from "sweetalert2";
import { faTrash, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "sweetalert2/dist/sweetalert2.min.css";
import "../styles/text-box.css";
import "../styles/btn-close.css";
import "../styles/btn-delete.css";


const BlockNote = () => {
	const [description, UseDescription] = useState("");
	const [status, UseStatus] = useState("Waiting for changes");

	const OnShowDescription = () => UseDescription(localStorage.description);
	const OnClickClose = () => window.location.href = "/text_note";
	const OnChangeDescription = async e => {
			UseStatus("Saving...");
			UseDescription(e.target.value);
			try{
				await axios.put("http://localhost:8000/api/notes_block",{
					description,
					id_user : localStorage.id_user,
					id : localStorage.id
				},{
					headers: {
						"authorization" : localStorage.token
					}
				});
				localStorage.description = e.target.value;
				setTimeout( () => {
					UseStatus("Saved")
				}, 500);
				setTimeout( () => {
					UseStatus("Waiting for changes");
				}, 1000);
			}catch(err){
				UseStatus("Something has wrong");
				console.log(err);
			}
	}
	const OnClickDelete = async () => {
		
		try{
			const response = await axios.delete("http://localhost:8000/api/notes_block",{
				headers : {
					"id" : localStorage.id, 
					"authorization" : localStorage.token
				}
			});
			Swal.fire("Success", response.data, "success").then( () => window.location.href = "/text_note");
		}
		catch(err){
			console.log(err);
		}
	}

	useEffect( () => {
		OnShowDescription();
	}, [])

	return(

        <>
        	<Header title = {localStorage.title}>
				<button className="btn-close" onClick = {OnClickClose} ><FontAwesomeIcon icon = {faTimes} /></button>
	    		<button className="btn-delete" onClick = {OnClickDelete}><FontAwesomeIcon icon ={faTrash} /></button>
				<span>{status}</span>
			</Header>
			<div className="text-box">
	    			<textarea  cols="30" rows="10" value = {description} onChange = {OnChangeDescription}></textarea> 
            </div>
        </>
    );
}

export default BlockNote;
