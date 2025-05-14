import { useState } from "react";
import Layout from "../components/ui/Layout";
import { Badge, Button, Table  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

function getProfile () {
    return {
        email: "janesmith@gmail.com",
        title: "Miss",
        forename: "Jane",
        surname: "Smith",
        specialty: "Cardiovascular Health",
        workEmail: "janesmith@hcams.com",
        workPhone: "01234567890",
        schedule: {
            monday: {
                startTime: "08:00",
                endTime: "17:00"
            },
            tuesday: {
                startTime: "08:00",
                endTime: "17:00"
            },
            wednesday: {
                startTime: null,
                endTime: null
            },
            thursday: {
                startTime: null,
                endTime: null
            },
            friday: {
                startTime: "10:00",
                endTime: "15:00"
            }
        }
    }
};

interface schedule {
    start: string | null,
    end: string | null
}

const daySchedule = ({start, end}: schedule) => {
    if (!start) { start = "00:00"; };
    if (!end) { end = "00:00"; };
    const [startTime, setStartTime] = useState<string>(start);
    const [endTime, setEndTime] = useState<string>(end);
    return { startTime, setStartTime, endTime, setEndTime };
}

const DoctorProfile: React.FC = () => {
    const profile = getProfile();
    const [ forename, updateForename ] = useState<string>(profile.forename);
    const [ surname, updateSurname ] = useState<string>(profile.surname);
    const [ email, updateEmail ] = useState<string>(profile.email);
    const [ title, updateTitle ] = useState<string>(profile.title);
    const [ specialism, updateSpecialism ] = useState<string>(profile.specialty); 
    const [ workEmail, updateWorkEmail ] = useState<string>(profile.email);
    const [ workPhone, updateWorkPhone ] = useState<string>(profile.workPhone);
    
    // React makes all of these need their own variable, you can't put them all 
    // in a dictionary or anything ☹️

    const monday = daySchedule({start: profile.schedule.monday.startTime, end: profile.schedule.monday.endTime});
    const tuesday = daySchedule({start: profile.schedule.tuesday.startTime, end: profile.schedule.tuesday.endTime});
    const wednesday = daySchedule({start: profile.schedule.wednesday.startTime, end: profile.schedule.wednesday.endTime});
    const thursday = daySchedule({start: profile.schedule.thursday.startTime, end: profile.schedule.thursday.endTime});
    const friday = daySchedule({start: profile.schedule.friday.startTime, end: profile.schedule.friday.endTime});

    function updateProfile () {
        // Send all the information to the backend to save it
        var message = "Saved account with credentials";
        message += "\nForename: " + forename;
        message += "\nSurname: " + surname;
        message += "\nEmail: " + email;
        message += "\nTitle: " + title;
        message += "\nSpecialism: " + specialism;
        message += "\nWork Email: " + workEmail;
        message += "\nWork Phone: " + workPhone;
        message += "\nMonday Schedule: " + monday.startTime + " to " + monday.endTime;
        message += "\nTuesday Schedule: " + tuesday.startTime + " to " + tuesday.endTime;
        message += "\nWednesday Schedule: " + wednesday.startTime + " to " + wednesday.endTime;
        message += "\nThursday Schedule: " + thursday.startTime + " to " + thursday.endTime;
        message += "\nFriday Schedule: " + friday.startTime + " to " + friday.endTime;        
        console.log(message)
    }

    return (
        <Layout>
            <div style={{width: "600px", margin: "auto"}}>
                <h2>{profile.forename} {profile.surname}<Badge style={{margin: "0 10px", }} bg="secondary">Doctor</Badge></h2>
                <Form>
                    <Form.Label>Title</Form.Label>
                    <Form.Select value={title} onChange={(e) => updateTitle(e.target.value)}>
                        <option>Select a title</option>
                        <option>Ms</option>
                        <option>Mr</option>
                        <option>Mx</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                    </Form.Select>
                    <Form.Label>Forename</Form.Label>
                    <Form.Control placeholder="forename" value={forename} onChange={(e) => updateForename(e.target.value)}/>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname" value={surname} onChange={(e) => updateSurname(e.target.value)}/>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={email} onChange={(e) => updateEmail(e.target.value)}/>
                    <Form.Label>Specialty</Form.Label>
                    <Form.Select value={specialism} onChange={(e) => updateSpecialism(e.target.value)}>
                        <option>Select a specialism</option>
                        <option>Cardiovascular Health</option>
                    </Form.Select>
                    <Form.Label>Work Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={workEmail} onChange={(e) => updateWorkEmail(e.target.value)}/>
                    <Form.Label>Work Mobile</Form.Label>
                    <Form.Control type="number" placeholder="01234567890" value={workPhone} onChange={(e) => updateWorkPhone(e.target.value)}/>

                    <Form.Label style={{paddingTop: "20px"}}>Work Schedule</Form.Label>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <th style={{paddingLeft: 0}}>Day</th>
                                <th>Start</th>
                                <th>End</th>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Monday</td>
                                <td><Form.Control type="time" value={monday.startTime} onChange={(e) => monday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={monday.endTime} onChange={(e) => monday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Tuesday</td>
                                <td><Form.Control type="time" value={tuesday.startTime} onChange={(e) => tuesday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={tuesday.endTime} onChange={(e) => tuesday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Wednesday</td>
                                <td><Form.Control type="time" value={wednesday.startTime} onChange={(e) => wednesday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={wednesday.endTime} onChange={(e) => wednesday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Thursday</td>
                                <td><Form.Control type="time" value={thursday.startTime} onChange={(e) => thursday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={thursday.endTime} onChange={(e) => thursday.setEndTime(e.target.value)}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Friday</td>
                                <td><Form.Control type="time" value={friday.startTime} onChange={(e) => friday.setStartTime(e.target.value)}/></td>
                                <td><Form.Control type="time" value={friday.endTime} onChange={(e) => friday.setEndTime(e.target.value)}/></td>
                            </tr>
                        </tbody>
                    </Table>

                    <div style={{textAlign: "center"}}>
                        <Button variant="secondary" style={{margin: "10px"}}>Cancel</Button>
                        <Button variant="success" style={{margin: "10px"}} onClick={() => updateProfile()}>Save</Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default DoctorProfile;