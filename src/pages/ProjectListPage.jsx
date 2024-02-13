import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProjectListPage() {

    const API_URL = "https://project-management-api-4641927fee65.herokuapp.com"

    const [projects, setProjects] = useState(null);

    const getAllProjects = () => {
        axios.get(`${API_URL}/projects?_embed=tasks`)
            .then((response) => {
                setProjects(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    useEffect(() => {
        getAllProjects()
    }, []);


    return (
        <div className="ProjectListPage">
            {projects === null
                ? <p>Loading...</p>
                : projects.map((projectDetails) => {
                    return (
                        <div className="ProjectCard card" key={projectDetails.id} >
                            <Link to={`/projects/${projectDetails.id}`}>
                                <h3>{projectDetails.title}</h3>
                            </Link>
                        </div>
                    )
                })}
        </div>
    );
}

export default ProjectListPage;