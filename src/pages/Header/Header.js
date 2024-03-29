import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Axios } from '../../utils/CustomAxios';
import { remove_userInfo } from '../../store/authReducer';
import { useCookies } from 'react-cookie';
const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(state=>state.user);
    const [cookies, setCookie, removeCookie] = useCookies();

    const logoutClick = () =>{
        dispatch(remove_userInfo());
        localStorage.removeItem("accessToken");
        removeCookie('refreshToken');
        const uri="api/v1/member/logout";
        Axios.get(uri);
    }
    return (
       <div id="Header">
            <div className="Nav">
                <div className="Header">
                    <div className="logo">
                        <Link to="/">UOU-MALL</Link>
                    </div>
                    <div className="menu_list">
                        <ul className="menu">
                            <li className="drop">
                                <p>
                                    <Link to="/category/0/1">SHOP</Link>
                                </p>
                                <ul className="sub sub1">
                                    <div className="inner">
                                        <ul>
                                            <p>
                                                <a href='/category/0/1'>ALL</a>
                                            </p>
                                        </ul>
                                    </div>
                                </ul>
                            </li>
                        </ul>
                    </div>
                    <div className="membership_list">
                        <ul className="menu">
                            <li className="drop">
                                MEMBERSHIP
                                <ul className="sub sub2">
                                    <div className="inner">
                                        <ul>
                                            {user.isLoggedIn?(
                                                <div>
                                                    <p >
                                                        <a onClick={logoutClick} href="/">LOGOUT</a>
                                                    </p>
                                                    <p>
                                                        <Link to='/mypage/order/1'>MY PAGE</Link>
                                                    </p>
                                                </div>
                                                ):(
                                                <div>
                                                    <p>
                                                        <Link to='/login'>LOGIN</Link>
                                                    </p>
                                                    <p>
                                                        <Link to='/register'>REGISTER</Link>
                                                    </p>
                                                </div>
                                                )}
                                            
                                        </ul>
                                    </div>
                                </ul>
                            </li>
                            <li>
                                {user.isLoggedIn?<a href='/cart/1'>CART</a>:<a href='/login'>CART</a>}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
       </div>
    )
}

export default Header;