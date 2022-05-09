import React,{useEffect} from 'react';
import './Navbar.css';
import {NavLink,useHistory} from 'react-router-dom';
import Logo from '../../../UI/Logo/Logo';
import AuthServices from '../../../../ApiServices/auth.service';
import { GoogleLogout } from 'react-google-login';
import Search from '../../Search/search';


const Navbar = ()=>{
    
    const [isLogin,setLogin]=React.useState(false);
    const history = useHistory()

    useEffect (()=>{

      let isMounted=true;
       
      if(isMounted){
        if(localStorage.getItem('user')){
          setLogin(true)
        }
      }
      return ()=>{
        isMounted=false;
      }
    },[])


     const logout=() => {
        setLogin(false)
        AuthServices.logout()
        console.log("logout called")
        history.push('/login')
      }

    let Logout = ( <ul className="navbar-nav ml-auto">

              <li className="nav-item">
                <NavLink to="/signup" activeClassName="btnactive" className="nav-link Signupbtn">Signup</NavLink>
              </li>

              <li className="nav-item">
                  <NavLink to="/login" activeClassName="btnactive" className="nav-link Loginbtn">Login</NavLink>
              </li>

          </ul>
          );
    
      let loggedIn = (<ul className="navbar-nav ml-auto">


      <li className="nav-item" data-toggle="tooltip" data-placement="top"
       title="Create Your Course">
        
        <NavLink to="/teacherhome" activeClassName="teacherActive"
         className="nav-link teachLink">Teach on Shelp</NavLink>
      </li>
    
     
      <li className="nav-item">
        <NavLink to="/Cart" className="nav-link "> 
        <i data-toggle="tooltip" data-placement="top" title="Bookmarked Courses"
         className="fa fa-book" aria-hidden="true"><span id="bookmarkNav"> Bookmark</span></i></NavLink>
       
      </li>

      <li className="nav-item">
          <GoogleLogout
            clientId={process.env.REACT_APP_GOOGLE_API_KEY}
            buttonText="Logout"
            render={renderProps => (
              <NavLink to="/login" onClick={logout} 
              disabled={renderProps.disabled}  className="nav-link logoutlink" > Logout </NavLink>
              )}
            onLogoutSuccess={logout}>
          </GoogleLogout>
      </li>
    </ul>
    ); 
     
  return(

    <nav className=" navbar navbar-expand-lg sticky-top ">

    <NavLink to="/home/all" className="navbar-brand"></NavLink>

        <button className="navbar-toggler" type="button" data-toggle="collapse" 
        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
        aria-label="Toggle navigation">
            <i className="fa fa-bars" aria-hidden="true"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">

          <ul className="navbar-nav mr-auto">

              <li className="nav-item dropdown" >
                  <a href={'/'} className="nav-link dropdown-toggle" id="navbarDropdown" role="button" 
                  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Category
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">

                  <NavLink  className="dropdown-item" to='/home/all' activeClassName="active-categoryMenu" >All Courses</NavLink>
                  <NavLink className="dropdown-item" to='/home/Engineering Basket' activeClassName="active-categoryMenu">Engineering Basket </NavLink>
                  <NavLink className="dropdown-item" to='/home/English Basket' activeClassName="active-categoryMenu" >English Basket </NavLink>
                  <NavLink className="dropdown-item" to='/home/Programe core or elective Basket' activeClassName="active-categoryMenu">Programe core or elective Basket </NavLink>
                  <NavLink className="dropdown-item" to='/home/Softskills Basket' activeClassName="active-categoryMenu">Softskills Basket</NavLink>
                  <NavLink className="dropdown-item" to='/home/Management Basket' activeClassName="active-categoryMenu">Management Basket </NavLink>
                  <NavLink className="dropdown-item" to='/home/Science Basket' activeClassName="active-categoryMenu">Science Basket</NavLink>
                  <NavLink className="dropdown-item" to='/home/Humanities Basket' activeClassName="active-categoryMenu">Humanities Basket</NavLink>
                    
                  </div>
              </li>
          </ul>
                
            
          <Search/>

          {!isLogin && Logout}
          {isLogin && loggedIn}
          
        </div>
        </nav>
    )
        

}

export default Navbar;