function Details(props) {

  return (
    <div className="postContainer" key={props.post.id}>
      <h2 className="postTitle">Title: {props.post.title}</h2>
      <p className="postUser">User id: {props.post.userId} </p>{" "}
      <p className="postUser">Texto: {props.post.body} </p>{" "}
      {/* <button onClick={() => handleEdit(item)}>Editar Post</button>
      <button onClick={() => handleDelete(item.id)}>Borrar Post</button> */}
    </div>
  );
}

export default Details;
