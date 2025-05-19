import Layout from "../components/ui/Layout";
import { Badge, Button, Table  } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import { useDoctorProfile } from "../hooks/UseDoctorProfile";
import DebugBlock from "../components/utilities/DebugBlock";


const DoctorProfile: React.FC = () => {
    const doctorProfile = useDoctorProfile();

    if(!doctorProfile.profile.data) return (
        <div>
            {doctorProfile.profile.loading && (
                <div>
                    <b><i>Loading data...</i></b>
                </div>
            )}
            {doctorProfile.profile.error && (
                <div>
                    Error occurred: {doctorProfile.profile.error}
                </div>
            )}
        </div>
    );

    function getSchedule(arg0: string) {
        throw new Error("Function not implemented.");
    }

    return (
        <Layout>
            <div>
                <DebugBlock>
                    {JSON.stringify(doctorProfile.modifiedProfile, null, 2)}
                </DebugBlock>
                <h2>{doctorProfile.modifiedProfile?.forenames} {doctorProfile.modifiedProfile?.surname}<Badge style={{margin: "0 10px", }} bg="secondary">Doctor</Badge></h2>
                <Form>
                    <Form.Label>Title</Form.Label>
                    <Form.Select value={doctorProfile.modifiedProfile?.title} onChange={(e) => doctorProfile.updateField(e.target.value, "title")}>
                        <option>Select a title</option>
                        <option>Ms</option>
                        <option>Mr</option>
                        <option>Mx</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                    </Form.Select>
                    <Form.Label>Forename</Form.Label>
                    <Form.Control placeholder="forename" value={doctorProfile.modifiedProfile?.forenames} onChange={(e) => doctorProfile.updateField(e.target.value, "forenames")}/>
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname" value={doctorProfile.modifiedProfile?.surname} onChange={(e) => doctorProfile.updateField(e.target.value, "surname")}/>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={doctorProfile.modifiedProfile?.email} onChange={(e) => doctorProfile.updateField(e.target.value, "email")}/>
                    <Form.Label>Specialty</Form.Label>
                    <Form.Control value={doctorProfile.modifiedProfile?.doctorData?.specialty} onChange={(e) => doctorProfile.updateField(e.target.value, "doctorData", "specialty")}/>
                    <Form.Label>Work Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={doctorProfile.modifiedProfile?.doctorData?.contactInfo.workEmail} onChange={(e) => doctorProfile.updateField(e.target.value, "doctorData", "contactInfo", "workEmail")}/>
                    <Form.Label>Work Mobile</Form.Label>
                    <Form.Control placeholder="01234567890" value={doctorProfile.modifiedProfile?.doctorData?.contactInfo.workPhone} onChange={(e) => doctorProfile.updateField(e.target.value, "doctorData", "contactInfo", "workPhone")}/>

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
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Monday")?.startTime} onChange={(e) => doctorProfile.updateSchedule("Monday", e.target.value, "start")}/></td>
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Monday")?.endTime}  onChange={(e) => doctorProfile.updateSchedule("Monday", e.target.value, "end")}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Tuesday</td>
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Tuesday")?.startTime} onChange={(e) => doctorProfile.updateSchedule("Tuesday", e.target.value, "start")}/></td>
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Tuesday")?.endTime}  onChange={(e) => doctorProfile.updateSchedule("Tuesday", e.target.value, "end")}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Wednesday</td>
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Wednesday")?.startTime} onChange={(e) => doctorProfile.updateSchedule("Wednesday", e.target.value, "start")}/></td>
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Wednesday")?.endTime}  onChange={(e) => doctorProfile.updateSchedule("Wednesday", e.target.value, "end")}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Thursday</td>
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Thursday")?.startTime} onChange={(e) => doctorProfile.updateSchedule("Thursday", e.target.value, "start")}/></td>
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Thursday")?.endTime}  onChange={(e) => doctorProfile.updateSchedule("Thursday", e.target.value, "end")}/></td>
                            </tr>
                            <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Friday</td>
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Friday")?.startTime} onChange={(e) => doctorProfile.updateSchedule("Friday", e.target.value, "start")}/></td>
                                <td><Form.Control type="time" value={doctorProfile.getSchedule("Friday")?.endTime}  onChange={(e) => doctorProfile.updateSchedule("Friday", e.target.value, "end")}/></td>
                            </tr>
                        </tbody>
                    </Table>

                    <div style={{textAlign: "center"}}>
                        <Button variant="secondary" style={{margin: "10px"}}>Cancel</Button>
                        <Button variant="success" style={{margin: "10px"}} onClick={() => doctorProfile.updateProfile()}>Save</Button>
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default DoctorProfile;