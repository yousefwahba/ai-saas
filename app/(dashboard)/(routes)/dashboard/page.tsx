import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
    return ( 
        <div>
            <UserButton/>
            <h1>Dashboard(protected)</h1>
        </div>
     );
}
 
export default DashboardPage;