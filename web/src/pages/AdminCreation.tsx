import Layout from "../components/ui/Layout";
import { Badge, Button, Toast } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import PasswordStrengthChecker from "../components/ui/PasswordStrengthChecker";
import { useAdminCreation } from "../hooks/UseAdminCreation";
import BackButton from "../components/core/BackButton";

const AdminCreation: React.FC = () => {
    const adminCreation = useAdminCreation()

    return (
        <Layout>
            <div>
                <Toast className="toast" bg="danger" show={adminCreation.toastVisible} onClose={() => adminCreation.setToastVisible(false)}>
                    <Toast.Header style={{ backgroundColor: "#9C1C28", color: "white" }}><strong className="me-auto">Error</strong></Toast.Header>
                    <Toast.Body style={{ color: "white" }}>{adminCreation.toastMessage}</Toast.Body>
                </Toast>
                <h2>Create Account <Badge style={{ margin: "0 10px", }} bg="success">Admin</Badge></h2>
                <Form>
                    <h3 style={{ margin: "20px 0 10px 0" }}>Login Information</h3>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="name@example.com"
                        value={adminCreation.email}
                        onChange={(e) => adminCreation.setEmail(e.target.value)} />

                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="password"
                        value={adminCreation.password}
                        onChange={(e) => adminCreation.setPassword(e.target.value)} />
                    {adminCreation.password && <PasswordStrengthChecker password={adminCreation.password} setPasswordStrength={adminCreation.setPasswordStrength} />}

                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="repeat password"
                        value={adminCreation.confirmPassword}
                        onChange={(e) => adminCreation.setConfirmPassword(e.target.value)} />
                    {adminCreation.confirmPassword && adminCreation.password !== adminCreation.confirmPassword && <Alert variant="danger" style={{ marginTop: "10px" }}>Error: Passwords do not match.</Alert>}

                    <h3 style={{ margin: "20px 0 10px 0" }}>Core Information</h3>
                    <Form.Label>Title</Form.Label>
                    <Form.Select value={adminCreation.title} onChange={(e) => adminCreation.setTitle(e.target.value)}>
                        <option>select a title</option>
                        <option>Ms</option>
                        <option>Mr</option>
                        <option>Mx</option>
                        <option>Mrs</option>
                        <option>Miss</option>
                    </Form.Select>
                    <Form.Label>Forename</Form.Label>
                    <Form.Control placeholder="forename" value={adminCreation.forename} onChange={(e) => adminCreation.setForename(e.target.value)} />
                    <Form.Label>Surname</Form.Label>
                    <Form.Control placeholder="surname" value={adminCreation.surname} onChange={(e) => adminCreation.setSurname(e.target.value)} />
                    <Form.Label>Role</Form.Label>
                    <Form.Select value={adminCreation.role} onChange={(e) => adminCreation.setRole(e.target.value)}>
                        <option>select a role</option>
                        <option>CEO</option>
                    </Form.Select>

                    <div style={{ textAlign: "center" }}>
                        <BackButton backFactor={-1} variant="secondary" label="Cancel" />
                        <Button variant="success" style={{ margin: "10px" }} onClick={() => adminCreation.save()}>Save</Button>
                    </div>
                    <div style={{textAlign: "center"}}>
                        {(
                            adminCreation.submitted &&
                            !adminCreation.creationReq.loading &&
                            !adminCreation.patchReq.loading &&
                            (adminCreation.creationReq.status === 201) &&
                            (adminCreation.patchReq.status === 200)
                        ) && (
                            <Alert
                                variant="success"
                            >
                                Account Created Successfully!
                            </Alert>
                        )}
                        {(
                            adminCreation.submitted &&
                            !adminCreation.creationReq.loading &&
                            !adminCreation.patchReq.loading &&
                            ((adminCreation.creationReq.status !== 201) ||
                            (adminCreation.patchReq.status !== 200))
                        ) && (
                            <Alert
                                variant="danger"
                            >
                                {`One or more errors occurred while trying to save your account data:\n\n${JSON.stringify({
                                    core: `${adminCreation.creationReq.status}: ${adminCreation.creationReq.error}`,
                                    embedded: `${adminCreation.patchReq.status}: ${adminCreation.patchReq.error}`,
                                }, null, 2)}`}
                            </Alert>
                        )}
                    </div>
                </Form>
            </div>
        </Layout>
    );
};

export default AdminCreation;