import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import AddTask from "../components/AddTask";

function ProjectDetailsPage() {

    const API_URL = "https://project-management-api-4641927fee65.herokuapp.com"

    const { projectId } = useParams();

    const [project, setProject] = useState(null);

    const getProject = () => {
        axios.get(`${API_URL}/projects/${projectId}?_embed=tasks`)
            .then((response) => {
                setProject(response.data);
            })
            .catch((error) => {
                console.log("Error getting project details from the API...");
                console.log(error)
            });
    };


    useEffect(() => {
        getProject();
    }, []);


    return (
        <div className="ProjectDetailsPage">
            {project === null
                ? <p>Loading...</p>
                : (<>
                    <h1>{project.title}</h1>
                    <p>{project.description}</p>
                </>)
            }

            <AddTask projectId={projectId} callbackToRefreshProject={getProject} />

            {project &&
                project.tasks.map((task) => (
                    <li className="TaskCard card" key={task.id}>
                        <h3>{task.title}</h3>
                        <h4>Description:</h4>
                        <p>{task.description}</p>
                    </li>
                ))}

            <Link to="/projects">
                <button>Back to projects</button>
            </Link>

            <Link to={`/projects/edit/${projectId}`}>
                <button>Edit Project</button>
            </Link>

        </div>
    );
}

export default ProjectDetailsPage;
