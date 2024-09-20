import { useMutation } from "@apollo/client";
import { FaTrash } from "react-icons/fa";
import { DELETE_PROJECT } from "../mutations/projectMutations";
import { GET_PROJECTS } from "../queries/projectQueries";
import { useNavigate } from "react-router-dom";

export default function DeleteProjectButton({ projectId }) {
  const navigate = useNavigate();

  const [deleteProject] = useMutation(DELETE_PROJECT, {
    variables: { id: projectId },
    onCompleted: ( ) => navigate("/"),
    // gets called when client cache is refetched, that is GET_PROJECTS
    refetchQueries: [{query: GET_PROJECTS}]
  });

  return (
    <div className="d-flex align-items-center gap-2 mt-4 ms-auto">
      <button className="btn btn-danger btn-sm" onClick={deleteProject}>
        <FaTrash className="icon" /> Delete Project
      </button>
    </div>
  );
}
