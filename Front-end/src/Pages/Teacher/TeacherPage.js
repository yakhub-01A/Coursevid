import React,{Component} from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import Tinput from './TinputFields';
import Layout from '../../components/Layout/Layout';
import TeacherTittle from './TeacherTittle';
import {Redirect} from 'react-router-dom';
import Cloud from '../../assets/Images/cloud.png';
import './CSS/Teacher.css';
import axios from '../../ApiServices/axiosUrl';
import AuthServices from '../../ApiServices/auth.service';
import Alert from '../Auth/Forms/alert';
import ProgressBar from 'react-bootstrap/ProgressBar'
import CKEditorArea from './CKEditor';



class TeacherPage extends Component{


    state = { 
        Form:{

             title: {
                label: "Title",
                rows: "1",
                cols: "50",
                placeholder: 'Enter Course Title',
                value: "",
                valid:false,
                validation: {
                    required: true,
                    minLength:0,
                    
                },
                
          
            },
            discription: {
                label: "Short Description",
                rows: "4",
                cols: "50",
                placeholder: 'eg: Complete HTML5, CSS3, Basics of Js',
                value: "",
                valid:false,
                validation: {
                    required: true,
                    
                },
               
            },
            
            discriptionLong: {
                 label: "Long Description",
                 rows: "6",
                 cols: "50",
                 placeholder: 'Entereg: In this course you will learn how to build professional website from scratch and how to make it responsive. Course Title',
                 value: "",
                 valid:true,

                 validation: {
                    required: true,
                   
                },
                 
               
             },

             category: {
                value: "",
                valid:true,
                validation: {
                    required: true,
                  
                },
                "Engineering Basket":false,
                "Programe core or elective Basket" : false,
                "Science Basket": false,
                "Management Basket": false,
                "Humanities Basket":false,
                "Softskills Basket":false,
                "English Basket":false,
                
            
            },

            image:{
                value:'',
                name:'',
                validation: {
                    required: false,
                    
                },
                valid:true,

            },

            name:{
                label: "Enter your Name",
                rows: "1",
                cols: "50",
                placeholder: 'Your Name',
                value: "",
                validation: {
                    required: true,
                    minLength:1,
                    
                },
                 valid:false,
            },

            _id: {
                value: localStorage.getItem('userId'),
                valid:true,
            },

            willLearn:{
                label: "What will the students learn from this?",
                rows: "5",
                cols: "70",
                placeholder: 'students will learnt to apply skills...',
                value: "",
                validation: {
                    required: true,
                    minLength:1,
                    
                },
                 valid:false,
            },

            requirement:{
                label: "What are the requirements of this course?",
                rows: "5",
                cols: "70",
                placeholder: 'Must know python etc ',
                value: "",
                validation: {
                    required: true,
                    minLength:1,
                    
                },
                 valid:false,
            },

            price:{
                label: "Price of this course (INR)?",
                rows: "1",
                cols: "50",
                placeholder: '100',
                value: "",
                validation: {
                    required: true,
                    minLength:1,
                    
                },
                 valid:false,
            },

            
     
    },
     
    alert: {
        valid:false,
        msg:"",
        alertType:" ",
        
    },
    CourseNames:["Engineering Basket","Programe core or elective Basket", "Science Basket","Management Basket","Humanities Basket",
                "Softskills Basket","English Basket"],
    isLoggedIn:false,
    userName:"",
    alertPressed:false,
    uploadedPercentage:0,
    CourseId:"",
    redirect:false,
    
}

    componentDidMount(){
        let userToken = AuthServices.getCurrentUser();
        let userName= AuthServices.getUserName();
        if(userToken!==null){
            this.setState({isLoggedIn:true,userName:userName});
        }
        
    }

    checkValidity(value,rules){
        let isValid = true;
      

        if(rules.required){
            isValid =value.trim()!=='' && isValid;
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength  && isValid;
        }
     
        
        if(rules.maxLength){
            isValid = value.length <= rules.maxLength  && isValid;
        }

       

        return isValid;
        
     }

