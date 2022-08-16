import {} from './styles/navBar.scss'

export default function Header() {
    return (
        <ul className="nav-bar">
            <li className={"nav-item"}><a href="/">Home</a></li>
            <li className={"nav-item"}><a href="/">Roles</a></li>
            <li className={"nav-item"} id={"logout"}><a href="/">Log Out</a></li>
        </ul>
    )
}