import React from "react";
import './CSS/CategoriesCard.css';
import {NavLink} from 'react-router-dom'

const Categories =(props)=>{


    return(

        <div className="CategoryDevider">


                <div className="Categories-main">
                
                <h3 className="Categories-heading"> Categories </h3>


            <div className="ListOfCourses">
                  <NavLink to='/home/all' className="cc" activeClassName="active-category" >All Courses</NavLink>
                  <NavLink to='/home/Engineering Basket' className="cc" activeClassName="active-category">Engineering Basket </NavLink>
                  <NavLink to='/home/English Basket' className="cc" activeClassName="active-category" >English Basket </NavLink>
                  <NavLink to='/home/Programe core or elective Basket' className="cc" activeClassName="active-category">Programe core or elective Basket </NavLink>
                  <NavLink to='/home/Softskills Basket' className="cc" activeClassName="active-category">Softskills Basket</NavLink>
                  <NavLink to='/home/Management Basket' className="cc" activeClassName="active-category">Management Basket </NavLink>
                  <NavLink to='/home/Science Basket' className="cc" activeClassName="active-category">Science Basket</NavLink>
                  <NavLink to='/home/Humanities Basket' className="cc" activeClassName="active-category">Humanities Basket</NavLink>
                  <NavLink to='/home/preferences' className="recommended" 
                  activeClassName="active-category">Recommended!</NavLink>
                
            </div>

       

                </div>

                <div className="Course-Devider">

                </div>

                <div className='CategoriesSlider'>
                 <NavLink to='/home/all' activeClassName="Sactive-category" >All Courses</NavLink>
                  <NavLink to='/home/Engineering Basket' activeClassName="Sactive-category">Engineering Basket </NavLink>
                  <NavLink to='/home/English Basket' activeClassName="Sactive-category" >English Basket </NavLink>
                  <NavLink to='/home/Programe core or elective Basket' activeClassName="Sactive-category">Programe core or elective Basket </NavLink>
                  <NavLink to='/home/Softskills Basket' activeClassName="Sactive-category">Softskills Basket</NavLink>
                  <NavLink to='/home/Management Basket' activeClassName="Sactive-category">Management Basket </NavLink>
                  <NavLink to='/home/Science Basket' activeClassName="Sactive-category">Science Basket</NavLink>
                   <NavLink to='/home/Humanities Basket' activeClassName="Sactive-category">Humanities Basket</NavLink>
                  <NavLink to='/home/preferences' className="recommended" 
                  activeClassName="active-category">Recommended!</NavLink>
            </div>


        </div>


     


    );

}

export default Categories;