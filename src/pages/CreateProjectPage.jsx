import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateProjectPage() {

    const API_URL = "https://project-management-api-4641927fee65.herokuapp.com"

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();

        const newProject = {
            title: title,
            description: description
        }

        axios.post(`${API_URL}/projects`, newProject)
            .then((response) => {
                navigate("/projects");
            })
            .catch((error) => {
                console.log("Error creating new project...");
                console.log(error);
            });

    }

    return (
        <div className="CreateProjectPage">

            <h3>Add Project</h3>

            <form onSubmit={handleSubmit}>

                {/* Title */}
                <label>Title:
                    <input type="text"
                        required
                        name="title"
                        value={title}
                        onChange={(e) => { setTitle(e.target.value) }}
                    />
                </label>

                {/* Description */}
                <label>Description:
                    <input type="text"
                        required
                        name="description"
                        value={description}
                        onChange={(e) => { setDescription(e.target.value) }}
                    />
                </label>

                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default CreateProjectPage;