import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = (event) => {
    event.preventDefault();
    const from = event.target;
    const name = from.name.value;
    const email = from.email.value;

    const user = { name, email }

    console.log(user)
    // server এ post request পাঠানোর জন্য নিচের পদ্ধিতি ব্যবহার করা হয়।

    fetch('http://localhost:5000/users', {
      method: 'POST', // method বলে দেয়া হয়েছে, POST method ব্যবহার করা হয় ‍server এ post করার জন্য ।

      headers: {
        'content-type': 'application/json' //কি ধরনের data যাবে backend এ তা বলে দেয়া হয়েছে header এর মধ্যে।
      },
      body: JSON.stringify(user), // body এর মধ্যে object কে json stringify করে পাঠানো হয়।
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        const newUser = [...users, data]; // আগের user এবং নিউ user কে একটা array এর মধ্যে রাখা হয়েছে।
        setUsers(newUser)
        from.reset()
      })


  }

  return (
    <>
      <h1>User Management Systems</h1>
      <h3>Numbers of Users: {users.length}</h3>
      <form onSubmit={handleAddUser}>
        <input type="text" name='name' placeholder='name' />
        <br />
        <input type="email" name="email" id="" placeholder='email' />
        <br />
        <input type="submit" value="Add user" />
      </form>

      <div>
        {
          users.map(user => <p key={user.id}> {user.id}. {user.name} {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
