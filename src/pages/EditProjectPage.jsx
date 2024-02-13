import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";


function EditProjectPage() {

    const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { projectId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // get project details from the API (so that we can pre-populate the form)
        axios.get(`${API_URL}/projects/${projectId}`)
            .then((response) => {
                setTitle(response.data.title);
                setDescription(response.data.description)
            })
            .catch((error) => {
                console.log("Error getting project details from the API...");
                console.log(error);
            });
    }, [projectId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            title: title,
            description: description
        }

        axios.put(`${API_URL}/projects/${projectId}`, newDetails)
            .then((response) => {
                navigate(`/projects/${projectId}`);
            })
            .catch((error) => {
                console.log("Error updating project...");
                console.log(error);
            });
    }

    const deleteProject = () => {
        axios.delete(`${API_URL}/projects/${projectId}`)
            .then((response) => {
                navigate("/projects");
            })
            .catch((error) => {
                console.log("Error updating project...");
                console.log(error);
            });
    }

    return (
        <div className="EditProjectPage">
            <h3>Edit the Project</h3>

            <form onSubmit={handleFormSubmit}>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label>Description:</label>
                <textarea
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">Update Project</button>
            </form>

            <button onClick={deleteProject}>Delete Project</button>
        </div>
    );
}

export default EditProjectPage;
