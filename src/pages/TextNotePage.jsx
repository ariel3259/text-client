import React, {useState, useEffect} from "react";
import Header from "../components/Header";
import CardBlockNotes from "../components/CardBlockNotes";
import axios from "axios";
import Swal from "sweetalert2";
import BtnAdd from "../components/BtnAdd";
//styles
import "sweetalert2/dist/sweetalert2.min.css";
import "../styles/container-flex.css";

const TextNotePage = () => {
    	const [textBlock, UseTextBlock] = useState([]);

		const fetchText = async () =>{
			const response = await axios.get("http://localhost:8000/api/notes_block", {
				headers: {
					"id" : localStorage.id_user,
					"authorization" : localStorage.token
				}
			});
			UseTextBlock(response.data);
		}

		useEffect( () => {
			 		if(localStorage.token === "null" || localStorage.id_user === "null")
						return  Swal.fire("You're not sign in", "", "error").then( () => window.location.href="/");	
					fetchText();
		} ,[]);
		


    	return (
   		<>
        	<Header title = "Block notes">
				<BtnAdd />
			</Header>
        	<div className="container-flex">
				{!textBlock || textBlock !== "There's no notes" ? textBlock.map(element => <CardBlockNotes title = {element.Title} description = {element.Description} id = {element.id} key = {element.id}/>) : undefined }
			</div>
    </>
    );
}

export default TextNotePage;