     OverallValidity = ()=>{

        for(let validate in this.state.Form){
           
            

            if(!this.state.Form[validate].valid){
                return false;
            }
         
        }
        return true;
    }
    
    
    AlertError(alertmsg, alertType) {
        const AlertArray = {...this.state.alert};
        AlertArray.msg = alertmsg;
        AlertArray.valid=true;
        AlertArray.alertType=alertType;
        this.setState({alert:AlertArray});

    }

    CKEditorHandler  =(event,editor,Title)=> {

        const data =editor.getData();
        const updatedForm = {
            ...this.state.Form
        }
        updatedForm[Title].value=data;
        updatedForm[Title].valid=this.checkValidity(data, updatedForm[Title].validation)
        this.setState({Form:updatedForm})

    }


    inputchangeHandler = (event,inputIdentifier)=> {

        const updatedForm = {
            ...this.state.Form
        }
        const updatedElement = {...updatedForm[inputIdentifier]}
        

        updatedElement.value = event.target.value;


        updatedForm[inputIdentifier] = updatedElement;

        updatedElement.valid = this.checkValidity(updatedElement.value,
            updatedElement.validation);


        this.setState({Form: updatedForm});

    }

    categoryHandler = (CourseName)=>{

        const Coursecategory = {...this.state.Form};
       
        Coursecategory.category.value = CourseName;
     

        for(let x in this.state.CourseNames){

            if(this.state.CourseNames[x]!==CourseName){
                Coursecategory.category[this.state.CourseNames[x]]=false;
               // console.log(this.state.CourseNames[x])
            }
        }

        Coursecategory.category[CourseName]=true;
        
        this.setState({Form:Coursecategory});
      
       
    }



    fileSelectorHandler = event =>{
    
        const selectedfile= {...this.state.Form};

        selectedfile.image.value= event.target.files[0];
       
        selectedfile.image.name= URL.createObjectURL(event.target.files[0]);
        this.setState({Form:selectedfile })
            //console.log(selectedfile)
    }


    


