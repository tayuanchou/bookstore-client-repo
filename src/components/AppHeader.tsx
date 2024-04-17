import HeaderDropdown from './HeaderDropdown';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import { Link } from 'react-router-dom';

function AppHeader(){

return(

    <header>
        <section className="header">
            <div className="background-img"></div>
            <div className="leftside-header">
                <Link to="/" className="logolink">
                    <h1 className="HeaderText">
                        <img
                            src={require("../assets/images/site/open-book.png")}
                            width="100vw"
                            height="100vw"
                            alt="Logo"
                            className="logo"
                        />
                        West Bookstore
                    </h1>
                </Link>
            </div>
            <div className="rightside-header">
                <form action="#">
                    <input type="text" placeholder=" Search books..." name="search" />
                    <button type="submit">
                        <h4 id="Search"><svg className="search-icon"></svg>Search</h4>
                    </button>
                </form>
            </div>
        </section>
    </header>


)
}
export default AppHeader;

