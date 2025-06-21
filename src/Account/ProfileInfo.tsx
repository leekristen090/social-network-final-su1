import {Button, Card, Col, FormControl, ProgressBar, Row} from "react-bootstrap";
import {IoSettingsOutline} from "react-icons/io5";
import {FaPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "./reducer.ts";
import GoalForm from "./GoalForm.tsx";
import {addGoal, deleteGoal, editGoal, updateGoal} from "./Goals/reducer.ts";

export default function ProfileInfo() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [profile, setProfile] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignout = () => {
        navigate("/GoodBooks/Account/Signin");
        dispatch(setCurrentUser(null));
    };
    const fetchProfile = () => {
        if (!currentUser) return navigate("/GoodBooks/Account/Signin");
        setProfile(currentUser)
    };
    const [goalName, setGoalName] = useState("");
    const [percentage, setPercentage] = useState("");
    const {goals} = useSelector((state: any) => state.goalsReducer);
    const [show, setShow] = useState(false);
    const handleClose= () => setShow(false);
    const handleShow = () => setShow(true);
    const userGoals = goals.filter((goal: any) => goal.user === currentUser._id);
    const createGoalForUser = () => {
        const newGoal = {user: currentUser._id, goalDescription: goalName, percentage: percentage}
        dispatch(addGoal(newGoal));
        setGoalName("");
        setPercentage("");
    };
    const removeGoal = (goalId: string) => {
        dispatch(deleteGoal(goalId));
    };
    useEffect(() => { fetchProfile(); }, []);
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
                            {userGoals.length > 0 ?  (
                                userGoals.map((goals: any) => (
                                    <div id={"sn-reading-goal"}>
                                        <h5 className={"mt-2"}>
                                            <b>Goal:</b>
                                            {!goals.editing && goals.goalDescription}
                                            {goals.editing && (
                                                <FormControl defaultValue={goals.goalDescription}
                                                             onChange={(e) => dispatch(updateGoal({...goals, goalDescription: e.target.value}))}
                                                             onKeyDown={(e) => {
                                                                 if (e.key === "Enter") {
                                                                     dispatch(updateGoal({...goals, editing: false}));
                                                                 }
                                                             }} />
                                            )}
                                            <Button className={"float-end btn-sm btn-danger"} onClick={() => removeGoal(goals._id)}>
                                                Delete
                                            </Button>
                                            <Button className={"float-end btn-sm sn-bg-tan me-1"} onClick={() => dispatch(editGoal(goals._id))}>
                                                Edit Goal
                                            </Button>

                                        </h5>
                                        <div className={"progress sn-progress-tan"} id={"sn-reading-goal-progress"}>
                                            <ProgressBar now={goals.percentage} label={`${goals.percentage}%`} className={"w-100"} />
                                        </div>
                                    </div>
                                ))
                            ) : <p>No goals yet. Add your first goal!</p>}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <GoalForm show={show} handleClose={handleClose} dialogTitle={"Add New Goal"}
                      addGoal={createGoalForUser} setGoalName={setGoalName} setProgress={setPercentage} />
        </div>
    );
}