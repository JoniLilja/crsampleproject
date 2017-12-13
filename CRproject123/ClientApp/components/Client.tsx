import * as React from 'react';
import { RouteComponentProps } from 'react-router';


interface DataState {
    clients: Client[];
    loading: boolean;
}


export class Clients extends React.Component<RouteComponentProps<{}>, DataState>{

    public variable: string;
    public id: string;

    constructor() {
        super();
        this.state = { clients: [], loading: true };

        this.variable = "GetAll";
        
        fetch(this.variable)
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
            <h1>JSON data output </h1>
            <p> For now, some fluff text. Anyway the wind blows. </p>
            
            <input type="text" id="xid" value={this.id} />

            <button onClick={this.hi} >Click </button>
            
            {clientTable}
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

    hi(): any {
        
        alert("test");

    }
    
}


interface Client {
    id: number;
    name: string;
    email: string;
}
