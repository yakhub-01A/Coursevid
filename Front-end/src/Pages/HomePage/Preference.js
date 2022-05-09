import React, {Component } from 'react';
import './CSS/Preference.css';
import axios from '../../ApiServices/axiosUrl';
import CourseTitle from './CourseTitle';
import { Redirect } from 'react-router-dom';
import Alert from '../Auth/Forms/alert'
import Layout from '../../components/Layout/Layout';

class Preference extends Component {

    state = {
        interest:[],
        userId:localStorage.getItem('userId'),

        Courses: {
            "Engineering Basket":{
                touched:false,
            },
            "English Basket":{
                touched:false,
            },
             "Humanities Basket":{
                touched:false,
            },
             "Softskills Basket":{
                touched:false,
            },
             "Management Basket":{
                touched:false,
            },
             "Programe core or elective Basket":{
                touched:false,
            },
            "Science Basket":{
                touched:false,
            },
        },
        redirect:null,
        alert: {
            valid:false,
            msg:"",
            alertType:"",
        },

        alertPressed:false,
        token:localStorage.getItem('user'),
    }



AlertError(alertmsg, alertType) {
    const AlertArray = {...this.state.alert};
    AlertArray.msg = alertmsg;
    AlertArray.valid=true;
    AlertArray.alertType=alertType;
    this.setState({alert:AlertArray});

}



    categoryHandler=(CourseName)=>{


            if(this.state.Courses[CourseName].touched)

            {   const UpdatedCourses = {...this.state.Courses};
                UpdatedCourses[CourseName].touched=false;

                this.setState({Courses:UpdatedCourses})
                const index =this.state.interest.indexOf(CourseName);
                if(index >-1) this.state.interest.splice(index,1);
            }

            else
            {const UpdatedCourses = {...this.state.Courses};
            UpdatedCourses[CourseName].touched=true;
            


            this.setState({Courses:UpdatedCourses})
            this.state.interest.push(CourseName);}
        
        
        this.setState(prevState => 
            ({interest:prevState.interest, Courses:prevState.Courses}));

        console.log(this.state.interest)

    }

    sumbitHandler =()=> {
      
       // const fd =new FormData();
        const formData = {"interest":this.state.interest, 'userId':this.state.userId};
        this.setState({alertPressed:true})
        setTimeout( ()=> this.setState({alertPressed:false}) , 3000);
      
        console.log(formData);

        //fd.append("userId",this.state.userId);
       //fd.append("interest",this.state.interest);

        
        axios.post("/home/interests/",formData, {
            headers: {
                
               Authorization: 'Bearer '+ this.state.token + " " + localStorage.getItem('ref_token')
                
            }
        })
        .then(response => {
            
                console.log("Preference Added");    
                this.AlertError("Preferences Added", "success");
                this.setState({redirect:'/home/preferences'})


        })
        .catch(error => {
            console.log(error.response);
            if(error.response.statusText  === "Internal Server Error"){
                this.setState({redirect:'/login'})
            }
        })


    }


    render(){

        let alertContent = null;


        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
  

            var engbas ,englbas,humbas,softbas,mgtbas,programe_core_elective_bas,science_bas;

            if(this.state.Courses["Engineering Basket"].touched){
                engbas = ['touched']
            }
            else{
                engbas=['']
            }

            if(this.state.Courses["English Basket"].touched){
                englbas = ['touched']
            }
            else{
                englbas=['']
            }
            if(this.state.Courses["Humanities Basket"].touched){
                humbas= ['touched']
            }
            else{
                humbas=['']
            }
            if(this.state.Courses["Softskills Basket"].touched){
                softbas = ['touched']
            }
            else{
                softbas=['']
            }
            if(this.state.Courses["Management Basket"].touched){
               mgtbas= ['touched']
            }
            else{
                mgtbas=['']
            }
            if(this.state.Courses["Programe core or elective Basket"].touched){
                programe_core_elective_bas = ['touched']
            }
            else{
                programe_core_elective_bas=['']
            }

            if(this.state.Courses["Science Basket"].touched){
                science_bas = ['touched']
            }
            else{
                science_bas=['']
            }
            if(this.state.alert.valid){

                alertContent = ( <Alert value={this.state.alertPressed}         
                                         alertMsg ={this.state.alert.msg} 
                                        alertType={this.state.alert.alertType} /> )
            }
          
        
        return(


        <Layout>
         
            <div className="container">
                     {alertContent}
                <div className="title">
                     <CourseTitle welcomeMessage ={"Choose Your interests,"}/>
                </div>
                <div className="Preference-buttons">

                    <button className={engbas.join(' ')} onClick={()=> this.categoryHandler("Engineering Basket")}> Engineering Basket</button>
                    <button className={englbas.join(' ')} onClick={()=> this.categoryHandler("English Basket")}> English Basket</button>
                    <button className={humbas.join(' ')} onClick={()=> this.categoryHandler("Humanities Basket")}> Humanities Basket</button>
                    <button className={softbas.join(' ')} onClick={()=> this.categoryHandler("Softskills Basket")}> Softskills Basket</button>
                    <button className={mgtbas.join(' ')} onClick={()=> this.categoryHandler("Management Basket")}> Management Basket</button>
                    <button className={science_bas.join(' ')} onClick={()=> this.categoryHandler("Science Basket")}> Science Basket</button>
                    <button className={programe_core_elective_bas.join(' ')} onClick={()=> this.categoryHandler("Programe core or elective Basket")}> Programe core or elective Basket</button>
                   
                </div>


            <div className="SumbitBtn">
                    <button  onClick={this.sumbitHandler}>SUMBIT</button>
                </div>


            </div>
        </Layout>
            
        );
    }



}

export default Preference;