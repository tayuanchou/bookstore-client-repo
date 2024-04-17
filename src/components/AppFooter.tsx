import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";


function AppFooter(){
return(
    <footer>
        <ul>
            <li>
                <h3>
                    Copyright@2023 <br />
                    <div className="brand">
                        <svg className="bookstore-icon"></svg>
                        West Bookstore <br />
                    </div>
                    ALL RIGHTS RESERVED
                </h3>
            </li>
            <li>
                <Link to="#"><h3>Contact</h3></Link>
            </li>
            <li>
                <Link to="#"><h3>Directions</h3></Link>
            </li>
            <li>
                <h3>Social Media</h3>
                <Link to="#">
                    <img
                    src={require("../assets/images/site/facebook.png")}
                    alt="facebook"/>
                </Link>
                <Link to="#">
                    <img
                        src={require("../assets/images/site/twitter.png")}
                        alt="twitter" />
                </Link>
            </li>
        </ul>
    </footer>
)
}
export default AppFooter;
