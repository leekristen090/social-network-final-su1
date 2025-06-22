import {Button, Card, Col, FormControl, ProgressBar, Row} from "react-bootstrap";
import {IoSettingsOutline} from "react-icons/io5";
import {FaPlus} from "react-icons/fa";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCurrentUser} from "../reducer.ts";
import GoalForm from "../Goals/GoalForm.tsx";
import * as usersClient from "../client.ts"
import * as goalClient from "../Goals/client.ts";

export default function ProfileInfo() {
    const {currentUser} = useSelector((state: any) => state.accountReducer);
    const [profile, setProfile] = useState<any>({});
    const [goals, setGoals] = useState<any>({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleSignout = async () => {
        await usersClient.signout();
        dispatch(setCurrentUser(null));
        navigate("/GoodBooks/Account/Signin");
    };
    const fetchProfile = async () => {
        try {
            const profileData = await usersClient.profile();
            setProfile(profileData);
            dispatch(setCurrentUser(profileData));  // update redux as well
        } catch (e) {
            navigate("/GoodBooks/Account/Signin");
        }
    };
    const [goalName, setGoalName] = useState("");
    const [percentage, setPercentage] = useState("");
    const [show, setShow] = useState(false);
    const handleClose= () => setShow(false);
    const handleShow = () => setShow(true);
    const createGoalForUser = async () => {
        const newGoal = {
            user: currentUser._id,
            goalDescription: goalName,
            percentage: percentage
        };
        const createdGoal = await goalClient.createGoal(newGoal);
        //dispatch(addGoal(createdGoal));
        setGoals([...goals, createdGoal]);
        setGoalName("");
        setPercentage("");
        handleClose();
    };
    const removeGoal = async (goalId: string) => {
        await goalClient.deleteGoal(goalId);
        //dispatch(deleteGoal(goalId));
        setGoals(goals.filter((goal: any) => goal._id !== goalId)); // ✅ local state update

    };
    const fetchGoals = async () => {
        if (currentUser?._id) {
            const userGoals = await goalClient.fetchGoalsForUser(currentUser._id);
            setGoals(userGoals);
        }
    };
    const saveGoal = async (goal: any) => {
        const updatedGoal = await goalClient.updateGoal(goal);
        setGoals(goals.map((g: any) =>
            g._id === goal._id ? { ...updatedGoal, editing: false } : g
        ));
    };
    const editGoal = (goalId: string) => {
        setGoals(goals.map((g: any) =>
            g._id === goalId ? { ...g, editing: true } : g
        ));
    };
    useEffect(() => {
        fetchProfile();
        fetchGoals();
        }, []);
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
                            <Button id={"sn-edit-profile-btn"} className={"sn-bg-cream me-2"}
                                    onClick={() => navigate(`/GoodBooks/Account/Profile/User/${currentUser._id}`)}>
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
                            {goals.length > 0 ?  (
                                goals.map((goal: any) => (
                                    <div id={"sn-reading-goal"}>
                                        <h5 className={"mt-2"}>
                                            <b>Goal:</b>
                                            {!goal.editing && goal.goalDescription}
                                            {goal.editing && (
                                                <>
                                                    <FormControl defaultValue={goal.goalDescription}
                                                                 id={"sn-edit-goal-description"}
                                                                 onChange={(e) => {
                                                                     const updatedGoals = goals.map((g: any) =>
                                                                         g._id === goal._id ? { ...g, goalDescription: e.target.value } : g
                                                                     );
                                                                     setGoals(updatedGoals);
                                                                 }}
                                                               onKeyDown={(e) => {
                                                                   if (e.key === "Enter") {
                                                                       saveGoal(goal);
                                                                   }
                                                               }}/>
                                                    <FormControl type={"number"} min={"0"} max={"100"}
                                                                 value={goal.percentage} id={"sn-edit-progress"}
                                                                 onChange={(e) => {
                                                                     const updatedGoals = goals.map((g: any) =>
                                                                         g._id === goal._id ? { ...g, percentage: e.target.value } : g
                                                                     );
                                                                     setGoals(updatedGoals);
                                                                 }}
                                                                 onKeyDown={(e) => {
                                                                     if (e.key === "Enter") {
                                                                         saveGoal(goal);
                                                                     }
                                                                 }} />
                                                </>
                                            )}
                                            <Button className={"float-end btn-sm btn-danger"} id={"sn-delete-goal"}
                                                    onClick={() => removeGoal(goal._id)}>
                                                Delete
                                            </Button>
                                            <Button className={"float-end btn-sm sn-bg-tan me-1"} id={"sn-edit-goal"}
                                                    onClick={() => editGoal(goal._id)}>
                                                Edit Goal
                                            </Button>

                                        </h5>
                                        <div className={"progress sn-progress-tan"} id={"sn-reading-goal-progress"}>
                                            <ProgressBar now={goal.percentage}
                                                         label={`${goal.percentage}%`} className={"w-100"}
                                                         id={"sn-goal-progress-bar"} />
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