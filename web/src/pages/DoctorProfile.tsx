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
                    <Form.Select value={doctorProfile.modifiedProfile?.doctorData?.specialty} onChange={(e) => doctorProfile.updateField(e.target.value, "doctorData", "specialty")}>
                        <option>Select a specialism</option>
                        <option>Cardiovascular Health</option>
                    </Form.Select>
                    <Form.Label>Work Email</Form.Label>
                    <Form.Control type="email" placeholder="name@example.com" value={doctorProfile.modifiedProfile?.doctorData?.contactInfo.workEmail} onChange={(e) => doctorProfile.updateField(e.target.value, "doctorData", "contactInfo", "workEmail")}/>
                    <Form.Label>Work Mobile</Form.Label>
                    <Form.Control type="number" placeholder="01234567890" value={doctorProfile.modifiedProfile?.doctorData?.contactInfo.workPhone} onChange={(e) => doctorProfile.updateField(e.target.value, "doctorData", "contactInfo", "workPhone")}/>

                    <Form.Label style={{paddingTop: "20px"}}>Work Schedule</Form.Label>
                    <Table borderless>
                        <tbody>
                            <tr>
                                <th style={{paddingLeft: 0}}>Day</th>
                                <th>Start</th>
                                <th>End</th>
                            </tr>
                            {/* <tr>
                                <td style={{paddingLeft: 0, verticalAlign: "middle"}}>Monday</td>
                                <td><Form.Control type="time" value={doctorProfile.modifiedProfile?.monday.startTime} onChange={(e) => monday.setStartTime(e.target.value)}/></td>
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
                            </tr> */}
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