    sumbitButton =()=> {
        
        this.setState({alertPressed:true})
        setTimeout( ()=> this.setState({alertPressed:false}) , 2000);
  
        const fd = new FormData();

      
        for(let formElement in this.state.Form){
            
            fd.append(formElement, this.state.Form[formElement].value);
            
            console.log(formElement,this.state.Form[formElement].value);
        }


       

        if(this.OverallValidity()){

                axios.post('creator/create-course',fd,{
                    onUploadProgress: progressEvent => {
                        //console.log("Progress bar");
                        const {loaded,total} =progressEvent;
                        let percent =Math.floor((loaded*100)/total);
                       // console.log("percent" + percent)
                        if(percent<100){
                            this.setState({uploadedPercentage:percent})
                        }
                    }
                },{
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "Access-Control-Allow-Origin": '*',
                       // "Authorization": 'Bearer '+ localStorage.getItem('user') 
                    }
                })
                .then( res=> { 
                    console.log(res);
                    this.props.AddCourseToStore(res.data.newCourse)
                    this.setState({CourseId:res.data.newCourse._id})
                    this.AlertError("Your Course has been saved!", "success");
                    setTimeout( ()=> this.setState({redirect:true}) , 2000);

                })

                .catch(error => { console.log(error.response)
                    this.AlertError(error.response.data.message, "danger");
                    // if(error.response.data.message ==="jwt malformed" )
                    //     this.setState({redirect:"/login"})
                });
        
        }
        else
            this.AlertError("Validation Errors!", "warning");
       
    }
 
    

    render(){

    
        let classEngineering_Basket=[];
        let classEnglish_Basket=[];
        let classManagement_Basket=[];
        let classPrograme_core_elective_Basket=[];
        let classScience_Basket=[];
        let classHumanities_Basket=[];
        let classSoftskills_Basket=[];


        let Welcome = null;
        let alertContent = null;
        let fileName=null;
       
        if(this.state.redirect){
            return <Redirect 
                    to={{
                        pathname: "/TeacherVideos",
                        state: {CourseId:this.state.CourseId }
                    }}
            />
        }
        

        if(this.state.Form.category['Engineering Basket']){
            classEngineering_Basket=['ButtonClicked']
            //console.log("clicked11",classEngineering_Basket.join(' '),this.state.Form.category['Engineering Basket'])
        }
        else classEngineering_Basket=[];

         if(this.state.Form.category['Management Basket']){
            classManagement_Basket=['ButtonClicked']
            
        }
        else classManagement_Basket=[];
    
         if(this.state.Form.category['Science Basket']){
            classScience_Basket=['ButtonClicked']
        }
        else classScience_Basket=[];


         if(this.state.Form.category['Programe core or elective Basket']){
            classPrograme_core_elective_Basket=['ButtonClicked']
        }
        else classPrograme_core_elective_Basket=[];

         if(this.state.Form.category['Softskills Basket']){
            classSoftskills_Basket=['ButtonClicked']
        }
        else classSoftskills_Basket=[];


         if(this.state.Form.category['Humanities Basket']){
            classHumanities_Basket=['ButtonClicked']
        }
        else classHumanities_Basket=[];
        
         if(this.state.Form.category['English Basket']){
            classEnglish_Basket=['ButtonClicked']
            
        }
        else classEnglish_Basket=[];

        let uploadedPercentage = this.state.uploadedPercentage;

        
        if(this.state.Form.image.value){
             fileName=this.state.Form.image.value.name;
             
        }

      
        

        if(this.state.alert.valid){
            alertContent = ( <Alert alertMsg ={this.state.alert.msg} 
                                    alertType={this.state.alert.alertType} 
                                    value={this.state.alertPressed}/> )
        }
        
        if(this.state.isLoggedIn) {
            Welcome = <p > Welcome {this.state.userName}!</p>;
        }
          
      

        return(

          
    <Layout >
        <div className="container-fluid-main">

            {alertContent}

            <div className="Welcome-msg">
                
                    {Welcome}

            </div>

        
        <div className="Teacher-Head-Class">
        
                    
                <Tinput
                label={this.state.Form.name.label}
                rows={this.state.Form.name.rows}
                cols={this.state.Form.name.cols}
                placeholder={this.state.Form.name.placeholder}
                changed={(event)=> this.inputchangeHandler(event,"name")}
                />


        </div>


          
        <div className="Teacher-Head-Class">
        
            
            <Tinput
            label={this.state.Form.title.label}
            rows={this.state.Form.title.rows}
            cols={this.state.Form.title.cols}
            placeholder={this.state.Form.title.placeholder}
            changed={(event)=> this.inputchangeHandler(event,"title")}
            />


        </div>

     <div className="Teacher-Courses-Buttons-head">

            <p className="CourseCategoryTitle">Course Category</p>

            <div className="Teacher-Courses-Buttons">
               
            <button onClick={()=> this.categoryHandler("Engineering Basket")} className={classEngineering_Basket.join(' ')} > Engineering Basket</button>
                <button className={classManagement_Basket.join(' ')} onClick={()=> this.categoryHandler("Management Basket")}> Management Basket</button>
                <button className={classPrograme_core_elective_Basket.join(' ')} onClick={()=> this.categoryHandler("Programe core or elective Basket")}> Programe core or elective Basket</button>
                <button className={classScience_Basket.join(' ')} onClick={()=> this.categoryHandler("Science Basket")}> Science Basket</button>
                <button className={classSoftskills_Basket.join(' ')} onClick={()=> this.categoryHandler("Softskills Basket")}> Softskills Basket</button>
                <button className={classHumanities_Basket.join(' ')} onClick={()=> this.categoryHandler("Humanities Basket")}> Humanities Basket</button>
                <button className={classEnglish_Basket.join(' ')} onClick={()=> this.categoryHandler("English Basket")}> English Basket</button>

            </div>

        </div>    


           

   
            <TeacherTittle TitleDesc={"Description of your Course"}/>
            
        <div className="Teacher-Head-Class">
            <Tinput
            label={this.state.Form.discription.label}
            rows={this.state.Form.discription.rows}
            cols={this.state.Form.discription.cols}
            placeholder={this.state.Form.discription.placeholder}
            changed={(event)=> this.inputchangeHandler(event,"discription")}
            />

        </div>

        <div className="Teacher-Head-Class">
            <CKEditorArea
            label={this.state.Form.discriptionLong.label}
            rows={this.state.Form.discriptionLong.rows}
            cols={this.state.Form.discriptionLong.cols}
            placeholder={this.state.Form.discriptionLong.placeholder}
            changed={(event,editor)=> this.CKEditorHandler(event,editor,"discriptionLong")}
            
            
           // changed={(event)=> this.inputchangeHandler(event,"discriptionLong")}
            />

        </div>


        <div  className="Teacher-Head-Class">

        <CKEditorArea
            label={this.state.Form.willLearn.label}
            rows={this.state.Form.willLearn.rows}
            cols={this.state.Form.willLearn.cols}
            placeholder={this.state.Form.willLearn.placeholder}
            changed={(event,editor)=> this.CKEditorHandler(event,editor,"willLearn")}
            
            
         
            />
        
        </div>

        <div  className="Teacher-Head-Class ckeditor">

        <CKEditorArea
            label={this.state.Form.requirement.label}
            rows={this.state.Form.requirement.rows}
            cols={this.state.Form.requirement.cols}
            placeholder={this.state.Form.requirement.placeholder}
            changed={(event,editor)=> this.CKEditorHandler(event,editor,"requirement")} />
        
        </div>

        <div className="Teacher-Head-Class">
           
            <Tinput
            label={this.state.Form.price.label}
            rows={this.state.Form.price.rows}
            cols={this.state.Form.price.cols}
            placeholder={this.state.Form.price.placeholder}
            changed={(event)=> this.inputchangeHandler(event,"price")}
            />

        </div>
        
         {/* <button className="NextBtn">Next</button>  */}



        <div className="Teacher-Head-Class">
            <img src={Cloud} alt="cloud"/>
            <p className="cloudpng">Upload your content</p>
        </div>


            <div className="Teacher-Head-Class">
            
            
                <label className="custom-image-upload">
                    <input type="file" name='file'  onChange={this.fileSelectorHandler}/>
                    Upload Image
            </label>

            <p className="ImageName">{fileName}</p>
            <img className="" 
                src={this.state.Form.image.name} alt="No file Selected"/>

            
            </div>

        
            <div className="Welcome-msg sumbitVideoBtn">
                <button onClick={this.sumbitButton} >Submit </button>
            </div>

          <div>
              {uploadedPercentage>0 ? <ProgressBar now={uploadedPercentage}
                    label={`${uploadedPercentage}%`}/> :null }
          </div> 
            

          
        </div>
    </Layout>
        


        );
    }
}

// const mapStateToProps = (state) => {
//     return {
//          Courses: state.filter.Courses,
//          PreferenceCourses: state.filter.PreferenceCourse,
//     //   selectedCourse: state.filter.selectedCourse,
//     };
//   };
  const mapDispatchToProps = (dispatch) => {
    return {
        AddCourseToStore:(data)=>dispatch(actionCreators.AddCourseToStore(data)),
        //  fetchPreferenceCourses:(CourseLink,form)=>dispatch(actionCreators.fetchAsyncPreferenceCourse(CourseLink,form))
    };
  };

export default connect(null, mapDispatchToProps)(TeacherPage);