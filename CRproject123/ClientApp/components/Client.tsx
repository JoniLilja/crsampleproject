import * as React from 'react';
import { RouteComponentProps } from 'react-router';



interface DataState {
    clients: Client[];
    loading: boolean;
}
export class Clients extends React.Component<RouteComponentProps<{}>, DataState>{

    constructor() {
        super();
        this.state = { clients: [], loading: true };

        fetch('/GetAll')
            .then(response => response.json() as Promise<Client[]>)
            .then(data => {
                this.setState({ clients: data, loading: false });
            });
    }

    public render() {
        let clientTable = this.state.loading
            ? <p><em>Loading...</em></p>
            : Clients.renderClientsTable(this.state.clients)
        return <div>
            <h1>JSON data output...? </h1>
            <p> just gonna test if anything happens </p>
            { clientTable }
        </div>;
    }
    

    private static renderClientsTable(clients: Client[]) {
        return <table className='table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                </tr>
            </thead>
            <tbody>
            {clients.map(client =>
                <tr key={ client.id }>
                    <td>{ client.id }</td>
                    <td>{ client.name }</td>
                    <td>{ client.email }</td>
    
                </tr>
            )}
            </tbody>
        </table>;
    }
    
}

interface Client {
    id: number;
    name: string;
    email: string;
}
