import React, { useEffect,useState } from 'react'
import { useParams } from 'react-router-dom'
const UserDetails = () => {
    const { name } = useParams()
    const [user, setUser] = useState(null)
    useEffect(() => {
        fetch(`https://api.github.com/users/` + name).then((res) => {
            return res.json()
        }).then((data) => {
            setUser(data)
        })
    })
    return (
        <div className='userDetails'>
            {
                user !== null ?
                    <div>
                        {
                            <>
<h1>{user.login}</h1>
<img src={user.avatar_url}/>

                            </>


                        }
                    </div> :
                    <div>loading...</div>
            }
        </div>
    )
}

export default UserDetails