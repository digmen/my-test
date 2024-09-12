import { Link } from 'react-router-dom'
import './leftsidebar.css'
export default function LeftSideBar() {
    return (
        <div className='factorail'>
            <div className='left_bar'>
                <h1>Тренировки</h1>
                <div className='left_bar_link'>
                    <Link to='/'>Главное</Link>
                    <Link to='/factorial'>Фаториал на JS</Link>
                </div>
            </div>
        </div>
    )
}
