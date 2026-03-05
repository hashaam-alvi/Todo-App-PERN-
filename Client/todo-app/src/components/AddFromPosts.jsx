import axios from "axios";
import {BASE_URL} from "./config"


export default function AddFromPosts({ openAddModal , refresh }) {

  const addFromPosts = async () => {
    const res = await fetch(`${BASE_URL}/posts`);
    // const res = await fetch(`http://localhost:8081/posts`);
    const posts = await res.json();
    {{console.log(posts)}}
    const requests = posts.slice(0, 5).map(post => 
        // fetch(, {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(post),
        // })
        axios.post(`${BASE_URL}/todos`,post) 
    );

    await Promise.all(requests);
    
    refresh();
  };


  return (
    <div className="addTaskButtons">
      <button className="open-btn" onClick={() => openAddModal(true)}>
        Add Todo
      </button>

      <button onClick={addFromPosts}>Get Todos</button>
    </div>
  );
}
