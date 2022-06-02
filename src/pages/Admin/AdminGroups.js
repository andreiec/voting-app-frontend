import { useState } from "react";

import apiClient from "../../http-common";
import GroupsTable from "../../components/Admin/Groups/GroupsTable";

function AdminGroups() {

    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchGroups = () => {
        setIsLoading(true);
        console.log('a')
    }

    return (
        <GroupsTable data={{groups: groups}} />
    )
}

export default AdminGroups;