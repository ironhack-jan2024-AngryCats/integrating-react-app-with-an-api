import { useState } from "react";
import axios from "axios";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";


function AddTask(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        const id = parseInt(props.projectId); // id of the project to which we assign this task

        const newTask = {
            projectId: id, 
            title: title,
            description: description
        }
        
        axios.post(`${API_URL}/tasks`, newTask)
            .then((response) => {
                
                // reset form
                setTitle("");
                setDescription("");

                // update project details (by invoking a function in the parent component)
                props.callbackToRefreshProject();
            })
            .catch((error) => {
                console.log("Error creating new task...");
                console.log(error);
            });
    };


    return (
        <div className="AddTask">
            <h3>Add New Task</h3>

            <form onSubmit={handleSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    type="text"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Add Task</button>
            </form>
        </div>
    );
}

export default AddTask;
