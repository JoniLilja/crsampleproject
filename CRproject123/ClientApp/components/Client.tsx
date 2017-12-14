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

            <button onClick={this.del} >Delete </button>

            <button onClick={this.add} >Add </button>
            
            {clientTable}

            <p id="cc"> 
                </p>
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
                    <td>{client.email}</td>
                    <td id="mm"> del </td>
    
                </tr>
            )}
            </tbody>
        </table>;
    }

    del(): any {
        var test = new XMLHttpRequest(), method = 'GET', url = "/DelClient/4";

        test.open(method, url, true);

        test.onload = function () { };

        test.send();

        window.location.reload();
    }

    add(): any {
        var test = new XMLHttpRequest(), method = 'GET', url = "/AddClient";

        test.open(method, url, true);

        test.onload = function () { };

        test.send();

        window.location.reload();
    }
    
}


interface Client {
    id: number;
    name: string;
    email: string;
}
