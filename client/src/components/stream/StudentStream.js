import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../redux/actions/profileActions";
import { JoinStream } from "../../utils/StreamFunctionStudent";
import ProfileSideCourseCard from "../profile/ProfileSideCourseCard";
import ProfileNotFound from "../common/ProfileNotFound";
import Question_Button from "../../resources/images/Question_button_red.png";
import Confused_Button from "../../resources/images/Confused_button.png";
import OK_Button from "../../resources/images/OK_button.png";
import Spinner from "../common/Spinner";
import PropTypes from "prop-types";

const styles = {
  Card: {
    width: "200px",
    height: "auto"
  },
  Screen: {
    width: "558px",
    height: "359px"
  },
  Cont: {
    height: "100%",
    minWidth: "1220px",
    padding: "20px 50px 20px 50px"
  },
  Card_Size: {
    width: "600px",
    height: "500px",
    margin: "0 1em 1em 1em"
  },
  Button_Location: {
    padding: "50px 0 50px 0",
    margin: "auto"
  },
  Log: {
    width: "30%",
    height: "250px",
    margin: "0 1em 0 0"
  },
  Button_Log: {
    margin: "0 0 1em"
  },
  Student_Chat: {
    width: "300px",
    height: "55%"
  },
  Chat: {
    width: "65%",
    height: "55%"
  },
  Button_Icon: {
    width: "60px",
    height: "60px"
  },
  Min_Height: {
    height: "700px",
    width: "1300px",
    margin: "0 auto"
  }
};
class StudentStream extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let StudentStreamPage;

    if (profile === null || loading) {
      return (StudentStreamPage = <Spinner />);
    } else {
      if (profile.handle === undefined) {
        StudentStreamPage = <ProfileNotFound />;
      } else {
        StudentStreamPage = (
          <div style={styles.Cont}>
            <div style={styles.Min_Height}>
              <div style={{ width: "1200px", margin: "0 auto" }}>
                <p>{user.userName}</p>
                <div>
                  {/* //-----------------------Student's View-------------------------------------------- */}
                  <div className="row">
                    <div style={styles.Card}>
                      <div className="card">
                        <div className="card-header">
                          <strong>Courses Enrolled In</strong>
                        </div>
                        <div>
                          <ProfileSideCourseCard
                            course={profile.studentFields.coursesEnrolledIn}
                          />
                        </div>
                      </div>
                    </div>

                    {/*--Stream Screen--*/}
                    <div style={styles.Card_Size}>
                      <div className="card border-primary">
                        <div className="card-header bg-primary text-white">
                          Professor's Stream
                        </div>
                        <div className="card-body bg-dark">
                          <video id="ForiegnVid" style={styles.Screen} />
                        </div>
                      </div>
                      <button
                        className="btn btn-info"
                        id="startStream"
                        style={{ margin: "1em 0 0 40%" }}
                        onClick={function() {
                          JoinStream();
                        }}
                      >
                        Join Stream
                      </button>
                    </div>
                    {/*--Buttons--*/}
                    <div>
                      <div>
                        <div
                          className="card border-primary"
                          style={styles.Button_Log}
                        >
                          <div className="card-body">
                            <button type="button" className="btn btn-link">
                              <img
                                style={styles.Button_Icon}
                                src={Question_Button}
                                alt="Question"
                              />
                            </button>
                            <button type="button" className="btn btn-link">
                              <img
                                style={styles.Button_Icon}
                                src={Confused_Button}
                                alt="Confused"
                              />
                            </button>
                            <button type="button" className="btn btn-link">
                              <img
                                style={styles.Button_Icon}
                                src={OK_Button}
                                alt="OK"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/*--Chat--*/}
                      <div>
                        <div style={styles.Student_Chat}>
                          <div className="card border-primary">
                            <div className="card-header bg-primary text-white">
                              Chat
                            </div>
                            <div className="card-body" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      }
      return StudentStreamPage;
    }
  }
}

StudentStream.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile
});

export default connect(
  mapStateToProps,
  { getCurrentProfile }
)(StudentStream);
