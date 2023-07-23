
import { Outlet } from 'react-router-dom'


function Root() {
  return (
    <div className='app'>
        <Outlet/>
    </div>
  )
}

export default Root