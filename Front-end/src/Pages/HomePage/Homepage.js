import React, { Component, useState } from 'react';
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/actions";
import Categories from './Categories';
import HomeBanner from './HomeBanner';
import CourseCards from './CourseCards';
import CourseTitle from './CourseTitle';
import { Redirect, NavLink } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import Layout from '../../components/Layout/Layout'
import Recommendation from './Recommendation';
import './CSS/Homepage.css';
import Url from '../../ApiServices/BackendUrl';
import './CSS/CategoriesCard.css';
import Modal from 'react-modal';
import ModalVideo from 'react-modal-video'
import 'D:/Coursevid/Front-end/node_modules/react-modal-video/scss/modal-video.scss';

class Homepage extends Component {

    IsMounted = false;

    state = {
        isOpen: false,
        CourseLink: this.props.match.params.CourseName,
        Courses: this.props.Courses,
        loading: true,
        img: "",
        progress: 0,
        redirect: null,
        demoUrl: ''
    }


    componentDidMount() {
        this.IsMounted = true;

        const fd = new FormData();
        const form = {};
        form['userId'] = localStorage.getItem('userId');
        fd.append("userId", localStorage.getItem('userId'))


        if (this.state.CourseLink === "preferences" && this.IsMounted)
            this.props.fetchPreferenceCourses(this.state.CourseLink, form);


        // fetch all courses if redux store is empty
        if (this.IsMounted && !this.props.Courses.length)
            this.props.fetchCourses()
    }

    componentWillUnmount() {
        this.IsMounted = false;
    }
    openModal(courseData) {
        console.log(courseData, '89', courseData['videoContent'][0]['videoUrl'])
        this.setState({ demoUrl: courseData['videoContent'][0]['videoUrl'] }, () => {
            this.setState({ isOpen: true })
        })
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        let BannerImage;

        let data = (<Loader
            type="Puff"
            color="#08BD80"
            height={50}
            width={50}
            className="loader"

        //3 secs

        />);

        if (this.props.Courses.length > 0) {

            // by default, it displays all the courses
            let CourseArray = this.props.Courses;
            console.log(CourseArray);

            if (this.state.CourseLink !== "all" && this.state.CourseLink !== "preferences") {
                CourseArray = this.props.Courses.filter(course =>
                    course.category === this.state.CourseLink
                );
            }

            // this is the preference link
            else if (this.state.CourseLink === "preferences")
                CourseArray = this.props.PreferenceCourses;


            data = (

                CourseArray.map(item => {
                    let rating = [item ? item.rating.ratingFinal : 0];
                    if (rating === 0) rating = 5;

                    return (
                        <div className="course_card">
                            <NavLink className="productLink" key={item._id}
                                exact to={`/course/${this.state.CourseLink}/${item._id}`}>
                                <CourseCards
                                    key={item._id}
                                    title={item.title}
                                    teacher={item.name}
                                    img={Url + item.imageurl}
                                    rating={parseInt(rating)}
                                    price={item.price}
                                    ratingtimesUpdated={item.rating.timesUpdated} />
                            </NavLink>
                            <ModalVideo channel='custom' isOpen={this.state.isOpen} url={`http://localhost:8080/${this.state.demoUrl}`} onClose={() => this.setState({ isOpen: false })} />
                            <div className="buttons__box" >
                                <div className="b">
                                    <button className="coursecard__btnactive" onClick={() => { this.openModal(item) }}>Watch Demo</button>
                                    <button className="coursecard__btnactive">Enroll Now!</button>
                                </div>
                            </div>
                        </div>
                    )

                }));

            BannerImage = this.state.CourseLink


        };

        return (
            <Layout>
                <div className="container">

                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <NavLink to='/home'>
                                    Home
                                </NavLink></li>

                            <li className="breadcrumb-item">
                                <NavLink to={`/Home/${this.state.CourseLink}`} activeStyle={{ textDecoration: 'underline' }}>{this.state.CourseLink}
                                </NavLink>
                            </li>

                        </ol>

                    </nav>

                    <HomeBanner img={BannerImage} />

                    <div className="mt-3 Course-Content">
                        <Categories />
                        <div className="Course-Content-col">

                            <CourseTitle welcomeMessage={"Welcome"} />

                            <div className="Course-Content-wrap">
                                {data}
                            </div>

                            <Recommendation />

                        </div>

                    </div>



                </div>

            </Layout>

        );
    }

}

const mapStateToProps = (state) => {
    return {
        Courses: state.filter.Courses,
        PreferenceCourses: state.filter.PreferenceCourse,
        //   selectedCourse: state.filter.selectedCourse,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchCourses: () => dispatch(actionCreators.fetchAsyncCourses()),
        fetchPreferenceCourses: (CourseLink, form) => dispatch(actionCreators.fetchAsyncPreferenceCourse(CourseLink, form))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);