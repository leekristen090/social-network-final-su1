import {Button, Card, Col, ProgressBar, Row} from "react-bootstrap";
import {IoSettingsOutline} from "react-icons/io5";
import {FaPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import * as db from "../Database";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "./reducer.ts";
import GoalForm from "./GoalForm.tsx";

export default function ProfileInfo() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [profile, setProfile] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignout = () => {
        dispatch(setCurrentUser(null));
        navigate("/GoodBooks/Account/Signin");
    };
    const fetchProfile = () => {
        if (!currentUser) return navigate("/GoodBooks/Account/Signin");
        setProfile(currentUser)
    };
    const [goals, setGoals] = useState<any[]>([]);
    const [show, setShow] = useState(false);
    const handleClose= () => setShow(false);
    const handleShow = () => setShow(true);
    const fetchGoals = () => {
        if (!currentUser) return;
        const userGoals = db.goals.filter(goal => goal.user === currentUser._id);
        setGoals(userGoals);
    };
    //const [user] = db.users;
    useEffect(() => { fetchProfile(); fetchGoals(); }, []);
    return (
        <div id={"sn-profile-info"}>
            <Row>
                <Col>
                    <Card id={"sn-profile-card"} style={{width: "550px"}}>
                        <Card.Body>
                            <Card.Title id={"sn-profile-card-title"}>
                                {/*Username*/}
                                {profile.username}
                            </Card.Title>
                            <Card.Text>
                                {/*Bio*/}
                                {profile.bio}
                            </Card.Text>
                            <Button id={"sn-edit-profile-btn"} className={"sn-bg-cream me-2"} onClick={() => navigate(`/GoodBooks/Account/Profile/User/${currentUser._id}`)}>
                                Edit Profile <IoSettingsOutline />
                            </Button>
                            <Button id={"sn-signout"} variant={"danger"} onClick={handleSignout}>
                                Sign Out
                            </Button>
                        </Card.Body>
                    </Card>
                </Col>
                <Col style={{width: "600px"}}>
                    <div className={"clearfix mt-2"} id={"sn-reading-goals"}>
                        <h2 className={"float-start"}>Reading Goals</h2>
                        <Button className={"float-end sn-bg-tan"} id={"sn-new-goal"} onClick={handleShow}>
                            <FaPlus /> New Goal
                        </Button>
                    </div>
                    <Card id={"sn-progress-card"}>
                        <Card.Body>
                            {goals.map((g) => (
                                <div id={"sn-reading-goal"}>
                                    <h5 className={"mt-2"}>
                                        <b>Goal:</b> {g.goalDescription}
                                        <Button className={"float-end btn-sm btn-danger"}>Delete</Button>
                                        <Button className={"float-end btn-sm sn-bg-tan me-1"}>Edit Goal</Button>
                                    </h5>
                                    <div className={"progress sn-progress-tan"} id={"sn-reading-goal-progress"}>
                                        <ProgressBar now={g.percentage} label={`${g.percentage}%`} className={"w-100"} />
                                    </div>
                                </div>
                            ))}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <GoalForm show={show} handleClose={handleClose} dialogTitle={"Add New Goal"} />
        </div>
    );
}