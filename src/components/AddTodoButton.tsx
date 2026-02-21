import Add from "../assets/add.svg";

function AddTodoButton({ setEditMode }: { setEditMode: (value: boolean) => void}) {
    return (
        <button className="btn w-100" onClick={() => setEditMode(true)}>
          <div className="card p-2 text-center">
            <div className="card-body">
              <img src={Add} className="me-1" />
              <span>
                <strong>Add a todo</strong>
              </span>
            </div>
          </div>
        </button>
    )
}

export default AddTodoButton;