import { Button, Card } from "react-bootstrap";
import Layout from "../components/ui/Layout";
import { useAdminList } from "../hooks/UseAdminList";
import BackButton from "../components/core/BackButton";

const AdminList: React.FC = () => {
    const admins = useAdminList();

    if (!admins.data) return (
        <div>
            {admins.loading && (
                <div>
                    <b><i>Loading data...</i></b>
                </div>
            )}
            {admins.error && (
                <div>
                    Error occurred: {admins.error}
                </div>
            )}
        </div>
    )

    const adminCards = admins.data.map((admin) => (
        <a href={"/admins/" + admin.id}>
            <Card key={admin.id} className="account-card">
                <h5>{admin.forenames} {admin.surname}</h5>
            </Card>
        </a>
    ));

    return (
        <Layout>
            <h2 style={{padding: "30px 0 10px"}}>Administrators <Button variant="primary" href="/create-admin">Add new Admin</Button>  <BackButton backFactor={-1} label="Back" variant="secondary"/></h2>            
            { adminCards.length > 0 ? 
            <div className="account-card-container">
                {adminCards}
            </div>
            : 
                <p>No patients in system.</p> 
            }            
        </Layout>
    );
};

export default AdminList;